from django.core.mail import EmailMessage
from django.conf import settings

def send_status_change_email(email, initial_status, final_status):
    email_subject = 'Property Status Changed'
    email_body = f"Hi,\n\nThe status of your property has been changed from {initial_status} to {final_status}.\n\nBest Regards,\nReal Estate Team"
    from_email = settings.DEFAULT_FROM_EMAIL

    composed_email = EmailMessage(subject=email_subject, body=email_body, from_email=from_email, to=[email])
    composed_email.send(fail_silently=True)
