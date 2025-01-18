from rest_framework import serializers
from .models import Property, Realtor

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