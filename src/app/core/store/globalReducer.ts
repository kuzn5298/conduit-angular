import { articleReducer } from './article';
import { articlesReducer } from './articles';
import { userReducer } from './user';

export const globalReducers = {
  user: userReducer,
  article: articleReducer,
  articles: articlesReducer,
};
