/**
 * RoundParticipants.tsx
 *
 * RoundParticipants component for displaying the current round's participants.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import './RoundParticipants.css';

interface Participant {
  id: number;
  name: string;
  points: number | string;
  multiplier: number | string;
  score: number;
}

interface RoundParticipantsProps {
  participants: Participant[];
}

/**
 * RoundParticipants component for displaying the current round's participants.
 *
 * @param participants - The list of participants in the current round.
 */
const RoundParticipants: React.FC<RoundParticipantsProps> = ({ participants }) => {
  return (
      <div className="card-box round-container">
        <table className="round-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
              <th>Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={participant.id} className={index === 0 ? 'my-result' : ''}>
                <td>{participant.name}</td>
                <td>{participant.points}</td>
                <td>{participant.multiplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default RoundParticipants;
