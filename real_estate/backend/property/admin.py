from django.contrib import admin
from .models import Property, Realtor, Negotiation, Review, Complaint

admin.site.register(Property)
admin.site.register(Realtor)
admin.site.register(Negotiation)
admin.site.register(Review)
admin.site.register(Complaint)