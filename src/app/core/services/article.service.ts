import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleInput, ArticleResponse } from '../../shared/model';
import { environment } from '../../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);

  getArticle(id: string): Observable<ArticleResponse> {
    return this.http.get<ArticleResponse>(`${apiUrl}/articles/${id}`);
  }

  createArticle(articleInput: ArticleInput): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(`${apiUrl}/articles`, {
      article: articleInput,
    });
  }

  editArticle(
    slug: string,
    articleInput: ArticleInput
  ): Observable<ArticleResponse> {
    return this.http.put<ArticleResponse>(`${apiUrl}/articles/${slug}`, {
      article: articleInput,
    });
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/articles/${id}`);
  }

  favoriteArticle(id: string): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(
      `${apiUrl}/articles/${id}/favorite`,
      {}
    );
  }

  unfavoriteArticle(id: string): Observable<ArticleResponse> {
    return this.http.delete<ArticleResponse>(
      `${apiUrl}/articles/${id}/favorite`
    );
  }
}
