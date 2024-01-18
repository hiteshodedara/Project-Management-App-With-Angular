import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { BoardService } from 'src/app/services/board.service';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(({ workspaceId }) =>
        this.boardservice.getAllBoards(workspaceId).pipe(
          map(boards => BoardActions.loadBoardsSuccess({ boards })),
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      mergeMap(({ workspaceId, newBoard }) =>
        this.boardservice.addBoard(workspaceId, newBoard).pipe(
          map(() => BoardActions.loadBoards({ workspaceId })),
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      mergeMap(({ workspaceId, boardId, updatedBoard }) =>
        this.boardservice.updateBoard(workspaceId, boardId, updatedBoard).pipe(
          map(() => BoardActions.loadBoards({ workspaceId })),
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  // Add other effects for CRUD operations if needed

  constructor(
    private actions$: Actions,
    private boardservice: BoardService
  ) { }
}
