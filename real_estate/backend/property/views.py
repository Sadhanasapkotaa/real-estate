from rest_framework import viewsets
from .models import Property, Realtor, Negotiation, Review, Complaint
from .serializers import PropertySerializer, RealtorSerializer, NegotiationSerializer, ReviewSerializer, ComplaintSerializer
from django.core.mail import EmailMessage
from django.conf import settings
from .utils import send_status_change_email

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        city = self.request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(city__iexact=city)
        return queryset

    def perform_update(self, serializer):
        instance = serializer.save()
        initial_status = instance.status
        final_status = serializer.validated_data.get('status', instance.status)
        if initial_status != final_status:
            send_status_change_email(instance.owner.email, initial_status, final_status)

class RealtorViewSet(viewsets.ModelViewSet):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return RealtorSerializer
        return super().get_serializer_class()

class NegotiationViewSet(viewsets.ModelViewSet):
    queryset = Negotiation.objects.all()
    serializer_class = NegotiationSerializer

    def perform_create(self, serializer):
        negotiation = serializer.save()
        property = negotiation.property
        property.negotiation_count += 1
        total_negotiation_price = property.average_negotiation_price * (property.negotiation_count - 1) + negotiation.negotiated_price
        property.average_negotiation_price = total_negotiation_price / property.negotiation_count
        property.save()

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer