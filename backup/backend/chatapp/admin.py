from django.contrib import admin
from .models import Room, Message, Call, Reaction

admin.site.register(Room)
admin.site.register(Message)
admin.site.register(Call)
admin.site.register(Reaction)
