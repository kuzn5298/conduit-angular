import { inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';
import { UserService } from '../../../services/user.service';
import { PersistenceService } from '../../../services/persistence.service';
import { User } from '../../../../shared/model';

@Injectable()
export class GetCurrentUserEffect {
  actions$ = inject(Actions);
  userService = inject(UserService);
  persistenceService = inject(PersistenceService);

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const isAccessToken = !!this.persistenceService.get('accessToken');
        if (!isAccessToken) {
          return of(getCurrentUserFailureAction());
        }
        return this.userService.getCurrentUser().pipe(
          map((user: User) => {
            return getCurrentUserSuccessAction({ user });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );
}
