import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from './feed-state.interface';

export const feedSelector = createFeatureSelector<FeedState>('feed');

export const tagsSelector = createSelector(
  feedSelector,
  (state: FeedState) => state.tags.data
);

export const isLoadingTagsSelector = createSelector(
  feedSelector,
  (state: FeedState) => state.tags.isLoading
);

export const articlesSelector = createSelector(
  feedSelector,
  (state: FeedState) => state.articles.data
);

export const articlesCountSelector = createSelector(
  feedSelector,
  (state: FeedState) => state.articles.count
);

export const isLoadingArticlesSelector = createSelector(
  feedSelector,
  (state: FeedState) => state.articles.isLoading
);
