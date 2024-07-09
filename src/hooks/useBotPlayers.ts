/**
 * useBotPlayers.ts
 *
 * Custom hook for managing bot players logic in the game.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsersRanking } from '../state/gameSlice';
import { generateRandomNumber } from '../utils/randomNumberUtil';

// Define the shape of a player
interface Player {
  id: number;
  name: string;
  points: number;
  multiplier: number | string;
  score: number;
}

/**
 * Custom hook to manage bot players' logic.
 *
 * @param pointsValue - The current value of points.
 * @param multiplierValue - The current value of the multiplier.
 * @returns An object containing bot players value and the function to generate bot players.
 */
export const useBotPlayers = (pointsValue: number, multiplierValue: number) => {
  const dispatch = useDispatch();
  const [botPlayers, setBotPlayers] = useState<Player[]>([]);

  // Initialize bot players on component mount
  useEffect(() => {
    const initialPlayers: Player[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: i === 0 ? 'You' : `CPU ${i}`,
      points: 0, // Initialize points as 0
      multiplier: '-',
      score: 0,
    }));
    setBotPlayers(initialPlayers);
    dispatch(setUsersRanking(initialPlayers));
  }, [dispatch]);

  /**
   * Generate guesses for bot players.
   */
  const generateBotPlayers = () => {
    const players: Player[] = [
      {
        id: 0,
        name: 'You',
        points: pointsValue,
        multiplier: multiplierValue,
        score: Math.round(pointsValue * multiplierValue),
      },
      ...Array.from({ length: 4 }, (_, i) => {
        const p = generateRandomNumber(1, 700, 0);
        const m = generateRandomNumber(1, 4, 2);
        return {
          id: i + 1,
          name: `CPU ${i + 1}`,
          points: p,
          multiplier: m,
          score: Math.round(p * m),
        };
      }),
    ];
    setBotPlayers(players);
    dispatch(setUsersRanking(players));
  };

  return { botPlayers, generateBotPlayers };
};
