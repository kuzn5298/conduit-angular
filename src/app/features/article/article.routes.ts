import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ArticleComponent } from './pages/article/article.component';
import { articleReducer } from './store/reducers';
import { GetArticleEffect } from './store/effects/getArticle.effect';

export const articleRoutes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    providers: [
      provideState('article', articleReducer),
      provideEffects([GetArticleEffect]),
    ],
  },
];
