import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../../shared/model';
import { environment } from '../../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  followProfile(id: string): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(
      `${apiUrl}/profiles/${id}/follow`,
      {}
    );
  }

  unfollowProfile(id: string): Observable<ProfileResponse> {
    return this.http.delete<ProfileResponse>(`${apiUrl}/profiles/${id}/follow`);
  }

  getProfile(id: string): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${apiUrl}/profiles/${id}`);
  }
}
