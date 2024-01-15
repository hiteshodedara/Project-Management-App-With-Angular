import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as WorkspaceActions from './workspace.actions';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Injectable()
export class WorkspaceEffects {
  loadWorkspaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkspaceActions.loadWorkspaces),
      switchMap(() =>
        this.workspaceService.getAllWorkspaces().pipe(
          map(workspaces => WorkspaceActions.loadWorkspacesSuccess({ workspaces })),
          catchError(error => of(WorkspaceActions.loadWorkspacesFailure({ error })))
        )
      )
    )
  );

  addWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkspaceActions.addWorkspace),
      switchMap(({ newWorkspace }) =>
        this.workspaceService.addWorkspace(newWorkspace).pipe(
          map(() => WorkspaceActions.loadWorkspaces()), // Load workspaces after adding a new one
          catchError(error => of(WorkspaceActions.loadWorkspacesFailure({ error })))
        )
      )
    )
  );

  updateWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkspaceActions.updateWorkspace),
      switchMap(({ workspaceId, updatedWorkspace }) =>
        this.workspaceService.updateWorkspace(workspaceId, updatedWorkspace).pipe(
          map(() => WorkspaceActions.loadWorkspaces()), // Load workspaces after updating
          catchError(error => of(WorkspaceActions.loadWorkspacesFailure({ error })))
        )
      )
    )
  );

  deleteWorkspace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkspaceActions.deleteWorkspace),
      switchMap(({ workspaceId }) =>
        this.workspaceService.deleteWorkspace(workspaceId).pipe(
          map(() => WorkspaceActions.loadWorkspaces()), // Load workspaces after updating
          catchError(error => of(WorkspaceActions.loadWorkspacesFailure({ error })))
        )
      )
    )
  );

  // Add other effects for CRUD operations if needed

  constructor(
    private actions$: Actions,
    private workspaceService: WorkspaceService
  ) {}
}
