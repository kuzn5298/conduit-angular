import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticleState } from './article-state.interface';

export const editorSelector = createFeatureSelector<ArticleState>('article');

export const isLoadingArticleSelector = createSelector(
  editorSelector,
  (editorState: ArticleState) => editorState.article.isLoading
);

export const articleSelector = createSelector(
  editorSelector,
  (editorState: ArticleState) => editorState.article.data
);

export const isLoadingCommentsSelector = createSelector(
  editorSelector,
  (editorState: ArticleState) => editorState.comments.isLoading
);

export const commentsSelector = createSelector(
  editorSelector,
  (editorState: ArticleState) => editorState.comments.data
);
