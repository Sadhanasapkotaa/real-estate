from django.urls import path
from .views import JointDevelopmentListCreateView, JointDevelopmentDetailView

urlpatterns = [
    path('joint-developments/', JointDevelopmentListCreateView.as_view(), name='joint-development-list-create'),
    path('joint-developments/<int:pk>/', JointDevelopmentDetailView.as_view(), name='joint-development-detail'),
]
