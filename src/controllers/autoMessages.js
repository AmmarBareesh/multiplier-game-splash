/**
 * autoMessages.js
 *
 * Module to handle automatic messages from bots at specific intervals.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

/**
 * Sends automated messages from bots at specified intervals.
 *
 * @param {Object} socket - The socket instance to emit messages.
 */
const sendAutoMessages = (socket) => {
    setTimeout(() => {
      socket.emit('chat message', {
        nickname: 'CPU 1',
        msg: 'hi guys',
      });
    }, 2000);
  
    setTimeout(() => {
      socket.emit('chat message', {
        nickname: 'CPU 2',
        msg: 'Hiiiiiiiiii men',
      });
    }, 5000);
  
    setTimeout(() => {
      socket.emit('chat message', {
        nickname: 'CPU 1',
        msg: 'I could play this game for hours!',
      });
    }, 8000);
  };
  
  module.exports = {
    sendAutoMessages,
  };
  