/**
 * index.tsx
 *
 * Entry point for the React application. Wraps the App component with Redux Provider
 * for state management.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './state';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
