import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article-state.interface';

export const articleStoreSelector =
  createFeatureSelector<ArticleState>('article');

export const isSubmittingArticleSelector = createSelector(
  articleStoreSelector,
  (articleState: ArticleState) => articleState.isSubmitting
);

export const isLoadingArticleSelector = createSelector(
  articleStoreSelector,
  (articleState: ArticleState) => articleState.isLoading
);

export const errorsArticleSelector = createSelector(
  articleStoreSelector,
  (articleState: ArticleState) => articleState.errors
);

export const articleSelector = createSelector(
  articleStoreSelector,
  (articleState: ArticleState) => articleState?.article ?? null
);
