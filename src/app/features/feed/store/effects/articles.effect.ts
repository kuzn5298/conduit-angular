import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FeedService } from '../../services/feed.service';
import {
  getArticlesAction,
  getArticlesFailureAction,
  getArticlesSuccessAction,
} from '../actions/articles.action';

@Injectable()
export class ArticlesEffect {
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
