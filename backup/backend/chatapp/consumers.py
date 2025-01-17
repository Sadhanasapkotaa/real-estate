import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        username = data.get('username')

        if message == 'start_video_call':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'start_video_call',
                    'username': username,
                }
            )
        else:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'username': username,
                }
            )

    async def start_video_call(self, event):
        username = event['username']

        await self.send(text_data=json.dumps({
            'type': 'video_call',
            'username': username,
            'message': 'A video call has started!'
        }))

    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
        }))

class VideoCallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'video_call_{self.room_name}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')

        if message_type == 'offer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'offer',
                    'offer': data['offer']
                }
            )
        elif message_type == 'answer':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'answer',
                    'answer': data['answer']
                }
            )
        elif message_type == 'candidate':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'candidate',
                    'candidate': data['candidate']
                }
            )

    async def offer(self, event):
        offer = event['offer']
        await self.send(text_data=json.dumps({
            'type': 'offer',
            'offer': offer
        }))

    async def answer(self, event):
        answer = event['answer']
        await self.send(text_data=json.dumps({
            'type': 'answer',
            'answer': answer
        }))

    async def candidate(self, event):
        candidate = event['candidate']
        await self.send(text_data=json.dumps({
            'type': 'candidate',
            'candidate': candidate
        }))