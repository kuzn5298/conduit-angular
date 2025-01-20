import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Comment } from '../../../../shared/model';

export const getCommentsAction = createAction(
  ActionTypes.GET_COMMENTS,
  props<{ articleId: string }>()
);

export const getCommentsSuccessAction = createAction(
  ActionTypes.GET_COMMENTS_SUCCESS,
  props<{ comments: Comment[] }>()
);

export const getCommentsFailureAction = createAction(
  ActionTypes.GET_COMMENTS_FAILURE
);
