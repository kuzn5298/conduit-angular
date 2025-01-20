import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  getArticlesAction,
  getArticlesFailureAction,
  getArticlesSuccessAction,
} from '../actions/getArticles.action';
import { FeedService } from '../../../services/feed.service';

@Injectable()
export class GetArticlesEffect {
  private feedService = inject(FeedService);
  private actions$ = inject(Actions);

  articles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticlesAction),
      mergeMap(({ feedType, options }) =>
        this.feedService.getFeed(feedType, options).pipe(
          map(({ articles, articlesCount }) => {
            return getArticlesSuccessAction({ articles, count: articlesCount });
          }),
          catchError(() => {
            return of(getArticlesFailureAction());
          })
        )
      )
    )
  );
}
