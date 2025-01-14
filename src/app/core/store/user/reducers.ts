import { createReducer, on } from '@ngrx/store';
import { UserState } from './user-state.interface';
import { removeUserAction, setUserAction } from './actions/user.action';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/getCurrentUser.action';

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(
    setUserAction,
    (state, { user }): UserState => ({
      ...state,
      user,
      isLoggedIn: true,
    })
  ),
  on(
    removeUserAction,
    (state): UserState => ({
      ...state,
      user: null,
      isLoggedIn: false,
    })
  ),
  on(
    getCurrentUserAction,
    (state): UserState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, { user }): UserState => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      user,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): UserState => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
    })
  )
);
