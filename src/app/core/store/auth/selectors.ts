import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-state.interface';

export const authStoreSelector = createFeatureSelector<AuthState>('auth');

export const isSubmittingAuthSelector = createSelector(
  authStoreSelector,
  (state: AuthState) => state.isSubmitting
);

export const authErrorsSelector = createSelector(
  authStoreSelector,
  (state: AuthState) => state.errors
);
