import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, mergeMap, of, tap } from 'rxjs';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import { AuthService } from '../../../services/auth.service';

@Injectable()
export class RegisterEffect {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      mergeMap(({ request }) =>
        this.authService.register(request).pipe(
          mergeMap((user) => [registerSuccessAction()]),
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
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
