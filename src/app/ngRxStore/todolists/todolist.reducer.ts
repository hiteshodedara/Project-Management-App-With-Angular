import { createReducer, on } from '@ngrx/store';
import * as TodolistActions from './todolist.actions';

export interface TodolistState {
  todolists: any[];
  // Add other state properties if needed
}

export const initialTodolistState: TodolistState = {
  todolists: [],
  // Initialize other state properties if needed
};

export const todolistReducer = createReducer(
  initialTodolistState,
  on(TodolistActions.loadTodoListsSuccess, (state, { todolists }) => ({ ...state, todolists })),
  on(TodolistActions.addTodoList, (state, { workspaceId, boardId, newTodoList }) => {
    const updatedTodolists = state.todolists.find(todolist => todolist.workspaceId === workspaceId && todolist.boardId === boardId)
      ? state.todolists.map(todolist =>
          todolist.workspaceId === workspaceId && todolist.boardId === boardId
            ? { ...todolist, newTodoList }
            : todolist
        )
      : [...state.todolists, { workspaceId, boardId, newTodoList }];
    return { ...state, todolists: updatedTodolists };
  }),
  on(TodolistActions.updateTodoList, (state, { workspaceId, boardId, todoListId, updatedTodoList }) => ({
    ...state,
    todolists: state.todolists.map(todolist =>
      todolist.workspaceId === workspaceId && todolist.boardId === boardId && todolist.id === todoListId
        ? { ...todolist, ...updatedTodoList }
        : todolist
    ),
  })),
  // Add other reducer cases for CRUD operations if needed
);
