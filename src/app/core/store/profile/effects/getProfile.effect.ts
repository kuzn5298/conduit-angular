import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileResponse } from '../../../../shared/model';
import {
  getProfileAction,
  getProfileFailureAction,
  getProfileSuccessAction,
} from '../actions';
import { ProfileService } from '../../../services/profile.service';

@Injectable()
export class GetProfileEffect {
  actions$ = inject(Actions);
  profileService = inject(ProfileService);
  router = inject(Router);

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfileAction),
      switchMap(({ id }) => {
        return this.profileService.getProfile(id).pipe(
          map((response: ProfileResponse) => {
            return getProfileSuccessAction({ profile: response.profile });
          }),
          catchError(() => {
            return of(getProfileFailureAction());
          })
        );
      })
    )
  );

  redirectIfError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getProfileFailureAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
