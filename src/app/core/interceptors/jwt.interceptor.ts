import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistenceService } from '../services/persistence.service';

export const jwtInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const persistenceService = inject(PersistenceService);
  const token = persistenceService.get('accessToken');

  if (token) {
    request = request.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
  }
  return next(request);
};
