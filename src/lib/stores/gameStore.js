import { writable } from "svelte/store";

// Define the initial game state
const initialGameState = {
  boardSize: 10,
  boardArray: new Array(10).fill([]).map(() => new Array(10).fill(null)),
  currentPlayer: 1,
  turn: 1,
};

// Create a writable Svelte store
export const gameState = writable(initialGameState);
