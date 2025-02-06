import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite-state.interface';

export const favoriteStoreSelector =
  createFeatureSelector<FavoriteState>('favorite');

export const isSubmittingFavoriteSelector = createSelector(
  favoriteStoreSelector,
  (favoriteState: FavoriteState) => favoriteState.isSubmitting
);
