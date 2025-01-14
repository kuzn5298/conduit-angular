import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PersistenceService } from '../../../../core/services/persistence.service';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';
import { setUserAction } from '../../../../core/store/user/actions/user.action';

@Injectable()
export class LoginEffect {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);
  private persistenceService = inject(PersistenceService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      mergeMap(({ request }) =>
        this.authService.login(request).pipe(
          tap((user) => {
            this.persistenceService.set('accessToken', user.token);
          }),
          mergeMap((user) => [loginSuccessAction(), setUserAction({ user })]),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        )
      )
    )
  );

  redirectAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
