import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth-state.interface';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.action';
import { clearAuthStateAction } from './actions/auth.action';

const initialState: AuthState = {
  isSubmitting: false,
  errors: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    registerFailureAction,
    (state, { errors }): AuthState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  ),
  on(
    loginAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: true,
      errors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state): AuthState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    loginFailureAction,
    (state, { errors }): AuthState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  ),
  on(clearAuthStateAction, (): AuthState => ({ ...initialState }))
);
