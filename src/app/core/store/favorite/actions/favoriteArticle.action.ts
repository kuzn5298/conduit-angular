import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article } from '../../../../shared/model';

export const favoriteArticleAction = createAction(
  ActionTypes.FAVORITE_ARTICLE,
  props<{ id: string }>()
);

export const favoriteArticleSuccessAction = createAction(
  ActionTypes.FAVORITE_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const favoriteArticleFailureAction = createAction(
  ActionTypes.FAVORITE_ARTICLE_FAILURE
);
