import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearSettingsStateAction = createAction(ActionTypes.CLEAR_STORE);
