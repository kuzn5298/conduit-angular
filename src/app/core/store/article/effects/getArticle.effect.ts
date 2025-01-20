import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from '../actions/getArticle.action';
import { ArticleService } from '../../../../core/services/article.service';
import { ArticleResponse } from '../../../../shared/model';

@Injectable()
export class GetArticleEffect {
  actions$ = inject(Actions);
  articleService = inject(ArticleService);
  router = inject(Router);
  store = inject(Store);

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ id }) => {
        return this.articleService.getArticle(id).pipe(
          map((response: ArticleResponse) => {
            return getArticleSuccessAction({ article: response.article });
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    )
  );

  redirectIfError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getArticleFailureAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
