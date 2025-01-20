import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState } from './comments-state.interface';

export const commentsStoreSelector =
  createFeatureSelector<CommentsState>('comments');

export const isLoadingCommentsSelector = createSelector(
  commentsStoreSelector,
  (commentsState: CommentsState) => commentsState.isLoading
);

export const commentsSelector = createSelector(
  commentsStoreSelector,
  (commentsState: CommentsState) => commentsState.comments
);
