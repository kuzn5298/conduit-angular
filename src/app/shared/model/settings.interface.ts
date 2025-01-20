import { ShortUser, UserWithPassword } from './user.interface';

export interface SettingsRequest {
  user: UserWithPassword;
}

export interface SettingsResponse {
  user: ShortUser;
}
