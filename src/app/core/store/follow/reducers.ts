import { createReducer, on } from '@ngrx/store';
import { FollowState } from './follow-state.interface';
import {
  followProfileAction,
  followProfileFailureAction,
  followProfileSuccessAction,
  unfollowProfileAction,
  unfollowProfileSuccessAction,
} from './actions';
import { unfavoriteArticleFailureAction } from '../favorite';

const initialState: FollowState = {
  isSubmitting: false,
};

export const followReducer = createReducer(
  initialState,
  on(
    followProfileAction,
    unfollowProfileAction,
    (state): FollowState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    followProfileSuccessAction,
    unfollowProfileSuccessAction,
    followProfileFailureAction,
    unfavoriteArticleFailureAction,
    (state): FollowState => ({
      ...state,
      isSubmitting: false,
    })
  )
);
