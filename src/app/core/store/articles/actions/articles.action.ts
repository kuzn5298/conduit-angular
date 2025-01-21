import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article } from '../../../../shared/model';

export const setArticlesStateAction = createAction(
  ActionTypes.SET_ARTICLES,
  props<{ articles: Article[] }>()
);

export const clearArticlesStateAction = createAction(ActionTypes.CLEAR_STORE);
