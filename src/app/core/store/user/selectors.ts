import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user-state.interface';

export const authSelector = createFeatureSelector<UserState>('user');

export const isLoggedInSelector = createSelector(
  authSelector,
  (state: UserState) => !!state.isLoggedIn
);

export const userSelector = createSelector(
  authSelector,
  (state: UserState) => state.user
);
