import { Article } from '../../../shared/model/article.interface';

export interface FeedState {
  tags: {
    isLoading: boolean;
    data: string[];
  };
  articles: {
    isLoading: boolean;
    data: Article[];
    count: number;
  };
}
