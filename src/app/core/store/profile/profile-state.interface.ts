import { Profile } from '../../../shared/model';

export interface ProfileState {
  isLoading: boolean;
  profile: Profile | null;
}
