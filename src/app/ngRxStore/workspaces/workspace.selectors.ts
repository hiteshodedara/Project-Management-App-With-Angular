import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceState } from './workspace.state';

export const selectWorkspaceState = createFeatureSelector<WorkspaceState>('workspaces');

export const selectWorkspaces = createSelector(
  selectWorkspaceState,
  (state: WorkspaceState) => state.workspaces
);

// export

// Add other selectors for specific properties if needed
