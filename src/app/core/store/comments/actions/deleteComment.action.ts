import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Comment } from '../../../../shared/model';

export const deleteCommentAction = createAction(
  ActionTypes.DELETE_COMMENT,
  props<{ articleId: string; commentId: number }>()
);

export const deleteCommentSuccessAction = createAction(
  ActionTypes.ADD_COMMENT_SUCCESS,
  props<{ comments: Comment[] }>()
);

export const deleteCommentFailureAction = createAction(
  ActionTypes.ADD_COMMENT_FAILURE
);
