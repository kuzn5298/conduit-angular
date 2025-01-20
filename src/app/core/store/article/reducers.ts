import { createReducer, on } from '@ngrx/store';
import { ArticleState } from './article-state.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from './actions/createArticle.action';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from './actions/updateArticle.action';
import { clearArticleStateAction } from './actions';

const initialState: ArticleState = {
  isSubmitting: false,
  isLoading: false,
  errors: null,
  article: null,
};

export const articleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): ArticleState => ({
      ...state,
      errors: null,
      isSubmitting: true,
    })
  ),
  on(
    createArticleSuccessAction,
    (state): ArticleState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createArticleFailureAction,
    (state, { errors }): ArticleState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  ),
  on(
    updateArticleAction,
    (state): ArticleState => ({
      ...state,
      errors: null,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): ArticleState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, { errors }): ArticleState => ({
      ...state,
      isSubmitting: false,
      errors,
    })
  ),
  on(
    getArticleAction,
    (state): ArticleState => ({
      ...state,
      article: null,
      errors: null,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, { article }): ArticleState => ({
      ...state,
      article,
      isLoading: false,
    })
  ),
  on(
    getArticleFailureAction,
    (state): ArticleState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(clearArticleStateAction, (): ArticleState => ({ ...initialState }))
);
