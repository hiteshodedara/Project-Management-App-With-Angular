import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { TodoService } from 'src/app/services/todo.service';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(({ workspaceId, boardId }) =>
        this.todoservice.getAllTodos(workspaceId, boardId).pipe(
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      switchMap(({ workspaceId, boardId, newTodo }) =>
        this.todoservice.addTodo(workspaceId, boardId, newTodo).pipe(
          map(() => TodoActions.loadTodos({ workspaceId, boardId })), // Load todos after adding a new one
          catchError(error => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      switchMap(({ workspaceId, boardId, todoId, updatedTodo }) =>
        this.todoservice.updateTodo(workspaceId, boardId, todoId, updatedTodo).pipe(
          map(() => TodoActions.loadTodos({ workspaceId, boardId })), // Load todos after updating
          catchError(error => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  // Add other effects for CRUD operations if needed

  constructor(
    private actions$: Actions,
    private todoservice: TodoService
  ) {}
}
