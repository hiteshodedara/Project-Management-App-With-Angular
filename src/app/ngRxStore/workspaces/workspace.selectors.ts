import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceState } from './workspace.reducer';

export const selectWorkspaceState = createFeatureSelector<WorkspaceState>('workspaces');

export const selectWorkspaces = createSelector(
  selectWorkspaceState,
  (state: WorkspaceState) => state.workspaces
);

// Add other selectors for specific properties if needed
