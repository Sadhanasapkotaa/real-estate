import random
from django.core.mail import EmailMessage
from .models import User, OneTimePassword
from django.conf import settings

def generateOTP():
    otp = random.randint(100000, 999999)
    return otp

def send_code_to_user(email, otp=None):
    email_subject = 'Email Verification For Rentmyspace'
    otp_code = otp if otp else generateOTP()
    print(otp_code)
    user = User.objects.get(email=email)
    current_site = "Rentmyspace.com"
    email_body = f"Hi {user.first_name},\n\nThank you for choosing {current_site} to find your ideal real estate space. \n\nYour OTP for email verification is {otp_code}. Please enter this code to verify your email.\n\nWarm Regards,\nTeam Rentmyspace"
    from_email = settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, code=otp_code)

    composed_email = EmailMessage(subject=email_subject, body=email_body, from_email=from_email, to=[email])
    composed_email.send(fail_silently=True)


def send_normal_email(data):
    email = EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[data['to_email']]
    )
    composed_email = EmailMessage(subject=data['email_subject'], body=data['email_body'], from_email=settings.DEFAULT_FROM_EMAIL, to=[data['to_email']])
    composed_email.send(fail_silently=True)