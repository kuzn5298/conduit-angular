import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { User } from '../../../../shared/model';

export const setUserAction = createAction(
  ActionTypes.SET_USER,
  props<{ user: User }>()
);

export const removeUserAction = createAction(ActionTypes.REMOVE_USER);
