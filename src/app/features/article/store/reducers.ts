import { createReducer, on } from '@ngrx/store';
import { clearEditorStateAction } from './actions/article.action';
import { ArticleState } from './article-state.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';
import {
  getCommentsAction,
  getCommentsFailureAction,
  getCommentsSuccessAction,
} from './actions/getComments.action';

const initialState: ArticleState = {
  article: {
    isLoading: false,
    data: null,
  },
  comments: {
    isSubmitting: false,
    isLoading: false,
    data: null,
  },
};

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleState => ({
      ...state,
      article: {
        isLoading: true,
        data: null,
      },
    })
  ),
  on(
    getArticleSuccessAction,
    (state, { article }): ArticleState => ({
      ...state,
      article: {
        isLoading: false,
        data: article,
      },
    })
  ),
  on(
    getArticleFailureAction,
    (state): ArticleState => ({
      ...state,
      article: {
        isLoading: false,
        data: null,
      },
    })
  ),
  on(
    getCommentsAction,
    (state): ArticleState => ({
      ...state,
      comments: {
        ...state.comments,
        isLoading: false,
        data: null,
      },
    })
  ),
  on(
    getCommentsSuccessAction,
    (state, { comments }): ArticleState => ({
      ...state,
      comments: {
        ...state.comments,
        isLoading: false,
        data: comments,
      },
    })
  ),
  on(
    getCommentsFailureAction,
    (state): ArticleState => ({
      ...state,
      comments: {
        ...state.comments,
        isLoading: false,
        data: null,
      },
    })
  ),
  on(clearEditorStateAction, (): ArticleState => ({ ...initialState }))
);
