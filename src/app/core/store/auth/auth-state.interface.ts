import { Errors } from '../../../shared/model';

export interface AuthState {
  isSubmitting: boolean;
  errors: Errors | null;
}
