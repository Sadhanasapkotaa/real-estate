import logging
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_str, smart_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import send_normal_email
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "password2"]

    def validate(self, attrs):
        password = attrs.get("password", "")
        password2 = attrs.get("password2", "")

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )
        return user

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255, min_length=3)
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)
    full_name=serializers.CharField(max_length=255, read_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "full_name", "access_token", "refresh_token"]

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        request = self.context.get("request")
        user = authenticate(request=request, email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")
        
        if not user.is_verified:
            raise serializers.ValidationError("Email is not verified")
        
        user_tokens = user.tokens()

        return {
            "email": user.email,
            "full_name": user.get_full_name,
            "access_token": str(user_tokens.get("access")),
            "refresh_token": str(user_tokens.get("refresh")),
        }

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=3, max_length=255)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email does not exist")
        return attrs

    def save(self):
        email = self.validated_data.get("email")
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        request = self.context.get("request")
        site_domain = "opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev"
        relative_link = reverse("password-reset-confirm", kwargs={"uidb64": uidb64, "token": token})  # path to my frontend
        abslink = f"https://{site_domain}{relative_link}"
        email_body = f"Hello, \n Use link below to reset your password \n {abslink}"
        data = {
            "email_body": email_body,
            "to_email": user.email,
            "email_subject": "Reset your password for RentMySpace"
        }

        send_normal_email(data)

class NewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    uidb64 = serializers.CharField(write_only=True)
    token = serializers.CharField(write_only=True)

    class Meta:
        fields = ["password", "confirm_password", "uidb64", "token"]

    def validate(self, attrs):
        try:
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")    
            password = attrs.get("password")
            confirm_password = attrs.get("confirm_password")

            if password != confirm_password:
                raise serializers.ValidationError({"password": "Passwords do not match."})

            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("Token is invalid or has expired")
            
            user.set_password(password)
            user.save()      
            return user
        
        except Exception as e:
            logging.error(f"Exception: {e}")
            raise serializers.ValidationError("Link is invalid or has expired")
        
class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    default_error_messages = {
        "bad_token": "Token is invalid or has expired"
    }

    def validate(self, attrs):
        self.token = attrs.get("refresh_token")
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            return self.fail("bad_token")