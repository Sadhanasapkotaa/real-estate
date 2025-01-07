from rest_framework import serializers
from .models import Property, PropertyImage

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = "__all__"


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )

    class Meta:
        model = Property
        fields = '__all__'

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')
        property_instance = Property.objects.create(**validated_data)
        for image in uploaded_images:
            PropertyImage.objects.create(property=property_instance, image=image)
        return property_instance
