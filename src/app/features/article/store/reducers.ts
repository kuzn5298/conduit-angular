import { createReducer, on } from '@ngrx/store';
import { clearEditorStateAction } from './actions/article.action';
import { ArticleState } from './article-state.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';

const initialState: ArticleState = {
  isLoading: false,
  article: null,
};

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleState => ({
      ...state,
      article: null,
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
  on(clearEditorStateAction, (): ArticleState => ({ ...initialState }))
);
