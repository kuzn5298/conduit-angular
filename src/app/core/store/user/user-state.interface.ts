import { User } from '../../../shared/model';

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}
