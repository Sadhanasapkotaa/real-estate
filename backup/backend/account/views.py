from rest_framework import viewsets, status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from account.models import (
    User, Profile, KYC, ManagerModel, BuyerModel, SellerModel, OwnerModel, LawyerModel, AgentModel, SupplierModel
)
from account.serializers import (
    UserSerializer, ProfileSerializer, KYCSerializer, ManagerModelSerializer, BuyerModelSerializer,
    SellerModelSerializer, OwnerModelSerializer, LawyerModelSerializer, AgentModelSerializer, SupplierModelSerializer,
    UserCreateSerializer
)
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
import requests

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        print('Register endpoint called with data:', request.data)
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_link = f"{request.scheme}://{request.get_host()}/activate/{uidb64}/{token}"
            send_mail(
                'Activate your account',
                f'Click the link to activate your account: {activation_link}',
                'from@example.com',
                [user.email],
                fail_silently=False,
            )
            refresh = RefreshToken.for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'token': str(refresh.access_token)  # Ensure token is returned
            }
            print('Registration successful:', response_data)
            return Response(response_data, status=status.HTTP_201_CREATED)
        print('Registration failed with errors:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'token': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def request_user_activation(request, uid, token):
    """ 
    Intermediate view to activate a user's email. 
    """
    post_url = "http://127.0.0.1:8000/djoser_auth/users/activation/"
    post_data = {"uid": uid, "token": token}
    result = requests.post(post_url, data=post_data)
    content = result.text
    return Response(content)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

class KYCViewSet(viewsets.ModelViewSet):
    queryset = KYC.objects.all()
    serializer_class = KYCSerializer
    permission_classes = [IsAuthenticated]

class ManagerModelViewSet(viewsets.ModelViewSet):
    queryset = ManagerModel.objects.all()
    serializer_class = ManagerModelSerializer
    permission_classes = [IsAuthenticated]

class BuyerModelViewSet(viewsets.ModelViewSet):
    queryset = BuyerModel.objects.all()
    serializer_class = BuyerModelSerializer
    permission_classes = [IsAuthenticated]

class SellerModelViewSet(viewsets.ModelViewSet):
    queryset = SellerModel.objects.all()
    serializer_class = SellerModelSerializer
    permission_classes = [IsAuthenticated]

class OwnerModelViewSet(viewsets.ModelViewSet):
    queryset = OwnerModel.objects.all()
    serializer_class = OwnerModelSerializer
    permission_classes = [IsAuthenticated]

class LawyerModelViewSet(viewsets.ModelViewSet):
    queryset = LawyerModel.objects.all()
    serializer_class = LawyerModelSerializer
    permission_classes = [IsAuthenticated]

class AgentModelViewSet(viewsets.ModelViewSet):
    queryset = AgentModel.objects.all()
    serializer_class = AgentModelSerializer
    permission_classes = [IsAuthenticated]

class SupplierModelViewSet(viewsets.ModelViewSet):
    queryset = SupplierModel.objects.all()
    serializer_class = SupplierModelSerializer
    permission_classes = [IsAuthenticated]