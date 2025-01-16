import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article, ArticleInput, Errors } from '../../../../shared/model';

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ articleInput: ArticleInput }>()
);

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: Errors }>()
);
