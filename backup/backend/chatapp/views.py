from rest_framework import viewsets, permissions
from django.shortcuts import render, redirect
from .models import Room, Message
from .forms import RoomForm

from .serializers import RoomSerializer, MessageSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

def video_call(request, room_name):
    return render(request, 'chatapp/video_call.html', {'room_name': room_name})

def create_room(request):
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            room = form.save()
            return redirect('video_call', room_name=room.name)
    else:
        form = RoomForm()
    return render(request, 'chatapp/create_room.html', {'form': form})

