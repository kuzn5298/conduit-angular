import { Errors } from '../../../shared/model';

export interface SettingsState {
  isSubmitting: boolean;
  errors: Errors | null;
}
