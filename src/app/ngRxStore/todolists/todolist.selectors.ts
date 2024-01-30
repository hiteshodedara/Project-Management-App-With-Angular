import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodolistState } from './todolist.state';

export const selectTodolistState = createFeatureSelector<TodolistState>('todolists');

export const selectTodolists = createSelector(
  selectTodolistState,
  (state: TodolistState) => state.todolists
);

export const selectArchivedTodolists = createSelector(
  selectTodolistState,
  (state: TodolistState) => state.archivedTodolists
);

export const selectUnArchivedTodolists = createSelector(
  selectTodolistState,
  (state: TodolistState) => state.unArchivedTodolists
);


// Add other selectors for specific properties if needed
