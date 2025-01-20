import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article, ArticleInput, Errors } from '../../../../shared/model';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ id: string; articleInput: ArticleInput }>()
);

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: Errors }>()
);
