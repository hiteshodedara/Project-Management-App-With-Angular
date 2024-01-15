import { createAction, props } from '@ngrx/store';

export const loadBoards = createAction('[Board] Load Boards', props<{ workspaceId: number }>());
export const loadBoardsSuccess = createAction('[Board] Load Boards Success', props<{ boards: any[] }>());
export const loadBoardsFailure = createAction('[Board] Load Boards Failure', props<{ error: any }>());
export const addBoard = createAction('[Board] Add Board', props<{ workspaceId: number, newBoard: any }>());
export const updateBoard = createAction('[Board] Update Board', props<{ workspaceId: number, boardId: number, updatedBoard: any }>());
// Add other actions for CRUD operations if needed
