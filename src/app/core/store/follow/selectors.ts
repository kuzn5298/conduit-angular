import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FollowState } from './follow-state.interface';

export const followStoreSelector = createFeatureSelector<FollowState>('follow');

export const isSubmittingFollowSelector = createSelector(
  followStoreSelector,
  (followState: FollowState) => followState.isSubmitting
);
