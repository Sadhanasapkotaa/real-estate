from django.contrib import admin
# Register your models here.
from .models import Property, PropertyImage

admin.site.register(Property)
admin.site.register(PropertyImage)