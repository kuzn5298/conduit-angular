import { createReducer, on } from '@ngrx/store';
import { SettingsState } from './settings-state.interface';
import {
  changeSettingsAction,
  changeSettingsFailureAction,
  changeSettingsSuccessAction,
} from './actions';

const initialState: SettingsState = {
  isSubmitting: false,
  errors: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(
    changeSettingsAction,
    (state): SettingsState => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })
  ),
  on(
    changeSettingsSuccessAction,
    (state): SettingsState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    changeSettingsFailureAction,
    (state, { errors }): SettingsState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  )
);
