from django.urls import path
from .views import PropertyListCreateView, PropertyDetailView, BookPropertyView

urlpatterns = [
    path('properties/', PropertyListCreateView.as_view(), name='property-list-create'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
    path('properties/<int:pk>/book/', BookPropertyView.as_view(), name='book-property'),
]
