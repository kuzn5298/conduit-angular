import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SettingsRequest, SettingsResponse } from '../../shared/model';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private http = inject(HttpClient);

  update(request: SettingsRequest): Observable<SettingsResponse> {
    return this.http.put<SettingsResponse>(`${apiUrl}/user`, request);
  }
}
