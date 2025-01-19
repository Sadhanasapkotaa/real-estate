from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.BlogListView.as_view(), name='blog-list'),
    path('blogs/<int:pk>/', views.BlogDetailView.as_view(), name='blog-detail'),
]
