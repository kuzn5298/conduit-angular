import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Profile } from '../../../../shared/model';

export const followProfileAction = createAction(
  ActionTypes.FOLLOW_PROFILE,
  props<{ id: string }>()
);

export const followProfileSuccessAction = createAction(
  ActionTypes.FOLLOW_PROFILE_SUCCESS,
  props<{ profile: Profile }>()
);

export const followProfileFailureAction = createAction(
  ActionTypes.FOLLOW_PROFILE_FAILURE,
  props<{ id: string }>()
);
