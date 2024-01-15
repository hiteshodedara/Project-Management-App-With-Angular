import { createAction, props } from '@ngrx/store';

export const loadTodos = createAction('[Todo] Load Todos', props<{ workspaceId: number, boardId: number }>());
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: any[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: any }>());
export const addTodo = createAction('[Todo] Add Todo', props<{ workspaceId: number, boardId: number, newTodo: any }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ workspaceId: number, boardId: number, todoId: number, updatedTodo: any }>());
// Add other actions for CRUD operations if needed
