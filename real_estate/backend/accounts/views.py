from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serilizer.save()
            user = serializer.data
            send_code_to_user(user['email'])
            # send email function 
            return Response({
                'data': user,
                'message': f'Hi {user.first_name} User created successfully. Check your email to verify your account',
                },
                status=status.HTTP_201_CREATED
            );
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
