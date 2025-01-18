from rest_framework import viewsets
from .models import Property, Realtor
from .serializers import PropertySerializer, RealtorSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        city = self.request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(city__iexact=city)
        return queryset

class RealtorViewSet(viewsets.ModelViewSet):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return RealtorSerializer
        return super().get_serializer_class()

# Create your views here.
