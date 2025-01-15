import { Article } from '../../../shared/model/article.interface';

export interface FeedResponse {
  articles: Article[];
  articlesCount: number;
}
