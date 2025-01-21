from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, RealtorViewSet, NegotiationViewSet, ReviewViewSet, ComplaintViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'realtors', RealtorViewSet)
router.register(r'negotiations', NegotiationViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'complaints', ComplaintViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
