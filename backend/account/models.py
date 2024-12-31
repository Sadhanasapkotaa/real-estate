from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import Max
from django.db.models.signals import post_save
from django.dispatch import receiver
from enum import Enum
import logging

logger = logging.getLogger(__name__)

class RolePrefix(Enum):
    AGENT = 'A-'
    BUYER = 'B-'
    SELLER = 'S-'
    OWNER = 'O-'
    LAWYER = 'L-'
    MANAGER = 'M-'
    SUPPLIER = 'SP-'

    @classmethod
    def get_prefix(cls, role):
        """Returns the prefix for the role."""
        return cls[role.upper()].value if role.upper() in cls.__members__ else 'U-'


class UserManager(BaseUserManager):
    def create_user(self, email, name, role, password=None):
        if role not in dict(User.ROLE_CHOICES):
            raise ValueError("Invalid role")
        
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            role=role,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, role='admin', password=None):
        if not email:
            raise ValueError("Superusers must have an email address")
        
        user = self.create_user(
            email=email,
            name=name,
            role=role,
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
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='buyer')
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.name

    @property
    def is_staff(self):
        return self.is_admin

    def generate_user_id(self):
        prefix = RolePrefix.get_prefix(self.role)
        latest_user = User.objects.filter(role=self.role).aggregate(Max('user_id'))
        latest_id = latest_user['user_id__max']

        if latest_id:
            latest_number = int(latest_id.split('-')[1])
            return f"{prefix}{latest_number + 1:03d}"
        return f"{prefix}001"

    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = self.generate_user_id()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'


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


class ManagerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='manager_profile')
    department = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'manager'
        verbose_name_plural = 'managers'


class BuyerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='buyer_profile')
    purchase_history = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = 'buyer'
        verbose_name_plural = 'buyers'


class SellerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_profile')
    store_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'seller'
        verbose_name_plural = 'sellers'

class OwnerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='owner_profile')
    business_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = 'owner'
        verbose_name_plural = 'owners'


class LawyerModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='lawyer_profile')
    bar_id = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = 'lawyer'
        verbose_name_plural = 'lawyers'


class AgentModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='agent_profile')
    bar_id = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = 'agent'
        verbose_name_plural = 'agents'


class SupplierModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='supplier_profile')
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

    class Meta:
        verbose_name = 'supplier'
        verbose_name_plural = 'suppliers'


@receiver(post_save, sender=User)
def create_related_models(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        KYC.objects.create(user=instance)

        try:
            model_class = globals().get(f"{instance.role.capitalize()}Model")
            if model_class:
                model_class.objects.create(user=instance)
            else:
                logger.warning(f"No model class found for role: {instance.role}")
        except Exception as e:
            logger.error(f"An error occurred while creating related models: {e}")