import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article, ArticleInput, Errors } from '../../../../shared/model';

export const deleteArticleAction = createAction(
  ActionTypes.DELETE_ARTICLE,
  props<{ id: string }>()
);

export const deleteArticleSuccessAction = createAction(
  ActionTypes.DELETE_ARTICLE_SUCCESS
);

export const deleteArticleFailureAction = createAction(
  ActionTypes.DELETE_ARTICLE_FAILURE
);
