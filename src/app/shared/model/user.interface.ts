export interface User {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
  token: string;
}
