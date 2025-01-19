import { Article } from '../../../shared/model';
import { Comment } from '../model/comment.interface';

export interface ArticleState {
  article: {
    isLoading: boolean;
    data: Article | null;
  };
  comments: {
    isLoading: boolean;
    data: Comment[] | null;
    isSubmitting: boolean;
  };
}
