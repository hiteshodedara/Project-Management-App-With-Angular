import { Workspace } from "src/app/models/workspace";




export interface WorkspaceState {
  workspaces: Workspace[];
  // Add other state properties if needed
}

export const initialWorkspaceState: WorkspaceState = {
  workspaces: [],
  // Initialize other state properties if needed
};