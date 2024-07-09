/**
 * socketService.ts
 *
 * Service for managing WebSocket connections using Socket.IO.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import { io, Socket } from 'socket.io-client';

// Initialize the WebSocket connection
const socket: Socket = io(process.env.REACT_APP_SOCKET_URL || 'https://spalsh-195cf65c6b8b.herokuapp.com', {
  withCredentials: true,
});

/**
 * Export the socket instance to be used throughout the application.
 */
export default socket;
