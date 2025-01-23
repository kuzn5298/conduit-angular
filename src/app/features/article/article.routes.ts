import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ArticleComponent } from './pages/article/article.component';
import {
  AddCommentEffect,
  articleReducer,
  commentsReducer,
  DeleteCommentEffect,
  FavoriteArticleEffect,
  FollowProfileEffect,
  GetArticleEffect,
  GetCommentsEffect,
} from '../../core/store';
import { DeleteArticleEffect } from '../../core/store/article/effects/deleteArticle.effect';

export const articleRoutes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    providers: [
      provideState('comments', commentsReducer),
      provideEffects([
        GetArticleEffect,
        GetCommentsEffect,
        AddCommentEffect,
        DeleteCommentEffect,
        FavoriteArticleEffect,
        FollowProfileEffect,
        DeleteArticleEffect,
      ]),
    ],
  },
];
