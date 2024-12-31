from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from account.models import (
    User, Profile, KYC, ManagerModel, BuyerModel, SellerModel, OwnerModel, LawyerModel, AgentModel, SupplierModel
)
from account.serializers import (
    UserSerializer, ProfileSerializer, KYCSerializer, ManagerModelSerializer, BuyerModelSerializer,
    SellerModelSerializer, OwnerModelSerializer, LawyerModelSerializer, AgentModelSerializer, SupplierModelSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

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