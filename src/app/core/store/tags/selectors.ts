import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from './tags-state.interface';

export const tagsStoreSelector = createFeatureSelector<TagsState>('tags');

export const tagsSelector = createSelector(
  tagsStoreSelector,
  (state: TagsState) => state.tags
);

export const isLoadingTagsSelector = createSelector(
  tagsStoreSelector,
  (state: TagsState) => state.isLoading
);
