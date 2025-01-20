import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from './articles-state.interface';

export const articlesStoreSelector =
  createFeatureSelector<ArticlesState>('articles');

export const articlesSelector = createSelector(
  articlesStoreSelector,
  (state: ArticlesState) => state.articles
);

export const articlesCountSelector = createSelector(
  articlesStoreSelector,
  (state: ArticlesState) => state.count
);

export const isLoadingArticlesSelector = createSelector(
  articlesStoreSelector,
  (state: ArticlesState) => state.isLoading
);
