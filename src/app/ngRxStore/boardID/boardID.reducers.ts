import { createReducer, on } from '@ngrx/store';
import { setCurrentBoardId } from './boardID.actions';
import { initialState } from './boardID.state';



export const boardidReducer = createReducer(
    initialState,
    on(setCurrentBoardId, (state, { boardId }) => ({
        ...state,
        currentBoardId: boardId,
    }))
);
