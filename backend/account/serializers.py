from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from account.models import (
    User, Profile, KYC, ManagerModel, BuyerModel, SellerModel, OwnerModel, LawyerModel, AgentModel, SupplierModel
)

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password', 'role')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'role', 'is_active', 'is_admin', 'created_at', 'updated_at')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'address', 'phone_number', 'display_id')

class KYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = KYC
        fields = ('id', 'user', 'document_id', 'document_verified')

class ManagerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagerModel
        fields = ('id', 'user', 'department')

class BuyerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerModel
        fields = ('id', 'user', 'purchase_history')

class SellerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerModel
        fields = ('id', 'user', 'store_name')

class OwnerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerModel
        fields = ('id', 'user', 'business_name')

class LawyerModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LawyerModel
        fields = ('id', 'user', 'bar_id')

class AgentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentModel
        fields = ('id', 'user', 'bar_id')

class SupplierModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierModel
        fields = ('id', 'user', 'business_name', 'supply_type')