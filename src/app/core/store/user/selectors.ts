import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user-state.interface';

export const userStoreSelector = createFeatureSelector<UserState>('user');

export const isLoggedInSelector = createSelector(
  userStoreSelector,
  (state: UserState) => state.isLoggedIn
);

export const userSelector = createSelector(
  userStoreSelector,
  (state: UserState) => state.user
);

export const isLoadingUserSelector = createSelector(
  userStoreSelector,
  (state: UserState) => state.isLoading
);
