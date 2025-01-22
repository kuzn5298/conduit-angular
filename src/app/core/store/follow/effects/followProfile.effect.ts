import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { articleSelector, setArticleStateAction } from '../../article';
import { ProfileService } from '../../../services/profile.service';
import {
  followProfileAction,
  followProfileFailureAction,
  followProfileSuccessAction,
  unfollowProfileAction,
  unfollowProfileFailureAction,
  unfollowProfileSuccessAction,
} from '../actions';

@Injectable()
export class FollowProfileEffect {
  actions$ = inject(Actions);
  profileService = inject(ProfileService);
  router = inject(Router);
  store = inject(Store);

  followProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followProfileAction),
      switchMap(({ id }) => {
        return this.profileService.followProfile(id).pipe(
          map(({ profile }) => {
            return followProfileSuccessAction({ profile });
          }),
          catchError(() => {
            return of(followProfileFailureAction());
          })
        );
      })
    )
  );

  unfollowProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfollowProfileAction),
      switchMap(({ id }) => {
        return this.profileService.unfollowProfile(id).pipe(
          map(({ profile }) => {
            return unfollowProfileSuccessAction({ profile });
          }),
          catchError(() => {
            return of(unfollowProfileFailureAction());
          })
        );
      })
    )
  );

  updateFollowedProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followProfileSuccessAction, unfollowProfileSuccessAction),
      withLatestFrom(this.store.pipe(select(articleSelector))),
      map(([action, article]) => {
        if (article && article.author.username === action?.profile?.username) {
          const newArticle = {
            ...article,
            author: {
              ...action.profile,
              image: action.profile.image || article.author.image,
            },
          };
          return setArticleStateAction({ article: newArticle });
        }
        return null;
      }),
      filter(Boolean)
    )
  );
}
