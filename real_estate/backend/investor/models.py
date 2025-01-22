from django.db import models
from django.conf import settings
from jointdev.models import JointDevelopment  # Correct import for JointDevelopment model

class Investor(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='investments', 
        on_delete=models.CASCADE, 
        verbose_name="Investor"
    )
    joint_development = models.ForeignKey(
        JointDevelopment, 
        related_name='investors', 
        on_delete=models.CASCADE, 
        verbose_name="Joint Development"
    )
    amount_invested = models.DecimalField(
        max_digits=12, decimal_places=2, verbose_name="Amount Invested"
    )
    investment_status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name="Investment Status"
    )
    date_invested = models.DateTimeField(auto_now_add=True, verbose_name="Date of Investment")

    def __str__(self):
        return f"Investment of {self.amount_invested} in {self.joint_development.property.title} by {self.user.get_full_name()}"

    class Meta:
        verbose_name = "Investor"
        verbose_name_plural = "Investors"