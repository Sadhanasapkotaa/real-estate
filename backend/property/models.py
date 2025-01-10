from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone

class Property(models.Model):
    class SaleOrRent(models.TextChoices):
        SALE = 'sale', 'Sale'
        RENT = 'rent', 'Rent'

    class PropertyType(models.TextChoices):
        LAND = 'land', 'Land'
        HOUSE = 'house', 'House'
        OFFICE = 'office', 'Office'
        SHOP = 'shop', 'Shop'
        GODOWN = 'godown', 'Godown'
        VILLA = 'villa', 'Villa'
        LOFT = 'loft', 'Loft'

    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    type = models.CharField(max_length=50, choices=PropertyType.choices)
    sale_or_rent = models.CharField(max_length=50, choices=SaleOrRent.choices)
    account_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_images/')

    def __str__(self):
        return f"Image for {self.property.title}"

class PropertyVideo(models.Model):
    property = models.ForeignKey(Property, related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to='property_videos/')

    def __str__(self):
        return f"Video for {self.property.title}"

class Booking(models.Model):
    property = models.ForeignKey(Property, related_name='bookings', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"Booking for {self.property.title} by {self.user.email} from {self.start_date} to {self.end_date}"