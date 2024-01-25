import { createAction, props } from '@ngrx/store';

export const setCurrentBoardId = createAction(
    '[Board] Set Current Board ID',
    props<{ boardId: number }>()
);
