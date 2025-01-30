from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Property, Realtor, Negotiation, Review, Complaint
from .serializers import PropertySerializer, RealtorSerializer, NegotiationSerializer, ReviewSerializer, ComplaintSerializer
from django.core.mail import EmailMessage
from django.conf import settings
from .utils import send_status_change_email
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

logger = logging.getLogger(__name__)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    # permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]  # Ensure JWT authentication is used

    def get_queryset(self):
        queryset = super().get_queryset()
        city = self.request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(city__iexact=city)
        return queryset

    def perform_create(self, serializer):
        try:
            logger.info("Data received for Property creation: %s", self.request.data)
            serializer.save(owner=self.request.user, status='unapproved')
        except Exception as e:
            logger.error(f"Error creating property: {e}")
            raise

    def perform_update(self, serializer):
        try:
            instance = serializer.save()
            initial_status = instance.status
            final_status = serializer.validated_data.get('status', instance.status)
            if initial_status != final_status:
                send_status_change_email(instance.owner.email, initial_status, final_status)
            logger.info("Property updated from %s to %s", initial_status, final_status)
        except Exception as e:
            logger.error(f"Error updating property: {e}")
            raise

class RealtorViewSet(viewsets.ModelViewSet):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer
    permission_classes = [IsAuthenticated]  # Ensure authentication is required
    authentication_classes = [JWTAuthentication]  # Ensure JWT authentication is used

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return RealtorSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        try:
            logger.info("Data received for Realtor creation: %s", self.request.data)
            serializer.save()
        except Exception as e:
            logger.error(f"Error creating realtor: {e}")
            raise

    def perform_update(self, serializer):
        try:
            instance = serializer.save()
            logger.info("Realtor updated: %s", instance)
        except Exception as e:
            logger.error(f"Error updating realtor: {e}")
            raise

class NegotiationViewSet(viewsets.ModelViewSet):
    queryset = Negotiation.objects.all()
    serializer_class = NegotiationSerializer
    permission_classes = [IsAuthenticated]  # Ensure authentication is required
    authentication_classes = [JWTAuthentication]  # Ensure JWT authentication is used

    def perform_create(self, serializer):
        try:
            logger.info("Data received for Negotiation creation: %s", self.request.data)
            negotiation = serializer.save()
            property = negotiation.property
            property.negotiation_count += 1
            total_negotiation_price = property.average_negotiation_price * (property.negotiation_count - 1) + negotiation.negotiated_price
            property.average_negotiation_price = total_negotiation_price / property.negotiation_count
            property.save()
            logger.info("Negotiation created and Property updated: %s", property)
        except Exception as e:
            logger.error(f"Error creating negotiation: {e}")
            raise

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]  # Ensure authentication is required
    authentication_classes = [JWTAuthentication]  # Ensure JWT authentication is used

    def perform_create(self, serializer):
        try:
            logger.info("Data received for Review creation: %s", self.request.data)
            serializer.save()
        except Exception as e:
            logger.error(f"Error creating review: {e}")
            raise

    def perform_update(self, serializer):
        try:
            instance = serializer.save()
            logger.info("Review updated: %s", instance)
        except Exception as e:
            logger.error(f"Error updating review: {e}")
            raise

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]  # Ensure authentication is required
    authentication_classes = [JWTAuthentication]  # Ensure JWT authentication is used

    def perform_create(self, serializer):
        try:
            logger.info("Data received for Complaint creation: %s", self.request.data)
            serializer.save()
        except Exception as e:
            logger.error(f"Error creating complaint: {e}")
            raise

    def perform_update(self, serializer):
        try:
            instance = serializer.save()
            logger.info("Complaint updated: %s", instance)
        except Exception as e:
            logger.error(f"Error updating complaint: {e}")
            raise