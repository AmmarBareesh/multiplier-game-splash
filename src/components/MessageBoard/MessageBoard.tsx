/**
 * MessageBoard.tsx
 *
 * MessageBoard component for displaying and sending chat messages.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useMessageHandler } from '../../hooks/useMessageHandler';
import './MessageBoard.css';

/**
 * MessageBoard component for displaying and sending chat messages.
 */
const MessageBoard: React.FC = () => {
  const {
    msg,
    setMsg,
    chatMessages,
    notifications,
    usersOnline,
    messagesEndRef,
    submitMessage,
  } = useMessageHandler();

  return (
    <div className="col-12 col-md-6">
      <div className="card-title">
      <img src="/assets/images/chat icon.png" alt="Ranking" width="20" height="20" /> Chat
      </div>

      <div className="card-box">
        <Toaster />

        <div className="messages-container" id="msg">
          {chatMessages.map((message, index) => (
              <div key={index} className={`chat-message ${message.nickname === 'CPU 2' ? 'cpu-2-message' : ''}`}>
              <div className="message-row">
                <div className="nickname">{message.nickname}:</div>
                <div className="user-message">{message.msg}</div>
              </div>
            </div>
          ))}
          {notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="message-board-container" onSubmit={submitMessage}>
          <input
            type="text"
            className="message-input"
            name="message"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className="btn btn-primary" type="submit">
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageBoard;
