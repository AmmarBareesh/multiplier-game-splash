/**
 * useGameEngine.ts
 *
 * Custom hook for managing game logic including bot players, game state, and animations.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RootState } from '../state';
import {
  generateValue,
  setSpeed,
  setAnimationState,
  updateBalance,
} from '../state/gameSlice';
import { useBotPlayers } from './useBotPlayers';
import { generateRandomNumber } from '../utils/randomNumberUtil';

/**
 * Custom hook for managing game logic.
 * @returns An object containing game state and functions to manage the game.
 */
export const useGameEngine = () => {
  const dispatch = useDispatch();
  const [speed, setSpeedValue] = useState<number>(0);
  const [generatedValue, setGeneratedValue] = useState<number>(generateRandomNumber(1, 9, 2));
  const [points, setPointsValue] = useState<number>(50);
  const [multiplier, setMultiplierValue] = useState<number>(1.0);

  const { botPlayers, generateBotPlayers } = useBotPlayers(points, multiplier);

  const animationVisible = useSelector((state: RootState) => state.game.animShow);
  const userBalance = useSelector((state: RootState) => state.game.balance);

  /**
   * Start the game with the current settings.
   */
  const startGame = () => {
    if (userBalance <= 0) {
      toast('Not enough points to start', {
        duration: 4000,
        icon: '⚠️',
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
    }

    const newGeneratedValue = generateRandomNumber(1, 9, 2);
    setGeneratedValue(newGeneratedValue);
    dispatch(setSpeed(speed));
    generateBotPlayers();
    dispatch(generateValue(newGeneratedValue));
    dispatch(updateBalance(userBalance - points));

    setTimeout(() => updateBalanceAfterRound(newGeneratedValue), calculateTimeout());
  };

  /**
   * Update the user's balance after the game round.
   * @param newGeneratedValue - The new generated value.
   */
  const updateBalanceAfterRound = (newGeneratedValue: number) => {
    dispatch(setAnimationState(false));
    if (newGeneratedValue === multiplier) {
      dispatch(updateBalance(userBalance + points));
    } else {
      dispatch(updateBalance(userBalance - points));
    }
  };

  /**
   * Calculate the timeout duration based on speed.
   * @returns {number} - Timeout duration in milliseconds.
   */
  const calculateTimeout = (): number => {
    return 3000 / (speed || 1); // Higher speed means faster animation
  };

  return {
    speed,
    setSpeedValue,
    generatedValue,
    points,
    setPointsValue,
    multiplier,
    setMultiplierValue,
    botPlayers,
    startGame,
    animationVisible,
    userBalance,
  };
};
