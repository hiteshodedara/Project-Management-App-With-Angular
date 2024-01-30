import { createReducer, on } from '@ngrx/store';
import * as TodolistActions from './todolist.actions';
import { initialTodolistState } from './todolist.state';

export const todolistReducer = createReducer(
  initialTodolistState,
  on(TodolistActions.loadTodoListsSuccess, (state, { todolists }) => ({ ...state, todolists })),
  on(TodolistActions.addTodoList, (state, {  boardId, newTodoList }) => {
    const updatedTodolists = state.todolists.find(todolist =>  todolist.boardId === boardId)
      ? state.todolists.map(todolist =>
        todolist.boardId === boardId
          ? { ...todolist, newTodoList }
          : todolist
      )
      : [...state.todolists, { ...newTodoList }];
    return { ...state, todolists: updatedTodolists };
  }),
  on(TodolistActions.updateTodoList, (state, {  boardId, todoListId, updatedTodoList }) => ({
    ...state,
    todolists: state.todolists.map(todolist =>
       todolist.boardId === boardId && todolist.id === todoListId
        ? { ...todolist, ...updatedTodoList }
        : todolist
    ),
  })),

  on(TodolistActions.toggleArchiveStatus, (state, { boardId, todoListId }) => ({
    ...state,
    todolists: state.todolists.map(todolist =>
       todolist.boardId === boardId && todolist.id === todoListId
        ? { ...todolist, isArchive: !todolist.isArchive }
        : todolist
    ),
  })),
  on(TodolistActions.loadArchivedTodoListsSuccess, (state, { archivedTodolists }) => ({ ...state, archivedTodolists })),

  on(TodolistActions.loadUnArchivedTodoListsSuccess, (state, { unArchivedTodolists }) => ({ ...state, unArchivedTodolists })),
  // Add other reducer cases for CRUD operations if needed
);
