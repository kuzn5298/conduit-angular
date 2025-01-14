import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../model';
import { User } from '../../../shared/model';

import { environment } from '../../../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  getUser(response: AuthResponse) {
    return response.user;
  }

  register(data: RegisterRequest): Observable<User> {
    return this.http
      .post<AuthResponse>(`${apiUrl}/users`, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequest): Observable<User> {
    return this.http
      .post<AuthResponse>(`${apiUrl}/users/login`, data)
      .pipe(map(this.getUser));
  }
}
