import { Board } from "src/app/models/board";

export interface BoardState {
  boards: Board[];
  // Add other state properties if needed
}

export const initialBoardState: BoardState = {
  boards: [],
  // Initialize other state properties if needed
};