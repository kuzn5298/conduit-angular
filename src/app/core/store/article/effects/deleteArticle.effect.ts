import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArticleService } from '../../../services/article.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/deleteArticle.action';

@Injectable()
export class DeleteArticleEffect {
  actions$ = inject(Actions);
  store = inject(Store);
  articleService = inject(ArticleService);
  router = inject(Router);

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({ id }) => {
        return this.articleService.deleteArticle(id).pipe(
          map(() => {
            return deleteArticleSuccessAction();
          }),
          catchError(() => {
            return of(deleteArticleFailureAction());
          })
        );
      })
    )
  );

  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        switchMap(() => {
          return this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
