const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const { handleChatConnection } = require('./src/controllers/chatHandler');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

// Middleware configuration
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from React app

// Initialize Socket.IO with appropriate CORS settings
const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_SOCKET_URL, // Update with your frontend origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('New client connected');
  handleChatConnection(socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Serve the React app for any unspecified routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
