import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Profile } from '../../../../shared/model';

export const unfollowProfileAction = createAction(
  ActionTypes.UNFOLLOW_PROFILE,
  props<{ id: string }>()
);

export const unfollowProfileSuccessAction = createAction(
  ActionTypes.UNFOLLOW_PROFILE_SUCCESS,
  props<{ profile: Profile }>()
);

export const unfollowProfileFailureAction = createAction(
  ActionTypes.UNFOLLOW_PROFILE_FAILURE
);
