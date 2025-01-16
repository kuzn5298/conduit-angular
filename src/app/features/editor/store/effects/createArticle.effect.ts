import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArticleService } from '../../../../core/services/article.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/createArticle.action';
import { ArticleResponse } from '../../../../shared/model';

@Injectable()
export class CreateArticleEffect {
  actions$ = inject(Actions);
  articleService = inject(ArticleService);
  router = inject(Router);

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.articleService.createArticle(articleInput).pipe(
          map((response: ArticleResponse) => {
            return createArticleSuccessAction({ article: response.article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        switchMap(({ article }) => {
          return this.router.navigate(['/article', article.slug]);
        })
      ),
    { dispatch: false }
  );
}
