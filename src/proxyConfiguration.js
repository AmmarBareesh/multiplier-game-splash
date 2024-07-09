/**
 * configureProxy.js
 * 
 * Proxy configuration for the Multiplier Game Splash application.
 * This setup enables smooth API and WebSocket communication between
 * the React frontend and the backend server, avoiding CORS issues during development.
 * 
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

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
