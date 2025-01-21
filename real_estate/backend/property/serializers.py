from rest_framework import serializers
from .models import Property, Realtor, Negotiation, Review, Complaint

class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super().__init__(*args, **kwargs)
        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class PropertySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

class RealtorSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Realtor
        fields = '__all__'

class NegotiationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Negotiation
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'