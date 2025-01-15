import { Profile } from './profile.interface';

export interface Article {
  author: Profile;
  title: string;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  updatedAt: string;
}
