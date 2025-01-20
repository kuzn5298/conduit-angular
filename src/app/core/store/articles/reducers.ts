import { createReducer, on } from '@ngrx/store';
import { ArticlesState } from './articles-state.interface';
import { clearArticlesStateAction } from './actions/articles.action';
import {
  getArticlesAction,
  getArticlesFailureAction,
  getArticlesSuccessAction,
} from './actions/getArticles.action';

const initialState: ArticlesState = {
  isLoading: false,
  articles: [],
  count: 0,
};

export const articlesReducer = createReducer(
  initialState,
  on(
    getArticlesAction,
    (state): ArticlesState => ({
      ...state,
      articles: [],
      isLoading: true,
    })
  ),
  on(
    getArticlesSuccessAction,
    (state, { articles, count }): ArticlesState => ({
      ...state,
      isLoading: false,
      articles,
      count,
    })
  ),
  on(
    getArticlesFailureAction,
    (state): ArticlesState => ({
      ...state,
      isLoading: false,
      articles: [],
    })
  ),

  on(clearArticlesStateAction, (): ArticlesState => ({ ...initialState }))
);
