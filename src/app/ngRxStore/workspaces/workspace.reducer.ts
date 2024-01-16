import { createReducer, on } from '@ngrx/store';
import * as WorkspaceActions from './workspace.actions';
import { initialWorkspaceState } from './workspace.state';

export const workspaceReducer = createReducer(
  initialWorkspaceState,
  on(WorkspaceActions.loadWorkspacesSuccess, (state, { workspaces }) => ({ ...state, workspaces })),
  on(WorkspaceActions.addWorkspace, (state, { newWorkspace }) => ({ ...state, workspaces: [...state.workspaces, newWorkspace] })),
  on(WorkspaceActions.deleteWorkspace, (state, { workspaceId }) => ({
    ...state,
    workspaces: state.workspaces.filter(workspace => workspace.id !== workspaceId), // Remove the specified workspace
  })),
  on(WorkspaceActions.updateWorkspace, (state, { workspaceId, updatedWorkspace }) => ({
    ...state,
    workspaces: state.workspaces.map(workspace => (workspace.id === workspaceId ? updatedWorkspace : workspace)),
  })),
  // Add other reducer cases for CRUD operations if needed
);
