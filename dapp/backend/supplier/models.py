from django.db import models

# Create your models here.

class Supplier(models.Model):
    SUPPLIER_TYPES = [
        ('cement', 'Cement Supplier'),
        ('steel', 'Steel Supplier'),
        ('electrical', 'Electrical Supplier'),
        ('manpower', 'Manpower Supplier'),
        ('plumbing', 'Plumbing Supplier'),
        ('paint', 'Paint Supplier'),
        ('tiles', 'Tiles Supplier'),
        ('wood', 'Wood Supplier'),
        ('glass', 'Glass Supplier'),
        ('furniture', 'Furniture Supplier'),
        ('iot', 'IOT Technology'),
        ('other', 'Other')]
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=SUPPLIER_TYPES)
    description = models.TextField()
    phone_number = models.CharField(max_length=20)
    maplink = models.TextField(blank=True)
    website = models.URLField(blank=True)
    supplier_image = models.ImageField(upload_to='suppliers/%Y/%m/%d', blank=True, null=True)

    def __str__(self):
        return self.name

class Material(models.Model):
    MATERIAL_TYPES = [
        ('cement', 'Cement'),
        ('steel', 'Steel'),
        ('electrical', 'Electrical'),
        ('manpower', 'Manpower'),
        ('plumbing', 'Plumbing'),
        ('paint', 'Paint'),
        ('tiles', 'Tiles'),
        ('wood', 'Wood'),
        ('glass', 'Glass'),
        ('furniture', 'Furniture'),
        ('iot', 'IOT Technology'),
        ('other', 'Other')]
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='materials')
    material_type = models.CharField(max_length=50, choices=MATERIAL_TYPES)
    name = models.CharField(max_length=255)
    quantity = models.FloatField()
    quantity_unit = models.CharField(max_length=50)
    price = models.FloatField()
    price_unit = models.CharField(max_length=50)
    material_image = models.ImageField(upload_to='materials/%Y/%m/%d', blank=True)

    def __str__(self):
        return f"{self.name} ({self.material_type})"