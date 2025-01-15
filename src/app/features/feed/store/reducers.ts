import { createReducer, on } from '@ngrx/store';
import { FeedState } from './feed-state.interface';
import {
  getTagsAction,
  getTagsFailureAction,
  getTagsSuccessAction,
} from './actions/tags.action';
import { clearFeedStateAction } from './actions/feed.action';
import {
  getArticlesAction,
  getArticlesFailureAction,
  getArticlesSuccessAction,
} from './actions/articles.action';

const initialState: FeedState = {
  tags: {
    isLoading: false,
    data: [],
  },
  articles: {
    isLoading: false,
    data: [],
    count: 0,
  },
};

export const feedReducer = createReducer(
  initialState,
  on(
    getTagsAction,
    (state): FeedState => ({
      ...state,
      tags: {
        ...state.tags,
        isLoading: true,
      },
    })
  ),
  on(
    getTagsSuccessAction,
    (state, { tags }): FeedState => ({
      ...state,
      tags: {
        isLoading: false,
        data: tags,
      },
    })
  ),
  on(
    getTagsFailureAction,
    (state): FeedState => ({
      ...state,
      tags: {
        isLoading: false,
        data: [],
      },
    })
  ),
  on(
    getArticlesAction,
    (state): FeedState => ({
      ...state,
      articles: {
        ...state.articles,
        data: [],
        isLoading: true,
      },
    })
  ),
  on(
    getArticlesSuccessAction,
    (state, { articles, count }): FeedState => ({
      ...state,
      articles: {
        ...state.articles,
        isLoading: false,
        data: articles,
        count,
      },
    })
  ),
  on(
    getArticlesFailureAction,
    (state): FeedState => ({
      ...state,
      articles: {
        ...state.articles,
        isLoading: false,
        data: [],
      },
    })
  ),

  on(clearFeedStateAction, (): FeedState => ({ ...initialState }))
);
