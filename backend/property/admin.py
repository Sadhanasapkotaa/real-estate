from django.contrib import admin
from .models import Property, PropertyImage, PropertyVideo, Booking

admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(PropertyVideo)
admin.site.register(Booking)