import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile-state.interface';

export const profileStoreSelector =
  createFeatureSelector<ProfileState>('profile');

export const isLoadingProfileSelector = createSelector(
  profileStoreSelector,
  (profileState: ProfileState) => profileState.isLoading
);

export const profileSelector = createSelector(
  profileStoreSelector,
  (profileState: ProfileState) => profileState?.profile ?? null
);
