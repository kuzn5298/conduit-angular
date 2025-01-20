import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MainComponent } from './pages/main/main.component';
import {
  articlesReducer,
  GetArticlesEffect,
  GetTagsEffect,
  tagsReducer,
} from '../../core/store';

export const homeRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    providers: [
      provideState('articles', articlesReducer),
      provideState('tags', tagsReducer),
      provideEffects([GetTagsEffect, GetArticlesEffect]),
    ],
  },
];
