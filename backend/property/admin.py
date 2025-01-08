from django.contrib import admin
# Register your models here.
from .models import Property, PropertyImage, PropertyVideo

admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(PropertyVideo)