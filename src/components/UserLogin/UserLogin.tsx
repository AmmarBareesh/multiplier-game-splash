/**
 * UserLogin.tsx
 *
 * UserLogin component for allowing the user to enter a nickname and start the game.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state';
import { setUserName } from '../../state/gameSlice';
import { default as socket } from '../../service/socketService';
import './UserLogin.css';

/**
 * UserLogin component for allowing the user to enter a nickname and start the game.
 */
const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const userName = useSelector((state: RootState) => state.game.userName);

  const submitNickname = () => {
    socket.emit('user nickname', nickname);
    dispatch(setUserName(nickname));
  };

  /**
   * Enable or disable the button based on the length of the nickname.
   */
  useEffect(() => {
    setIsButtonDisabled(nickname.length < 3);
  }, [nickname]);

  return (
    <div className={`card-box login-container ${userName ? 'd-none' : ''}`} data-testid="login-component">
      <div className="login-title">Welcome</div>

      <form>
        <div className="login-hint">Please Insert Your Name</div>
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
        />

        <button
          className="btn btn-primary"
          onClick={submitNickname}
          type="button"
          disabled={isButtonDisabled}
        >
          Accept
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
