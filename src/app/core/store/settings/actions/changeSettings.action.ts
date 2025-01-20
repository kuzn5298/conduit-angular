import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Errors, SettingsRequest } from '../../../../shared/model';

export const changeSettingsAction = createAction(
  ActionTypes.CHANGE_SETTINGS,
  props<{ request: SettingsRequest }>()
);

export const changeSettingsSuccessAction = createAction(
  ActionTypes.CHANGE_SETTINGS_SUCCESS
);

export const changeSettingsFailureAction = createAction(
  ActionTypes.CHANGE_SETTINGS_FAILURE,
  props<{ errors: Errors }>()
);
