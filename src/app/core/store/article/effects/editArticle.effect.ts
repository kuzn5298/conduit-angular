import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '../actions/updateArticle.action';
import { ArticleService } from '../../../../core/services/article.service';
import { ArticleResponse } from '../../../../shared/model';
import { getArticleSuccessAction } from '../actions/getArticle.action';
import { userSelector } from '../../user/selectors';

@Injectable()
export class EditArticleEffect {
  actions$ = inject(Actions);
  store = inject(Store);
  articleService = inject(ArticleService);
  router = inject(Router);

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ id, articleInput }) => {
        return this.articleService.updateArticle(id, articleInput).pipe(
          map((response: ArticleResponse) => {
            return updateArticleSuccessAction({ article: response.article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        switchMap(({ article }) => {
          return this.router.navigate(['/article', article.slug]);
        })
      ),
    { dispatch: false }
  );

  redirectIfNotAuthor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getArticleSuccessAction),
        withLatestFrom(this.store.pipe(select(userSelector))),
        tap(([{ article }, user]) => {
          if (user?.username !== article?.author?.username) {
            this.router.navigateByUrl('/');
          }
        })
      ),
    { dispatch: false }
  );
}
