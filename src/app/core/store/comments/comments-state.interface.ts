import { Comment } from '../../../shared/model';

export interface CommentsState {
  isLoading: boolean;
  comments: Comment[] | null;
  isSubmitting: boolean;
  deletingCommentId: number | null;
}
