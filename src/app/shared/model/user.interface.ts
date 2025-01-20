export interface ShortUser {
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export interface User extends ShortUser {
  id: number;
  token: string;
}

export interface UserWithPassword extends ShortUser {
  password: string;
}
