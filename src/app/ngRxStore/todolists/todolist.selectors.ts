import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodolistState } from './todolist.reducer';

export const selectTodolistState = createFeatureSelector<TodolistState>('todolists');

export const selectTodolists = createSelector(
  selectTodolistState,
  (state: TodolistState) => state.todolists
);

// Add other selectors for specific properties if needed
