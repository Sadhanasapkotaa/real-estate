# ...existing code...
DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    'ACTIVATION_URL': 'auth/activate/{uid}/{token}',  # Ensure this matches your frontend route
    "SEND_ACTIVATION_EMAIL": True,
    "SEND_CONFIRMATION_EMAIL": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_RESET_CONFIRM_URL": "password-reset/{uid}/{token}",
    "SET_PASSWORD_RETYPE": True,
    "SET_PASSWORD_SHOW_EMAIL_NOT_FOUND": True,
    "TOKEN_MODEL": None,
    "SERIALIZERS": {
        "user_create": "account.serializers.UserCreateSerializer",
        "user": "account.serializers.UserCreateSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
}
# ...existing code...
