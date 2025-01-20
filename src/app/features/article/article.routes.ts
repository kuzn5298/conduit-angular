import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ArticleComponent } from './pages/article/article.component';
import {
  AddCommentEffect,
  articleReducer,
  commentsReducer,
  DeleteCommentEffect,
  GetArticleEffect,
  GetCommentsEffect,
} from '../../core/store';

export const articleRoutes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    providers: [
      provideState('article', articleReducer),
      provideState('comments', commentsReducer),
      provideEffects([
        GetArticleEffect,
        GetCommentsEffect,
        AddCommentEffect,
        DeleteCommentEffect,
      ]),
    ],
  },
];
