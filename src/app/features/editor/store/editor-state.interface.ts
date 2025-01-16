import { Article, Errors } from '../../../shared/model';

export interface EditorState {
  isSubmitting: boolean;
  isLoading: boolean;
  errors: Errors | null;
  article: Article | null;
}
