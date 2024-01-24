import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { initialBoardState } from './board.state';



export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({ ...state, boards })),
  on(BoardActions.addBoard, (state, { workspaceId, newBoard }) => ({
    ...state,
    boards: [...state.boards, { ...newBoard, workspaceId }],
  })), 
  on(BoardActions.updateBoard, (state, { workspaceId, boardId, updatedBoard }) => ({
    ...state,
    boards: state.boards.map(board =>
      board.workspaceId === workspaceId && board.id === boardId ? { ...board, ...updatedBoard } : board
    ),
  })),
  on(BoardActions.deleteBoard, (state, { workspaceId, boardId }) => ({
    ...state,
    boards: state.boards.filter(board => !(board.workspaceId === workspaceId && board.id === boardId)),
  })),
  on(BoardActions.favoriteToggle, (state, { workspaceId, boardId }) => ({
    ...state,
    boards: state.boards.map(board =>
      board.workspaceId === workspaceId && board.id === boardId
        ? { ...board, isFavorite: !board.isFavorite } // Toggle the isFavorite property
        : board
    ),
  })),
  // Add other reducer cases for CRUD operations if needed
);
