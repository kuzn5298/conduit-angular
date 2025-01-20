import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../shared/model';

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
