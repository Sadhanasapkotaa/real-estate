from django.urls import path
from . import consumers, views

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
    path('ws/video_call/<str:room_name>/', consumers.VideoCallConsumer.as_asgi()),
]

urlpatterns = [
    path('video_call/<str:room_name>/', views.video_call, name='video_call'),
    path('create_room/', views.create_room, name='create_room'),
]