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
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from './actions/editArticle.action';
import { clearArticleStateAction, setArticleStateAction } from './actions';

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
    editArticleAction,
    (state): ArticleState => ({
      ...state,
      errors: null,
      isSubmitting: true,
    })
  ),
  on(
    editArticleSuccessAction,
    (state): ArticleState => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    editArticleFailureAction,
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
  on(
    setArticleStateAction,
    (state, { article }): ArticleState => ({ ...state, article })
  ),
  on(clearArticleStateAction, (): ArticleState => ({ ...initialState }))
);
