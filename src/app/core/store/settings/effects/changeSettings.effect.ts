import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { catchError, mergeMap, of, withLatestFrom } from 'rxjs';
import {
  changeSettingsAction,
  changeSettingsFailureAction,
  changeSettingsSuccessAction,
} from './../actions/changeSettings.action';
import { SettingsService } from '../../../services/settings.service';
import { setUserAction, userSelector } from '../../user';
import { User } from '../../../../shared/model';

@Injectable()
export class ChangeSettingsEffect {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private settingsService = inject(SettingsService);

  changeSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeSettingsAction),
      withLatestFrom(this.store.pipe(select(userSelector))),
      mergeMap(([{ request }, oldUser]) =>
        this.settingsService.update(request).pipe(
          mergeMap(({ user }) => [
            changeSettingsSuccessAction(),
            setUserAction({ user: { ...(oldUser as User), ...user } }),
          ]),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              changeSettingsFailureAction({
                errors: errorResponse.error.errors,
              })
            );
          })
        )
      )
    )
  );
}
