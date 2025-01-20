import { Article } from './article.interface';
import { PaginationOptions } from './pagination.interface';

export enum FeedType {
  Global = 'global',
  Your = 'your',
  Tag = 'tag',
}

export interface FeedOptionsRequest extends PaginationOptions {
  tag?: string;
}

export interface FeedResponse {
  articles: Article[];
  articlesCount: number;
}
