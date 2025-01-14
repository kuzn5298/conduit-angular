import { createReducer, on } from '@ngrx/store';
import { UserState } from './user-state.interface';
import { removeUserAction, setUserAction } from './actions/user.action';

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
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
  )
);
