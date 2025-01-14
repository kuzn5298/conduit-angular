import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/model';

const { apiUrl } = environment;

interface UserResponse {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  getCurrentUser(): Observable<User> {
    return this.http
      .get<UserResponse>(`${apiUrl}/user`)
      .pipe(map((response) => response.user));
  }
}
