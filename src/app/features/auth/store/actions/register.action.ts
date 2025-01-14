import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { RegisterRequest } from '../../model';
import { Errors } from '../../../../shared/model';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequest }>()
);

export const registerSuccessAction = createAction(ActionTypes.REGISTER_SUCCESS);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: Errors }>()
);
