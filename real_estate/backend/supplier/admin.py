from django.contrib import admin
from .models import Supplier, Material, SupplierImage, MaterialImage

admin.site.register(Supplier)
admin.site.register(Material)
admin.site.register(SupplierImage)
admin.site.register(MaterialImage)

# Register your models here.
