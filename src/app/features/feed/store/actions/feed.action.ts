import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearFeedStateAction = createAction(ActionTypes.CLEAR_STORE);
