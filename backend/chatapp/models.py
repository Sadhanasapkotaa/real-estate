from django.db import models
from django.conf import settings

class Room(models.Model):
    name = models.CharField(max_length=255)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='rooms')

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Call(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    call_type = models.CharField(max_length=10, choices=[('audio', 'Audio'), ('video', 'Video')])
    recorded_file = models.FileField(upload_to='recordings/', null=True, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

class Reaction(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='reactions')
    emoji = models.CharField(max_length=10)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)