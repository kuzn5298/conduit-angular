import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearArticleStateAction = createAction(ActionTypes.CLEAR_STORE);
