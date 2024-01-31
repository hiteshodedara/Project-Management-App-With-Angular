import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TodolistActions from './todolist.actions';
import { TodolistService } from 'src/app/services/todolist.service';

@Injectable()
export class TodolistEffects {
  loadTodoLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.loadTodoLists),
      switchMap(({ workspaceId, boardId }) =>
        this.todolistserivce.getAllTodoLists(workspaceId, boardId).pipe(
          map(todolists => TodolistActions.loadTodoListsSuccess({ todolists })),
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
        )
      )
    )
  );

  addTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.addTodoList),
      switchMap(({ workspaceId, boardId, newTodoList }) =>
        this.todolistserivce.addTodoList(workspaceId, boardId, newTodoList).pipe(
          map(() => TodolistActions.loadUnArchivedTodoLists({ workspaceId, boardId })),
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
        )
      )
    )
  );

  updateTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.updateTodoList),
      switchMap(({ workspaceId, boardId, todoListId, updatedTodoList }) =>
        this.todolistserivce.updateTodoList(workspaceId, boardId, todoListId, updatedTodoList).pipe(
          map(() => TodolistActions.loadUnArchivedTodoLists({ workspaceId, boardId })),
          catchError(error => of(TodolistActions.loadArchivedTodoListsFailure({ error })))
        )
      )
    )
  );

  toggleArchiveStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.toggletodolistArchiveStatus),
      switchMap(({ workspaceId, boardId, todoListId }) =>
        this.todolistserivce.toggleArchiveStatus(workspaceId, boardId, todoListId).pipe(
          map(() => TodolistActions.loadUnArchivedTodoLists({ workspaceId, boardId })), // Load todolists after toggling archive status
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
        )
      )
    )
  );

  undotoggleArchiveStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.undotoggletodolistArchiveStatus),
      switchMap(({ workspaceId, boardId, todoListId }) =>
        this.todolistserivce.toggleArchiveStatus(workspaceId, boardId, todoListId).pipe(
          map(() => TodolistActions.loadArchivedTodoLists({ workspaceId, boardId })), // Load todolists after toggling archive status
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
        )
      )
    )
  );

  loadArchivedTodoLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.loadArchivedTodoLists),
      switchMap(({ workspaceId, boardId }) =>
        this.todolistserivce.getArchivedTodoLists(workspaceId, boardId).pipe(
          map(archivedTodolists => TodolistActions.loadArchivedTodoListsSuccess({ archivedTodolists })),
          catchError(error => of(TodolistActions.loadArchivedTodoListsFailure({ error })))
        )
      )
    )
  );

  loadUnArchivedTodoLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.loadUnArchivedTodoLists),
      switchMap(({ workspaceId, boardId }) =>
        this.todolistserivce.getUnArchivedTodoLists(workspaceId, boardId).pipe(
          map(unArchivedTodolists => TodolistActions.loadUnArchivedTodoListsSuccess({ unArchivedTodolists })),
          catchError(error => of(TodolistActions.loadUnArchivedTodoListsFailure({ error })))
        )
      )
    )
  );

  // Add other effects for CRUD operations if needed

  constructor(
    private actions$: Actions,
    private todolistserivce: TodolistService
  ) { }
}
