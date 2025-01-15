import { PaginationOptions } from '../../../shared/model/pagination.interface';

export interface FeedOptionsRequest extends PaginationOptions {
  tag?: string;
}
