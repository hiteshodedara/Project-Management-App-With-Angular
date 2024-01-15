import { BoardState, boardReducer } from "./boards/board.reducer";
import { TodolistState, todolistReducer } from "./todolists/todolist.reducer";
import { TodoState, todoReducer } from "./todos/todo.reducer";
import { WorkspaceState, workspaceReducer } from "./workspaces/workspace.reducer";

export interface AppState {
  workspaces: WorkspaceState;
  boards: BoardState;
  todolists: TodolistState;
  todos: TodoState;
  // Add other feature states if needed
}

export const appReducers = {
  workspaces: workspaceReducer,
  boards: boardReducer,
  todolists: todolistReducer,
  todos: todoReducer,
  // Add other reducers for additional features
};
