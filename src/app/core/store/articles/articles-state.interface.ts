import { Article } from '../../../shared/model/article.interface';

export interface ArticlesState {
  isLoading: boolean;
  articles: Article[];
  count: number;
}
