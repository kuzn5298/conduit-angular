import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearCommentsStateAction = createAction(ActionTypes.CLEAR_STORE);
