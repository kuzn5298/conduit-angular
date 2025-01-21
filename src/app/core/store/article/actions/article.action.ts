import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article } from '../../../../shared/model';

export const setArticleStateAction = createAction(
  ActionTypes.SET_ARTICLE,
  props<{ article: Article }>()
);

export const clearArticleStateAction = createAction(ActionTypes.CLEAR_STORE);
