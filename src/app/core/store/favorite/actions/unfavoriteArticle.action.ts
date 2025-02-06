import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article } from '../../../../shared/model';

export const unfavoriteArticleAction = createAction(
  ActionTypes.UNFAVORITE_ARTICLE,
  props<{ id: string }>()
);

export const unfavoriteArticleSuccessAction = createAction(
  ActionTypes.UNFAVORITE_ARTICLE_SUCCESS,
  props<{ article: Article }>()
);

export const unfavoriteArticleFailureAction = createAction(
  ActionTypes.UNFAVORITE_ARTICLE_FAILURE,
  props<{ id: string }>()
);
