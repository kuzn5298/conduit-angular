import { Profile } from '.';

export interface Comment {
  createdAt: Date;
  author: Profile;
  id: number;
  updatedAt: Date;
  body: string;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}
