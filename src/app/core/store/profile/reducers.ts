import { createReducer, on } from '@ngrx/store';
import { ProfileState } from './profile-state.interface';
import {
  clearProfileStateAction,
  getProfileAction,
  getProfileFailureAction,
  getProfileSuccessAction,
  setProfileStateAction,
} from './actions';

const initialState: ProfileState = {
  isLoading: false,
  profile: null,
};

export const profileReducer = createReducer(
  initialState,
  on(
    getProfileAction,
    (state): ProfileState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getProfileSuccessAction,
    (state, { profile }): ProfileState => ({
      ...state,
      profile,
      isLoading: false,
    })
  ),
  on(
    getProfileFailureAction,
    (state): ProfileState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    setProfileStateAction,
    (state, { profile }): ProfileState => ({ ...state, profile })
  ),
  on(clearProfileStateAction, (): ProfileState => ({ ...initialState }))
);
