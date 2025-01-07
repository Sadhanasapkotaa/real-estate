from django.test import TestCase, Client
from django.urls import reverse
from .models import Room
from django.contrib.auth.models import User

class RoomModelTest(TestCase):
    def setUp(self):
        self.room = Room.objects.create(name="Test Room")

    def test_room_creation(self):
        self.assertEqual(self.room.name, "Test Room")
        self.assertEqual(Room.objects.count(), 1)

class CreateRoomViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.client.login(username='testuser', password='12345')

    def test_create_room_view_get(self):
        response = self.client.get(reverse('create_room'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'chatapp/create_room.html')

    def test_create_room_view_post(self):
        response = self.client.post(reverse('create_room'), {'name': 'New Room'})
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Room.objects.count(), 1)
        self.assertEqual(Room.objects.first().name, 'New Room')
        self.assertRedirects(response, reverse('video_call', args=['New Room']))
