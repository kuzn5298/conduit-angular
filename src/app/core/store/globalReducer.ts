import { articleReducer } from './article';
import { articlesReducer } from './articles';
import { favoriteReducer } from './favorite';
import { followReducer } from './follow';
import { profileReducer } from './profile';
import { userReducer } from './user';

export const globalReducers = {
  user: userReducer,
  article: articleReducer,
  articles: articlesReducer,
  profile: profileReducer,
  favorite: favoriteReducer,
  follow: followReducer,
};
