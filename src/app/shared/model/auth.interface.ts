import { User } from './user.interface';

export interface AuthResponse {
  user: User;
}

export interface LoginRequest {
  user: {
    email: string;
    password: string;
  };
}

export interface RegisterRequest {
  user: {
    email: string;
    password: string;
    username: string;
  };
}
