import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article, ArticleInput, Errors } from '../../../../shared/model';

export const editArticleAction = createAction(
  ActionTypes.EDIT_ARTICLE,
  props<{ id: string; articleInput: ArticleInput }>()
);

export const editArticleSuccessAction = createAction(
  ActionTypes.EDIT_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const editArticleFailureAction = createAction(
  ActionTypes.EDIT_ARTICLE_FAILURE,
  props<{ errors: Errors }>()
);
