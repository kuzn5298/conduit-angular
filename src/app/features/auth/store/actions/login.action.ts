import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { LoginRequest } from '../../model';
import { Errors } from '../../../../shared/model';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequest }>()
);

export const loginSuccessAction = createAction(ActionTypes.LOGIN_SUCCESS);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: Errors }>()
);
