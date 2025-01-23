import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Profile } from '../../../../shared/model';

export const getProfileAction = createAction(
  ActionTypes.GET_PROFILE,
  props<{ id: string }>()
);

export const getProfileSuccessAction = createAction(
  ActionTypes.GET_PROFILE_SUCCESS,
  props<{ profile: Profile }>()
);

export const getProfileFailureAction = createAction(
  ActionTypes.GET_PROFILE_FAILURE
);
