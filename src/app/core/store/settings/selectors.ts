import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from './settings-state.interface';

export const settingsStoreSelector =
  createFeatureSelector<SettingsState>('settings');

export const isSubmittingSettingsSelector = createSelector(
  settingsStoreSelector,
  (state: SettingsState) => state.isSubmitting
);

export const errorsSettingsSelector = createSelector(
  settingsStoreSelector,
  (state: SettingsState) => state.errors
);
