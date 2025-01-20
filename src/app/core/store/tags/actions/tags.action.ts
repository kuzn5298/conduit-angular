import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearTagsStateAction = createAction(ActionTypes.CLEAR_STORE);
