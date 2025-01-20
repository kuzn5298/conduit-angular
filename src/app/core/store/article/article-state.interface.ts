import { Article, Errors } from '../../../shared/model';

export interface ArticleState {
  isSubmitting: boolean;
  isLoading: boolean;
  errors: Errors | null;
  article: Article | null;
}
