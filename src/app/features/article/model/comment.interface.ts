import { Profile } from '../../../shared/model';

export interface Comment {
  createdAt: Date;
  author: Profile;
  id: number;
  updatedAt: Date;
  body: string;
}
