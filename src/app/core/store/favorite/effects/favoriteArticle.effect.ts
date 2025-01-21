import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  switchMap,
  tap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import {
  favoriteArticleAction,
  favoriteArticleFailureAction,
  favoriteArticleSuccessAction,
  unfavoriteArticleAction,
  unfavoriteArticleFailureAction,
  unfavoriteArticleSuccessAction,
} from '../actions';
import { ArticleService } from '../../../services/article.service';
import { select, Store } from '@ngrx/store';
import { articleSelector, setArticleStateAction } from '../../article';
import { articlesSelector, setArticlesStateAction } from '../../articles';

@Injectable()
export class FavoriteArticleEffect {
  actions$ = inject(Actions);
  articleService = inject(ArticleService);
  router = inject(Router);
  store = inject(Store);

  favoriteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteArticleAction),
      switchMap(({ id }) => {
        return this.articleService.favoriteArticle(id).pipe(
          map(({ article }) => {
            return favoriteArticleSuccessAction({ article });
          }),
          catchError(() => {
            return of(favoriteArticleFailureAction());
          })
        );
      })
    )
  );

  unfavoriteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unfavoriteArticleAction),
      switchMap(({ id }) => {
        return this.articleService.unfavoriteArticle(id).pipe(
          map(({ article }) => {
            return unfavoriteArticleSuccessAction({ article });
          }),
          catchError(() => {
            return of(unfavoriteArticleFailureAction());
          })
        );
      })
    )
  );

  updateFavoriteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteArticleSuccessAction, unfavoriteArticleSuccessAction),
      withLatestFrom(
        this.store.pipe(select(articleSelector)),
        this.store.pipe(select(articlesSelector))
      ),
      map(([action, article, articles]) => {
        if (article && article.slug === action?.article?.slug) {
          return setArticleStateAction({ article: action.article });
        } else if (articles?.length) {
          const newArticles = articles.map((item) =>
            item.slug === action.article.slug ? action.article : item
          );
          return setArticlesStateAction({ articles: newArticles });
        }
        return null;
      }),
      filter(Boolean)
    )
  );
}
