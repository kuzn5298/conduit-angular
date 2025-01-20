import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsResponse } from '../../shared/model';
import { environment } from '../../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);

  getComments(articleId: string): Observable<CommentsResponse> {
    return this.http.get<CommentsResponse>(
      `${apiUrl}/articles/${articleId}/comments`
    );
  }

  addComment(articleId: string, body: string): Observable<CommentsResponse> {
    return this.http.post<CommentsResponse>(
      `${apiUrl}/articles/${articleId}/comments`,
      { comment: { body } }
    );
  }
}
