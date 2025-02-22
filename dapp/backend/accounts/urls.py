from django.urls import path
from .views import (
    RegisterUserView, VerifyUserEmail, LoginUserView, LogoutUserView, 
    TestAuthenticationView, PasswordResetRequestView, PasswordResetConfirm, 
    SetNewPassword, UpdateUserRoleView
)

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify/', VerifyUserEmail.as_view(), name='verify'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('profile/', TestAuthenticationView.as_view(), name='granted'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>', PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPassword.as_view(), name='set-new-password'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('update-role/', UpdateUserRoleView.as_view(), name='update-role'),
]