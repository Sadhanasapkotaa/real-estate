from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from account.views import (
    UserViewSet, ProfileViewSet, KYCViewSet, ManagerModelViewSet, BuyerModelViewSet,
    SellerModelViewSet, OwnerModelViewSet, LawyerModelViewSet, AgentModelViewSet, SupplierModelViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'kyc', KYCViewSet)
router.register(r'managers', ManagerModelViewSet)
router.register(r'buyers', BuyerModelViewSet)
router.register(r'sellers', SellerModelViewSet)
router.register(r'owners', OwnerModelViewSet)
router.register(r'lawyers', LawyerModelViewSet)
router.register(r'agents', AgentModelViewSet)
router.register(r'suppliers', SupplierModelViewSet)

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
    # Remove the custom request_user_activation path
    # path("auth/activate/<uid>/<token>/", request_user_activation, name="request_user_activation"),
]