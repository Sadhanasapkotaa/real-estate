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

AUTH_PROVIDERS = {
    'email': 'email',
    'google': 'google',
    'facebook': 'facebook',
    # Add other providers as needed
}

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)
    role = serializers.ListField(child=serializers.ChoiceField(choices=User.ROLE_CHOICES), default=['buyer', 'seller'])

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "password2", "role"]

    def validate(self, attrs):
        password = attrs.get("password", "")
        password2 = attrs.get("password2", "")

        if password != password2:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.setdefault('auth_provider', AUTH_PROVIDERS.get('email'))
        user = User.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
            auth_provider=validated_data["auth_provider"],
            role=validated_data["role"]
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            return {
                'user': user,
            }
        raise serializers.ValidationError("Invalid credentials")

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

        try:
            send_normal_email(data)
        except Exception as e:
            logging.error(f"Exception: {e}")
            raise serializers.ValidationError("Failed to send email")

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