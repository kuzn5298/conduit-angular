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
import { profileSelector, setProfileStateAction } from '../../profile';
import { Article, Profile } from '../../../../shared/model';
import { getOptimisticProfile } from '../helpers';

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
            return of(followProfileFailureAction({ id }));
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
            return of(unfollowProfileFailureAction({ id }));
          })
        );
      })
    )
  );

  updateFollowedProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followProfileSuccessAction, unfollowProfileSuccessAction),
      withLatestFrom(
        this.store.pipe(select(articleSelector)),
        this.store.pipe(select(profileSelector))
      ),
      map(([action, article, profile]) => {
        if (article && article.author.username === action?.profile?.username) {
          const newArticle = {
            ...article,
            author: {
              ...action.profile,
              image: action.profile.image || article.author.image,
            },
          };
          return setArticleStateAction({ article: newArticle });
        } else if (profile && profile.username === action?.profile?.username) {
          const newProfile: Profile = {
            ...action.profile,
            image: action.profile.image || profile.image,
          };

          return setProfileStateAction({ profile: newProfile });
        }
        return null;
      }),
      filter(Boolean)
    )
  );

  optimisticUpdateProfileArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        followProfileAction,
        unfollowProfileAction,
        followProfileFailureAction,
        unfollowProfileFailureAction
      ),
      withLatestFrom(
        this.store.pipe(select(articleSelector)),
        this.store.pipe(select(profileSelector))
      ),
      map(([action, article, profile]) => {
        if (article && article.author.username === action?.id) {
          const newArticle = {
            ...article,
            author: getOptimisticProfile(article.author),
          };
          return setArticleStateAction({ article: newArticle });
        } else if (profile && profile.username === action?.id) {
          const newProfile: Profile = getOptimisticProfile(profile);

          return setProfileStateAction({ profile: newProfile });
        }
        return null;
      }),
      filter(Boolean)
    )
  );
}
