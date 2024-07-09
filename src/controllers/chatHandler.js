/**
 * chatHandler.js
 *
 * Module to handle chat-related socket events.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

const { sendAutoMessages } = require('./autoMessages');

let activeUsers = new Map();

/**
 * Handles a new chat connection.
 *
 * @param {Object} socket - The socket instance.
 */
const handleChatConnection = (socket) => {
  const { id } = socket.client;

  // Listen for 'user nickname' event
  socket.on('user nickname', (nickname) => {
    activeUsers.set(nickname, [socket.client.id, socket.id]);

    socket.broadcast.emit('users-on', Array.from(activeUsers.keys()));

    socket.emit('user-data', [nickname, socket.client.id]);

    sendAutoMessages(socket);
  });

  // Listen for 'chat message' events from the client
  socket.on('chat message', ({ nickname, msg }) => {
    socket.broadcast.emit('chat message', { nickname, msg });
  });

  // Handle socket disconnections
  socket.on('disconnect', () => {
    let disconnectedUser;

    // Find the nickname of the disconnected user
    for (let [key, value] of activeUsers.entries()) {
      if (value[0] === id) {
        disconnectedUser = key;
        activeUsers.delete(key);
        break;
      }
    }

    // Broadcast the updated list of connected users
    socket.broadcast.emit('users-on', Array.from(activeUsers.keys()));

    // Broadcast the nickname of the disconnected user
    socket.broadcast.emit('user-disconnected', disconnectedUser);
  });
};

module.exports = {
  handleChatConnection,
};
