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
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from '../actions/editArticle.action';
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

  editArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleAction),
      switchMap(({ id, articleInput }) => {
        return this.articleService.editArticle(id, articleInput).pipe(
          map((response: ArticleResponse) => {
            return editArticleSuccessAction({ article: response.article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editArticleSuccessAction),
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
          const isEdit = this.router.url.startsWith('/editor');
          if (user?.username !== article?.author?.username && isEdit) {
            this.router.navigateByUrl('/');
          }
        })
      ),
    { dispatch: false }
  );
}
