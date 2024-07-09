
# Multiplier Game Splash

Multiplier Game Splash is a web-based game application built with React, Redux, and Socket.IO. It features real-time chat, a leaderboard, game management, and dynamic animations, providing an engaging user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Proxy Configuration](#proxy-configuration)
- [Backend Server](#backend-server)
- [License](#license)

## Features

- **User Authentication**: Users can log in with a nickname to join the game.
- **Real-time Chat**: Chat functionality using WebSocket.
- **Dynamic Leaderboard**: Displays player rankings in real-time.
- **Game Management**: Control game settings and view game statistics.
- **Value Chart Visualization**: Real-time visualization of game values.
- **Bot Players Simulation**: Simulated bot players to enhance game dynamics.

## Technologies Used

- **Frontend**: React, Redux, TypeScript, Recharts, React Bootstrap
- **Backend**: Express, Socket.IO
- **Styling**: Bootstrap, Custom CSS
- **Utilities**: React Hot Toast for notifications

## Project Structure

```
multiplier-game-splash/
├── public/
├── src/
│   ├── components/        # React components
│   ├── controllers/       # Backend controllers
│   ├── hooks/             # Custom React hooks
│   ├── service/           # Service files
│   ├── state/             # Redux state management
│   ├── utils/             # Utility functions
│   ├── App.css            # Global styles
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Entry point for React
│   ├── reportWebVitals.ts # Performance measurement
│   ├── setupTests.ts      # Testing setup
├── .env                   # Environment variables
├── .gitignore
├── package.json
├── proxyConfiguration.js  # Proxy setup for development
├── appServer.js           # Backend server setup
├── README.md
```

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/multiplier-game-splash.git
   cd multiplier-game-splash
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. **Create a `.env` file** in the root directory and add your environment variables:

   ```sh
   REACT_APP_SOCKET_URL=your_socket_server_url
   ```

4. **Start the development server**:

   ```sh
   npm run dev
   ```

   or

   ```sh
   yarn dev
   ```

## Available Scripts

- `npm run start` / `yarn start`: Starts the backend server.
- `npm run client` / `yarn client`: Starts the React development server.
- `npm run server` / `yarn server`: Starts the backend server.
- `npm run dev` / `yarn dev`: Runs both the backend server and the React development server concurrently.
- `npm run build` / `yarn build`: Builds the React application for production.

## Environment Variables

- `REACT_APP_SOCKET_URL`: The URL of the Socket.IO server.

## Proxy Configuration

The proxy configuration in `proxyConfiguration.js` allows the frontend to communicate with the backend server without CORS issues during development.

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: process.env.REACT_APP_SOCKET_URL || 'https://multiplier-game-splash-e9af12fa94aa.herokuapp.com/',
      changeOrigin: true,
      ws: true,
    })
  );
};
```

## Backend Server

The backend server in `appServer.js` uses Express and Socket.IO to handle static file serving and WebSocket connections.

```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const { handleChatConnection } = require('./src/controllers/chatHandler');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const io = new Server(server, {
  cors: {
    origin: 'https://multiplier-game-splash-e9af12fa94aa.herokuapp.com/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');
  handleChatConnection(socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
```

## License
This project is licensed under the MIT License.