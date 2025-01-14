import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-state.interface';

export const authSelector = createFeatureSelector<AuthState>('auth');

export const authSubmittingSelector = createSelector(
  authSelector,
  (state: AuthState) => state.isSubmitting
);

export const authErrorSelector = createSelector(
  authSelector,
  (state: AuthState) => state.errors
);
