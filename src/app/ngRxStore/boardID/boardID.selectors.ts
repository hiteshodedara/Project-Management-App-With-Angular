import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardidState } from './boardID.state';

export const selectBoardState = createFeatureSelector<BoardidState>('board');

export const selectCurrentBoardId = createSelector(
    selectBoardState,
    (state: BoardidState) => state.currentBoardId
);
