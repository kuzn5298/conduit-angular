import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Comment } from '../../../../shared/model';

export const addCommentAction = createAction(
  ActionTypes.ADD_COMMENT,
  props<{ articleId: string; text: string }>()
);

export const addCommentSuccessAction = createAction(
  ActionTypes.ADD_COMMENT_SUCCESS,
  props<{ comments: Comment[] }>()
);

export const addCommentFailureAction = createAction(
  ActionTypes.ADD_COMMENT_FAILURE
);
