import { io } from 'socket.io-client';
const socket = new WebSocket('wss://localhost:8000/ws/chat/testroom/');
// const socket = io('wss://localhost:8000');
export default socket;
