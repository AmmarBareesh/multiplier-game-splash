/**
 * MultiplierControl.tsx
 *
 * MultiplierControl component for adjusting the multiplier value.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';

interface MultiplierControlProps {
  multiplier: number;
  onMultiplierChange: (value: number) => void;
}

/**
 * MultiplierControl component for adjusting the multiplier value.
 *
 * @param multiplier - The current multiplier value.
 * @param onMultiplierChange - Function to update the multiplier value.
 */
const MultiplierControl: React.FC<MultiplierControlProps> = ({ multiplier, onMultiplierChange }) => {
  const decreaseMultiplier = () => {
    if (multiplier >= 1.25) onMultiplierChange(multiplier - 0.25);
  };

  const increaseMultiplier = () => {
    if (10 >= multiplier + 0.25) onMultiplierChange(multiplier + 0.25);
  };

  return (
    <div className="card-box info-box toggle">
      <div className="toggle-title">Multiplier</div>
      <div className="toggle-menu">
        <div
          className="toggle-minus option"
          role="button"
          tabIndex={0}
          onClick={decreaseMultiplier}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              decreaseMultiplier();
            }
          }}
        >
          ▼
        </div>

        <input
          type="number"
          className="toggle-input"
          min="1"
          max="10"
          step="0.25"
          onChange={(e) => onMultiplierChange(Number(e.target.value))}
          value={multiplier}
        />
        <button className="toggle-plus option" onClick={increaseMultiplier}>
          ▲
        </button>
      </div>
    </div>
  );
};

export default MultiplierControl;
