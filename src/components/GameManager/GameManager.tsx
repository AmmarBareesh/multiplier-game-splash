/**
 * GameManager.tsx
 *
 * GameManager component for managing the game process.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import { useGameEngine } from '../../hooks/useGameEngine';
import './GameManager.css';
import PointsControl from '../PointsControl/PointsControl';
import MultiplierControl from '../MultiplierControl/MultiplierControl';
import SpeedAdjuster from '../SpeedAdjuster/SpeedAdjuster';
import RoundParticipants from '../RoundParticipants/RoundParticipants';

/**
 * GameManager component for managing the game process.
 */
const GameManager: React.FC = () => {
  const {
    speed,
    setSpeedValue,
    points,
    setPointsValue,
    multiplier,
    setMultiplierValue,
    botPlayers,
    startGame,
    animationVisible,
    userBalance,
  } = useGameEngine();

  return (
    <div className="manager-section">
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <PointsControl
            points={points}
            balance={userBalance}
            onPointsChange={setPointsValue}
          />
        </div>

        <div className="col-12 col-md-6">
          <MultiplierControl
            multiplier={multiplier}
            onMultiplierChange={setMultiplierValue}
          />
        </div>
      </div>

      <button
        className="btn btn-primary control-button"
        onClick={startGame}
        disabled={animationVisible}
      >
        {animationVisible ? 'Started' : 'Start'}
      </button>

      <div className="card-title mt-3">
        <img src="assets/images/victory cup.png" alt="Victory Cup" width={20} height={20} /> 
        Current Round
      </div>
      <RoundParticipants participants={botPlayers} />

      <div className="card-title mt-3">
        <img src="assets/images/speed icon.png" alt="Speed Icon" width={20} height={20} /> 
        Speed
      </div>
      <SpeedAdjuster speed={speed} onSpeedChange={setSpeedValue} />
    </div>
  );
};

export default GameManager;
