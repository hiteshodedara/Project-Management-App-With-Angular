import { ActionReducerMap } from '@ngrx/store';
import {  boardReducer } from './boards/board.reducer';
import { TodolistState, todolistReducer } from './todolists/todolist.reducer';
import { TodoState, todoReducer } from './todos/todo.reducer';
import { workspaceReducer } from './workspaces/workspace.reducer';
import { WorkspaceState } from './workspaces/workspace.state';
import { BoardState } from './boards/board.state';
import { BoardidState } from './boardID/boardID.state';
import { boardidReducer } from './boardID/boardID.reducers';

export interface AppState {
  workspaces: WorkspaceState;
  boards: BoardState;
  todolists: TodolistState;
  todos: TodoState;
  boardid:BoardidState
  // Add other feature states if needed
}

export const appReducers: ActionReducerMap<AppState> = {
  workspaces: workspaceReducer,
  boards: boardReducer,
  todolists: todolistReducer,
  todos: todoReducer,
  boardid:boardidReducer
  // Add other reducers for additional features
};
