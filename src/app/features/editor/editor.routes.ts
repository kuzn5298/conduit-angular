import { Routes } from '@angular/router';
import { AddArticleComponent } from './page/add-article/add-article.component';
import { EditArticleComponent } from './page/edit-article/edit-article.component';
import { provideState } from '@ngrx/store';
import { editorReducer } from './store/reducers';
import { provideEffects } from '@ngrx/effects';
import { CreateArticleEffect } from './store/effects/createArticle.effect';
import { EditArticleEffect } from './store/effects/editArticle.effect';
import { GetArticleEffect } from './store/effects/getArticle.effect';

export const editorRoutes: Routes = [
  {
    path: '',
    component: AddArticleComponent,
    providers: [
      provideState('editor', editorReducer),
      provideEffects([CreateArticleEffect]),
    ],
  },
  {
    path: ':id',
    component: EditArticleComponent,
    providers: [
      provideState('editor', editorReducer),
      provideEffects([EditArticleEffect, GetArticleEffect]),
    ],
  },
];
