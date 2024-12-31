from django.contrib import admin
from account.models import (
    User, Profile, KYC, ManagerModel, BuyerModel, SellerModel, OwnerModel, LawyerModel, AgentModel, SupplierModel
)
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Customizing the user model admin
class UserModelAdmin(BaseUserAdmin):
    list_display = ['id', 'email', 'name', 'role', 'is_active', 'is_admin']
    search_fields = ['email', 'name']
    ordering = ['email']
    list_filter = ['is_admin', 'is_active', 'role']
    filter_horizontal = ()

    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal Information', {'fields': ('name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_admin')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'role', 'password1', 'password2'),
        }),
    )

# Registering the custom user model with the admin site
admin.site.register(User, UserModelAdmin)

# Registering other models with the admin site
admin.site.register(Profile)
admin.site.register(KYC)
admin.site.register(ManagerModel)
admin.site.register(BuyerModel)
admin.site.register(SellerModel)
admin.site.register(OwnerModel)
admin.site.register(LawyerModel)
admin.site.register(AgentModel)
admin.site.register(SupplierModel)