import { Article } from './article.interface';
import { PaginationOptions } from './pagination.interface';

export enum FeedType {
  Global = 'global',
  Your = 'your',
  Tag = 'tag',
  My = 'my',
  Favorite = 'favorite',
}

export interface FeedOptionsRequest extends PaginationOptions {
  tag?: string;
  author?: string;
}

export interface FeedResponse {
  articles: Article[];
  articlesCount: number;
}
