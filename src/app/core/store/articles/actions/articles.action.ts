import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearArticlesStateAction = createAction(ActionTypes.CLEAR_STORE);
