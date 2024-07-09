/**
 * UserInfo.tsx
 *
 * UserInfo component for displaying user information and balance.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import './UserInfo.css';

/**
 * UserInfo component for displaying user information and balance.
 */
const UserInfo: React.FC = () => {
  // Select userName from the Redux store
  const userName = useSelector((state: RootState) => state.game.userName);
  
  // Select userBalance from the Redux store
  const userBalance = useSelector((state: RootState) => state.game.balance);

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        <div className="card-box user-info-container">
          <div className="user-info-emoji"><img src="assets/images/victory.png" alt="" width={40} height={40}/></div>
          <div className="user-info-data">
            {userName ? userBalance.toLocaleString('en-US') : ''}
          </div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-box user-info-container">
          <div className="user-info-emoji"><img src="assets/images/user avatar.png" alt="" width={40} height={40} /></div>
          <div className="user-info-data">{userName}</div>
        </div>
      </div>

      <div className="col-12 col-md-4">
        <div className="card-box user-info-container">
          <div className="user-info-emoji"><img src="assets/images/time icon.png" alt="" width={40} height={40} /></div>
          <div className="user-info-data">{userName ? '21:30' : ''}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
