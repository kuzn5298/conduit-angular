import { Article } from '../../../shared/model';

export const getOptimisticArticle = (article: Article): Article => {
  const newFavorited = !article.favorited;
  const optimisticArticle = {
    ...article,
    favorited: newFavorited,
    favoritesCount: article.favoritesCount + (newFavorited ? 1 : -1),
  };
  return optimisticArticle;
};
