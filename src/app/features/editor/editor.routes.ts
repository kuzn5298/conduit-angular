import { Routes } from '@angular/router';
import { AddArticleComponent } from './page/add-article/add-article.component';
import { EditArticleComponent } from './page/edit-article/edit-article.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  articleReducer,
  CreateArticleEffect,
  EditArticleEffect,
  GetArticleEffect,
} from '../../core/store';

export const editorRoutes: Routes = [
  {
    path: '',
    component: AddArticleComponent,
    providers: [
      provideState('article', articleReducer),
      provideEffects([CreateArticleEffect]),
    ],
  },
  {
    path: ':id',
    component: EditArticleComponent,
    providers: [
      provideState('article', articleReducer),
      provideEffects([EditArticleEffect, GetArticleEffect]),
    ],
  },
];
