/**
 * index.ts
 *
 * Redux store configuration for the Multiplier Game Splash application.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
