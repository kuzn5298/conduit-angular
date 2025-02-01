import { ShortUser, UserWithPassword } from './user.interface';

export interface SettingsRequest {
  user: Partial<UserWithPassword>;
}

export interface SettingsResponse {
  user: ShortUser;
}
