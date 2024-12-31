from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import Max
from django.db.models.signals import post_save
from django.dispatch import receiver
from enum import Enum

class RolePrefix(Enum):
    AGENT = 'A-'
    BUYER = 'B-'
    SELLER = 'S-'
    OWNER = 'O-'
    LAWYER = 'L-'
    MANAGER = 'M-'
    SUPPLIER = 'SP-'
    MULTIPLE = 'MUL-'

    @classmethod
    def get_prefix(cls, roles):
        """Returns the prefix for the roles."""
        if len(roles) > 1:
            return cls.MULTIPLE.value
        return cls[roles[0].upper()].value if roles[0].upper() in cls.__members__ else 'U-'

class UserManager(BaseUserManager):
    def create_user(self, email, name, roles, password=None):
        if not roles:
            raise ValueError("Users must have at least one role")
        
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        user.roles.set(roles)
        return user

    def create_superuser(self, email, name, roles=['admin'], password=None):
        if not email:
            raise ValueError("Superusers must have an email address")
        
        user = self.create_user(
            email=email,
            name=name,
            roles=roles,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('agent', 'Agent'),
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
        ('owner', 'Owner'),
        ('lawyer', 'Lawyer'),
        ('manager', 'Manager'),
        ('supplier', 'Supplier'),
    ]

    user_id = models.CharField(max_length=10, unique=True, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    roles = models.ManyToManyField('Role', related_name='users')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.name

    @property
    def is_staff(self):
        return self.is_admin

    def generate_user_id(self):
        roles = self.roles.values_list('name', flat=True)
        prefix = RolePrefix.get_prefix(roles)
        latest_user = User.objects.filter(roles__name__in=roles).aggregate(Max('user_id'))
        latest_id = latest_user['user_id__max']

        if latest_id:
            latest_number = int(latest_id.split('-')[1])
            return f"{prefix}{latest_number + 1:03d}"
        return f"{prefix}001"

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = self.generate_user_id()
        else:
            roles = self.roles.values_list('name', flat=True)
            if len(roles) > 1 and not self.user_id.startswith(RolePrefix.MULTIPLE.value):
                self.user_id = f"{RolePrefix.MULTIPLE.value}{self.user_id.split('-')[1]}"
            elif len(roles) == 1 and self.user_id.startswith(RolePrefix.MULTIPLE.value):
                prefix = RolePrefix.get_prefix(roles)
                self.user_id = f"{prefix}{self.user_id.split('-')[1]}"
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

class Role(models.Model):
    name = models.CharField(max_length=20, choices=User.ROLE_CHOICES, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'role'
        verbose_name_plural = 'roles'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    address = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    display_id = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.email}"

    class Meta:
        verbose_name = 'profile'
        verbose_name_plural = 'profiles'

class KYC(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='kyc')
    document_id = models.CharField(max_length=50, blank=True, null=True)
    document_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"KYC for {self.user.email}"

    class Meta:
        verbose_name = 'KYC'
        verbose_name_plural = 'KYC'

# ROLE-SPECIFIC MODELS
class ManagerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=255, blank=True, null=True)

class BuyerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    purchase_history = models.TextField(blank=True, null=True)

class SellerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    store_name = models.CharField(max_length=255, blank=True, null=True)


class OwnerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=255, blank=True, null=True)


class LawyerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bar_id = models.CharField(max_length=50, blank=True, null=True)


class AgentModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bar_id = models.CharField(max_length=50, blank=True, null=True)


class SupplierModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=255, blank=True, null=True)
    
    class SupplyType(models.TextChoices):
        GOODS = 'goods', 'Goods'
        SERVICES = 'services', 'Services'
        BOTH = 'both', 'Both'

    supply_type = models.CharField(
        max_length=20,
        choices=SupplyType.choices,
        default=SupplyType.GOODS,
    )

@receiver(post_save, sender=User)
def create_related_models(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        KYC.objects.create(user=instance)
        roles = instance.roles.values_list('name', flat=True)
        for role in roles:
            if role == 'buyer':
                BuyerModel.objects.create(user=instance)
            elif role == 'seller':
                SellerModel.objects.create(user=instance)
            elif role == 'owner':
                OwnerModel.objects.create(user=instance)
            elif role == 'lawyer':
                LawyerModel.objects.create(user=instance)
            elif role == 'agent':
                AgentModel.objects.create(user=instance)
            elif role == 'manager':
                ManagerModel.objects.create(user=instance)
            elif role == 'supplier':
                SupplierModel.objects.create(user=instance)