from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Material
from .serializers import SupplierSerializer, MaterialSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
