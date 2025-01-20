import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { PersistenceService } from '../../../services/persistence.service';
import { setUserAction } from '../../user/actions/auth.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class registerEffect {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);
  private persistenceService = inject(PersistenceService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      mergeMap(({ request }) =>
        this.authService.register(request).pipe(
          tap((user) => {
            this.persistenceService.set('accessToken', user.token);
          }),
          mergeMap((user) => [
            registerSuccessAction(),
            setUserAction({ user }),
          ]),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        )
      )
    )
  );

  redirectAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
