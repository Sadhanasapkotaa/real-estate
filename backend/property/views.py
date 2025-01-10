from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from .models import Property, Booking
from .serializers import PropertySerializer, BookingSerializer

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            print(f"Error in PropertyListCreateView: {e}")
            return Response({"error": "An error occurred while creating the property"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        try:
            property_instance = self.get_object()
            serializer = self.get_serializer(property_instance)
            return Response(serializer.data)
        except Property.DoesNotExist:
            return Response({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        try:
            property_instance = self.get_object()
            serializer = self.get_serializer(property_instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Property.DoesNotExist:
            return Response({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            property_instance = self.get_object()
            property_instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Property.DoesNotExist:
            return Response({"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND)

class BookPropertyView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            property_instance = Property.objects.get(pk=self.kwargs['pk'])
            if property_instance.is_booked:
                return Response({"error": "Property is already booked"}, status=status.HTTP_400_BAD_REQUEST)
            start_date = serializer.validated_data.get('start_date')
            end_date = serializer.validated_data.get('end_date')
            if start_date >= end_date:
                return Response({"error": "End date must be after start date"}, status=status.HTTP_400_BAD_REQUEST)
            property_instance.is_booked = True
            property_instance.save()
            booking = serializer.save(user=self.request.user, property=property_instance)
            # Notify the property owner and the buyer
            self.notify_owner(property_instance)
            self.notify_buyer(booking)
        except Exception as e:
            print(f"Error in BookPropertyView: {e}")
            return Response({"error": "An error occurred while booking the property"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def notify_owner(self, property_instance):
        owner = property_instance.account_user
        # Implement your notification logic here
        print(f"Notification: Property '{property_instance.title}' has been booked by {self.request.user.email}")

    def notify_buyer(self, booking):
        buyer = booking.user
        # Implement your notification logic here
        print(f"Notification: You have successfully booked the property '{booking.property.title}' from {booking.start_date} to {booking.end_date}")