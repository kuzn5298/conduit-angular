import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TagsResponse } from '../model';
import { environment } from '../../../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private http = inject(HttpClient);

  getTags() {
    return this.http.get<TagsResponse>(`${apiUrl}/tags`);
  }
}
