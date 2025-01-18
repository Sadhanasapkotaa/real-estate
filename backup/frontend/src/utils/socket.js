import { io } from 'socket.io-client';
const socket = io('wss://localhost:8000');
export default socket;
