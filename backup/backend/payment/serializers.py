
from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'sender', 'receiver', 'amount', 'timestamp', 'status']
        read_only_fields = ['sender', 'timestamp', 'status']