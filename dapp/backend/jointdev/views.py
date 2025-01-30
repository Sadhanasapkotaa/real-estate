from django.shortcuts import render
from rest_framework import generics
from .models import JointDevelopment
from .serializers import JointDevelopmentSerializer

class JointDevelopmentListCreateView(generics.ListCreateAPIView):
    queryset = JointDevelopment.objects.all()
    serializer_class = JointDevelopmentSerializer

class JointDevelopmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JointDevelopment.objects.all()
    serializer_class = JointDevelopmentSerializer

# Create your views here.
