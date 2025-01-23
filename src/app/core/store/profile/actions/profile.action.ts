import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Profile } from '../../../../shared/model';

export const setProfileStateAction = createAction(
  ActionTypes.SET_PROFILE,
  props<{ profile: Profile }>()
);

export const clearProfileStateAction = createAction(ActionTypes.CLEAR_STORE);
