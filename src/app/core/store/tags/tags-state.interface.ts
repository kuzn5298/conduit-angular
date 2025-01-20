import { Tag } from '../../../shared/model/tags.interface';

export interface TagsState {
  isLoading: boolean;
  tags: Tag[];
}
