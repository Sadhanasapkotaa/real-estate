from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, MaterialViewSet

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet)
router.register(r'materials', MaterialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
