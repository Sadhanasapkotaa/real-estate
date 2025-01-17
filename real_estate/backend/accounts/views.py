import logging
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import LogoutUserSerializer, UserRegisterSerializer, LoginSerializer, NewPasswordSerializer, PasswordResetRequestSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .utils import send_code_to_user
from .models import OneTimePassword, User
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
# Create your views here.

class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            send_code_to_user(user['email'], None)  # Pass None for OTP as it is generated in the utility function
            return Response({
                'data': user,
                'message': 'Hi, User created successfully. Check your email to verify your account',
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(GenericAPIView):
    permission_classes = [AllowAny]
    def post(self, request):
        otpcode=request.data.get('otp')
        try:
            user_code_obj=OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response(
                    {
                        'message': 'Email verified successfully',
                    }, status=status.HTTP_200_OK)
            return Response(
                {
                    'message': 'Code is invalid,Email already verified',
                }, status=status.HTTP_204_NO_CONTENT)
        
        except OneTimePassword.DoesNotExist:
            return Response(
                {
                    'message': 'Invalid OTP',
                }, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    def post(self, request):
        serializer=self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(
            {
                'message': 'User is authenticated',
            }, status=status.HTTP_200_OK)

class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {
                    'message': 'Password reset link has been sent to your email',
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PasswordResetConfirm(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {
                        'message': 'Token is invalid',
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(
                {
                    'message': 'Token is valid',
                }, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError as identifier:
            logging.error(f"DjangoUnicodeDecodeError: {identifier}")
            return Response(
                {
                    'message': 'Token is invalid',
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logging.error(f"Exception: {e}")
            return Response(
                {
                    'message': 'Internal server error',
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {
                        'message': 'Token is invalid',
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            return Response(
                {
                    'message': 'Token is valid',
                }, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError as identifier:
            logging.error(f"DjangoUnicodeDecodeError: {identifier}")
            return Response(
                {
                    'message': 'Token is invalid',
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logging.error(f"Exception: {e}")
            return Response(
                {
                    'message': 'Internal server error',
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class SetNewPassword(GenericAPIView):
    serializer_class = NewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.save()
                return Response(
                    {
                        'message': 'Password reset successful',
                    }, status=status.HTTP_200_OK)
            except Exception as e:
                logging.error(f"Exception: {e}")
                return Response(
                    {
                        'message': 'Internal server error',
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutUserView(GenericAPIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                'message': 'User logged out successfully',
            }, status=status.HTTP_204_NO_CONTENT)
    