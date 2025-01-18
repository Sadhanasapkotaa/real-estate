from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, RealtorViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'realtors', RealtorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
