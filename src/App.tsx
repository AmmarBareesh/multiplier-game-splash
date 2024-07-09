/**
 * App.tsx
 *
 * Main application component for the Multiplier Game Splash.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './state';
import MessageBoard from './components/MessageBoard/MessageBoard';
import UserLogin from './components/UserLogin/UserLogin';
import UserInfo from './components/UserInfo/UserInfo';
import ValueChart from './components/ValueChart/ValueChart';
import GameManager from './components/GameManager/GameManager';
import Leaderboard from './components/Leaderboard/Leaderboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App" data-testid="app">
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-md-4 position-relative">
              <UserLogin />
              <GameManager />
            </div>

            <div className="col-12 col-md-8">
              <UserInfo />
              <ValueChart />
            </div>
          </div>

          <div className="row mt-3">
            <Leaderboard />
            <MessageBoard />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
