import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from './favorite-state.interface';
import {
  favoriteArticleAction,
  favoriteArticleFailureAction,
  favoriteArticleSuccessAction,
  unfavoriteArticleAction,
  unfavoriteArticleFailureAction,
  unfavoriteArticleSuccessAction,
} from './actions';

const initialState: FavoriteState = {
  isSubmitting: false,
};

export const favoriteReducer = createReducer(
  initialState,
  on(
    favoriteArticleAction,
    unfavoriteArticleAction,
    (state): FavoriteState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    favoriteArticleSuccessAction,
    unfavoriteArticleSuccessAction,
    favoriteArticleFailureAction,
    unfavoriteArticleFailureAction,
    (state): FavoriteState => ({
      ...state,
      isSubmitting: false,
    })
  )
);
