/**
 * SpeedAdjuster.tsx
 *
 * SpeedAdjuster component for adjusting the speed of the game.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import './SpeedAdjuster.css';

interface SpeedAdjusterProps {
  speed: number;
  onSpeedChange: (value: number) => void;
}

/**
 * SpeedAdjuster component for adjusting the speed of the game.
 *
 * @param speed - The current speed value.
 * @param onSpeedChange - Function to update the speed value.
 */
const SpeedAdjuster: React.FC<SpeedAdjusterProps> = ({ speed, onSpeedChange }) => {
  const getBackground = () => {
    const color = speed >= 1 && speed <= 5 ? `#fc5c4a` : `#0f1012`;
    return `linear-gradient(to right, ${color} ${(speed - 1) * 25}%, #161A21 ${(speed - 1) * 25}%)`;
  };

  return (
    <div className="card-box speed-container">
      <input
        type="range"
        className="speed-control"
        min="1"
        max="5"
        step="1"
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        value={speed}
        style={{ background: getBackground() }}
      />
      <div className="speed-values">
        <div className={speed >= 1 ? 'selected' : ''}>1x</div>
        <div className={speed >= 2 ? 'selected' : ''}>2x</div>
        <div className={speed >= 3 ? 'selected' : ''}>3x</div>
        <div className={speed >= 4 ? 'selected' : ''}>4x</div>
        <div className={speed >= 5 ? 'selected' : ''}>5x</div>
      </div>
    </div>
  );
};

export default SpeedAdjuster;
