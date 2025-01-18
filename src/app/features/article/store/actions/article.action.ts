import { createAction } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const clearEditorStateAction = createAction(ActionTypes.CLEAR_STORE);
