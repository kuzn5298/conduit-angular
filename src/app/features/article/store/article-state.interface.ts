import { Article } from '../../../shared/model';

export interface ArticleState {
  isLoading: boolean;
  article: Article | null;
}
