import { createAction, props } from '@ngrx/store';

export const loadTodoLists = createAction('[Todolist] Load TodoLists', props<{ workspaceId: number, boardId: number }>());
export const loadTodoListsSuccess = createAction('[Todolist] Load TodoLists Success', props<{ todolists: any[] }>());
export const loadTodoListsFailure = createAction('[Todolist] Load TodoLists Failure', props<{ error: any }>());


export const addTodoList = createAction('[Todolist] Add TodoList', props<{ workspaceId: number, boardId: number, newTodoList: any }>());
export const updateTodoList = createAction('[Todolist] Update TodoList', props<{ workspaceId: number, boardId: number, todoListId: number, updatedTodoList: any }>());
export const toggletodolistArchiveStatus = createAction('[Todolist] Toggle Archive Status', props<{ workspaceId: number, boardId: number, todoListId: number }>());
export const undotoggletodolistArchiveStatus = createAction('[Todolist] Undo Toggle Archive Status', props<{ workspaceId: number, boardId: number, todoListId: number }>());


export const loadArchivedTodoLists = createAction('[Todolist] Load Archived TodoLists', props<{ workspaceId: number, boardId: number }>());
export const loadArchivedTodoListsSuccess = createAction('[Todolist] Load Archived TodoLists Success', props<{ archivedTodolists: any[] }>());
export const loadArchivedTodoListsFailure = createAction('[Todolist] Load Archived TodoLists Failure', props<{ error: any }>());

export const loadUnArchivedTodoLists = createAction('[Todolist] Load UnArchived TodoLists', props<{ workspaceId: number, boardId: number }>());
export const loadUnArchivedTodoListsSuccess = createAction('[Todolist] Load UnArchived TodoLists Success', props<{ unArchivedTodolists: any[] }>());
export const loadUnArchivedTodoListsFailure = createAction('[Todolist] Load UnArchived TodoLists Failure', props<{ error: any }>());