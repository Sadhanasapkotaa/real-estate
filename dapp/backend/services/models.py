from django.db import models

# Create your models here.

class Service(models.Model):
    SERVICE_TYPES = [
        ('engineering', 'Engineering'),
        ('measuring', 'Measuring'),
        ('legal', 'Legal'),
        ('plumbing', 'Plumbing'),
        ('electrical', 'Electrical'),
        ('landscaping', 'Landscaping'),
        ('painting', 'Painting'),
        ('security', 'Security'),
        ('moving', 'Moving'),
        ('renovation', 'Renovation'),
        ('cleaning', 'Cleaning'),
        ('other', 'Other'),
    ]
    PROVIDER_TYPES = [
        ('individual', 'Individual'),
        ('company', 'Company'),
    ]
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES, default= 'other')
    service_provider = models.CharField(max_length=255)
    provider_type = models.CharField(max_length=20, choices=PROVIDER_TYPES, default='individual')  # Add default value
    service_name = models.CharField(max_length=255)  # Fixed typo from 'sservice_name' to 'service_name'
    service_charge = models.FloatField()
    time_of_service = models.CharField(max_length=50)
    service_description = models.TextField()
    service_image = models.ImageField(upload_to='services/%Y/%m/%d', blank=True, null=True)

    def __str__(self):
        return self.get_service_type_display()
