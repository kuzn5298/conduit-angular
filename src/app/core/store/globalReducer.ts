import { articleReducer } from './article';
import { articlesReducer } from './articles';
import { profileReducer } from './profile';
import { userReducer } from './user';

export const globalReducers = {
  user: userReducer,
  article: articleReducer,
  articles: articlesReducer,
  profile: profileReducer,
};
