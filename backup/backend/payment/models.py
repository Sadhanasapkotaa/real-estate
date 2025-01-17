from django.db import models

# Create your models here.

class Payment(models.Model):
    sender = models.ForeignKey('account.User', related_name='payments_sent', on_delete=models.CASCADE)
    receiver = models.ForeignKey('account.User', related_name='payments_received', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending')

    def __str__(self):
        return f"Payment of {self.amount} from {self.sender.email} to {self.receiver.email}"