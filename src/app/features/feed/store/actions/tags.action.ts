import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const getTagsAction = createAction(ActionTypes.GET_TAGS);

export const getTagsSuccessAction = createAction(
  ActionTypes.GET_TAGS_SUCCESS,
  props<{ tags: string[] }>()
);

export const getTagsFailureAction = createAction(ActionTypes.GET_TAGS_FAILURE);
