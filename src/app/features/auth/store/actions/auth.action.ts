import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearAuthStateAction = createAction(ActionTypes.CLEAR_STORE);
