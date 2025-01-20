import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article } from '../../../../shared/model/article.interface';
import { FeedOptionsRequest, FeedType } from '../../../../shared/model';

export const getArticlesAction = createAction(
  ActionTypes.GET_ARTICLES,
  props<{ feedType: FeedType; options: FeedOptionsRequest }>()
);

export const getArticlesSuccessAction = createAction(
  ActionTypes.GET_ARTICLES_SUCCESS,
  props<{ articles: Article[]; count: number }>()
);

export const getArticlesFailureAction = createAction(
  ActionTypes.GET_ARTICLES_FAILURE
);
