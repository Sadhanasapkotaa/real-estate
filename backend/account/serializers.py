from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from account.models import (
    User, Profile, KYC, ManagerModel, BuyerModel, SellerModel, OwnerModel, LawyerModel, AgentModel, SupplierModel, Role
)

class UserCreateSerializer(BaseUserCreateSerializer):
    roles = serializers.ListField(
        child=serializers.CharField(max_length=20)
    )

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password', 'roles')

    def create(self, validated_data):
        roles_data = validated_data.pop('roles', [])
        user = User.objects.create(is_active=False, **validated_data)
        if not roles_data:
            roles_data = ['buyer', 'owner']  # Default roles if none are provided or if the list is empty
        roles = Role.objects.filter(name__in=roles_data)
        user.roles.set(roles)
        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['roles'] = instance.roles.values_list('name', flat=True)
        return representation

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'roles', 'is_active', 'is_admin', 'created_at', 'updated_at')

    def get_roles(self, obj):
        return obj.roles.values_list('name', flat=True)

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