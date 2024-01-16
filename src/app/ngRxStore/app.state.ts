import { ActionReducerMap } from '@ngrx/store';
import { BoardState, boardReducer } from './boards/board.reducer';
import { TodolistState, todolistReducer } from './todolists/todolist.reducer';
import { TodoState, todoReducer } from './todos/todo.reducer';
import { workspaceReducer } from './workspaces/workspace.reducer';
import { WorkspaceState } from './workspaces/workspace.state';

export interface AppState {
  workspaces: WorkspaceState;
  boards: BoardState;
  todolists: TodolistState;
  todos: TodoState;
  // Add other feature states if needed
}

export const appReducers: ActionReducerMap<AppState> = {
  workspaces: workspaceReducer,
  boards: boardReducer,
  todolists: todolistReducer,
  todos: todoReducer,
  // Add other reducers for additional features
};
