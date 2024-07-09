/**
 * Leaderboard.tsx
 *
 * Leaderboard component for displaying the leaderboard.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './Leaderboard.css';

interface Player {
  id: number;
  name: string;
  score: number;
}

/**
 * Leaderboard component for displaying the leaderboard.
 */
const Leaderboard: React.FC = () => {
  const usersRanking = useSelector((state: RootState) => state.game.usersRanking) as Player[];
  const isAnimationVisible = useSelector((state: RootState) => state.game.animShow);

  // Memoize the sorted ranking array to avoid unnecessary calculations
  const sortedRanking = useMemo(() => {
    return [...usersRanking].sort((a, b) => b.score - a.score);
  }, [usersRanking]);

  return (
    <div className="col-12 col-md-6" data-testid="leaderboard-container">
      <div className="card-title"><img src="/assets/images/ranking icon.png" alt="Ranking" width="20" height="20" /> Ranking</div>

      <div className="card-box leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedRanking.map((player, index) => (
              <tr
                key={player.id}
                className={
                  player.name === 'You' && !isAnimationVisible && player.score !== 0
                    ? 'my-result'
                    : ''
                }
              >
                <td>{index + 1}</td>
                <td>{isAnimationVisible || player.score === 0 ? '-' : player.name}</td>
                <td>{isAnimationVisible || player.score === 0 ? '-' : player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
