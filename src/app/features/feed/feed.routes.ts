import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MainComponent } from './pages/main/main.component';
import { feedReducer } from './store/reducers';
import { TagsEffect } from './store/effects/tags.effect';
import { ArticlesEffect } from './store/effects/articles.effect';

export const homeRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    providers: [
      provideState('feed', feedReducer),
      provideEffects([TagsEffect, ArticlesEffect]),
    ],
  },
];
