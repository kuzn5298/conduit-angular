import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { Article } from '../../../../shared/model/article.interface';
import { FeedType } from '../../model/feed-type.enum';
import { FeedOptionsRequest } from '../../model/feed-options-request.interface';

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
