import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';

export interface BoardState {
  boards: any[];
  // Add other state properties if needed
}

export const initialBoardState: BoardState = {
  boards: [],
  // Initialize other state properties if needed
};

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({ ...state, boards })),
  on(BoardActions.addBoard, (state, { workspaceId, newBoard }) => {
    const updatedBoards = state.boards.find(board => board.workspaceId === workspaceId)
      ? state.boards.map(board => (board.workspaceId === workspaceId ? { ...board, newBoard } : board))
      : [...state.boards, { workspaceId, newBoard }];
    return { ...state, boards: updatedBoards };
  }),
  on(BoardActions.updateBoard, (state, { workspaceId, boardId, updatedBoard }) => ({
    ...state,
    boards: state.boards.map(board =>
      board.workspaceId === workspaceId && board.id === boardId ? { ...board, ...updatedBoard } : board
    ),
  })),
  // Add other reducer cases for CRUD operations if needed
);
