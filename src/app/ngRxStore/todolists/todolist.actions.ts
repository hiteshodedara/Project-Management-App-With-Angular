import { createAction, props } from '@ngrx/store';

export const loadTodoLists = createAction('[Todolist] Load TodoLists', props<{ workspaceId: number, boardId: number }>());
export const loadTodoListsSuccess = createAction('[Todolist] Load TodoLists Success', props<{ todolists: any[] }>());
export const loadTodoListsFailure = createAction('[Todolist] Load TodoLists Failure', props<{ error: any }>());
export const addTodoList = createAction('[Todolist] Add TodoList', props<{ workspaceId: number, boardId: number, newTodoList: any }>());
export const updateTodoList = createAction('[Todolist] Update TodoList', props<{ workspaceId: number, boardId: number, todoListId: number, updatedTodoList: any }>());
// Add other actions for CRUD operations if needed
