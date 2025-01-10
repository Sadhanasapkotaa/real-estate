from rest_framework import serializers
from .models import Property, PropertyImage, PropertyVideo, Booking

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = "__all__"

class PropertyVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyVideo
        fields = "__all__"

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    videos = PropertyVideoSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(write_only=True),
        write_only=True
    )
    uploaded_videos = serializers.ListField(
        child=serializers.FileField(write_only=True),
        write_only=True
    )

    class Meta:
        model = Property
        fields = '__all__'

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')
        uploaded_videos = validated_data.pop('uploaded_videos')
        property_instance = Property.objects.create(**validated_data)
        for image in uploaded_images:
            PropertyImage.objects.create(property=property_instance, image=image)
        for video in uploaded_videos:
            PropertyVideo.objects.create(property=property_instance, video=video)
        return property_instance

class BookingSerializer(serializers.ModelSerializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()

    class Meta:
        model = Booking
        fields = '__all__'
