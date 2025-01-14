import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { PersistenceService } from '../../../../core/services/persistence.service';
import { setUserAction } from '../../../../core/store/user/actions/user.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';

@Injectable()
export class registerEffect {
  private actions$ = inject(Actions);
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
}
