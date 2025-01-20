import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentResponse, CommentsResponse } from '../../shared/model';
import { environment } from '../../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);

  getComments(articleId: string): Observable<CommentsResponse> {
    return this.http.get<CommentsResponse>(
      `${apiUrl}/articles/${articleId}/comments`
    );
  }

  addComment(articleId: string, text: string): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${apiUrl}/articles/${articleId}/comments`,
      { comment: { body: text } }
    );
  }

  deleteComment(articleId: string, commentId: number): Observable<void> {
    return this.http.delete<void>(
      `${apiUrl}/articles/${articleId}/comments/${commentId}`
    );
  }
}
