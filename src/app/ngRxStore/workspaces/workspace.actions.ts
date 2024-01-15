import { createAction, props } from '@ngrx/store';
import { Workspace } from 'src/app/models/workspace';

export const loadWorkspaces = createAction('[Workspace] Load Workspaces');
export const loadWorkspacesSuccess = createAction('[Workspace] Load Workspaces Success', props<{ workspaces: Workspace[] }>());
export const loadWorkspacesFailure = createAction('[Workspace] Load Workspaces Failure', props<{ error: any }>());
export const addWorkspace = createAction('[Workspace] Add Workspace', props<{ newWorkspace: Workspace }>());
export const updateWorkspace = createAction('[Workspace] Update Workspace', props<{ workspaceId: number, updatedWorkspace: Workspace }>());
export const deleteWorkspace = createAction('[Workspace] Delete Workspace', props<{ workspaceId: number}>());

// Add other actions for CRUD operations if needed
