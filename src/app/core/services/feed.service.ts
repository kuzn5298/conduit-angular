import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaginationOptions } from '../../shared/model/pagination.interface';
import { getHttpParams } from '../../shared/utils';
import { FeedOptionsRequest, FeedResponse, FeedType } from '../../shared/model';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private http = inject(HttpClient);

  getGlobalFeed(pagination: PaginationOptions) {
    const params = getHttpParams(pagination);
    return this.http.get<FeedResponse>(`${apiUrl}/articles`, { params });
  }

  getYourFeed(pagination: PaginationOptions) {
    const params = getHttpParams(pagination);
    return this.http.get<FeedResponse>(`${apiUrl}/articles/feed`, { params });
  }

  getTagFeed(tag: string, pagination: PaginationOptions) {
    const params = getHttpParams({ tag, ...pagination });
    return this.http.get<FeedResponse>(`${apiUrl}/articles`, { params });
  }

  getFeed(type: FeedType, { tag = '', ...pagination }: FeedOptionsRequest) {
    switch (type) {
      case FeedType.Your:
        return this.getYourFeed(pagination);
      case FeedType.Tag:
        return this.getTagFeed(tag, pagination);
      default:
        return this.getGlobalFeed(pagination);
    }
  }
}
