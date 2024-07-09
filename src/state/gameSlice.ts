/**
 * gameSlice.ts
 *
 * Redux slice for managing game state including user balance, generated values, speed, animation state,
 * and player rankings.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Player interface
export interface Player {
  id: number;
  name: string;
  points: number;
  multiplier: number | string;
  score: number;
}

// Define the initial state interface
interface GameState {
  userName: string;
  balance: number;
  generatedValue: number;
  speed: number;
  animShow: boolean;
  usersRanking: Player[];
}

// Set the initial state
const initialState: GameState = {
  userName: "",
  balance: 1000,
  generatedValue: 0,
  speed: 0,
  animShow: false,
  usersRanking: [],
};

// Create the Redux slice
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    // Action to set the user's name
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    // Action to generate a new value and show animation
    generateValue: (state, action: PayloadAction<number>) => {
      state.animShow = true;
      state.generatedValue = action.payload;
    },
    // Action to set the speed of the game
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    // Action to show or hide animation
    setAnimationState: (state, action: PayloadAction<boolean>) => {
      state.animShow = action.payload;
    },
    // Action to update the user's balance
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    // Action to set the users' ranking
    setUsersRanking: (state, action: PayloadAction<Player[]>) => {
      state.usersRanking = action.payload;
    },
  },
});

export const {
  setUserName,
  generateValue,
  setSpeed,
  setAnimationState,
  updateBalance,
  setUsersRanking,
} = gameSlice.actions;

export default gameSlice.reducer;
