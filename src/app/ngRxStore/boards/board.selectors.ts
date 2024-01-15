import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const selectBoards = createSelector(
  selectBoardState,
  (state: BoardState) => state.boards
);

// Add other selectors for specific properties if needed
