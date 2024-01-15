import { createReducer, on } from '@ngrx/store';
import * as WorkspaceActions from './workspace.actions';

export interface WorkspaceState {
  workspaces: any[];
  // Add other state properties if needed
}

export const initialWorkspaceState: WorkspaceState = {
  workspaces: [],
  // Initialize other state properties if needed
};

export const workspaceReducer = createReducer(
  initialWorkspaceState,
  on(WorkspaceActions.loadWorkspacesSuccess, (state, { workspaces }) => ({ ...state, workspaces })),
  on(WorkspaceActions.addWorkspace, (state, { newWorkspace }) => ({ ...state, workspaces: [...state.workspaces, newWorkspace] })),
  on(WorkspaceActions.deleteWorkspace, (state, { workspaceId }) => ({ ...state, workspaces: [...state.workspaces, workspaceId] })),
  on(WorkspaceActions.updateWorkspace, (state, { workspaceId, updatedWorkspace }) => ({
    ...state,
    workspaces: state.workspaces.map(workspace => (workspace.id === workspaceId ? updatedWorkspace : workspace)),
  })),
  // Add other reducer cases for CRUD operations if needed
);
