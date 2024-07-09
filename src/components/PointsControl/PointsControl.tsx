/**
 * PointsControl.tsx
 *
 * PointsControl component for adjusting points.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import './PointsControl.css';

interface PointsControlProps {
  points: number;
  balance: number;
  onPointsChange: (value: number) => void;
}

/**
 * PointsControl component for adjusting points.
 *
 * @param points - The current points value.
 * @param balance - The user's balance.
 * @param onPointsChange - Function to update the points value.
 */
const PointsControl: React.FC<PointsControlProps> = ({ points, balance, onPointsChange }) => {
  const decreasePoints = () => {
    if (points > 25) onPointsChange(points - 25);
  };

  const increasePoints = () => {
    if (balance >= points + 25) onPointsChange(points + 25);
  };

  return (
    <div className="card-box info-box toggle">
      <div className="toggle-title">Points</div>
      <div className="toggle-menu">
        <div
          className="toggle-minus option"
          role="button"
          tabIndex={0}
          onClick={decreasePoints}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              decreasePoints();
            }
          }}
        >
          ▼
        </div>
        <input
          type="number"
          className="toggle-input"
          min="0"
          max={balance}
          step="25"
          onChange={(e) => onPointsChange(Number(e.target.value))}
          value={points}
        />
        <div
          className="toggle-plus option"
          role="button"
          tabIndex={0}
          onClick={increasePoints}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              increasePoints();
            }
          }}
        >
          ▲
        </div>
      </div>
    </div>
  );
};

export default PointsControl;
