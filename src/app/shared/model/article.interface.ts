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

export interface ArticleInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticleResponse {
  article: Article;
}
