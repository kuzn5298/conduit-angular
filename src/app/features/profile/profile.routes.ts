import { Routes } from '@angular/router';
import {
  feedResolver,
  ProfileComponent,
  profileResolver,
} from './pages/profile/profile.component';
import { provideEffects } from '@ngrx/effects';
import { GetProfileEffect } from '../../core/store/profile';
import { FollowProfileEffect } from '../../core/store';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    providers: [provideEffects([GetProfileEffect, FollowProfileEffect])],
    resolve: {
      profileLoaded: profileResolver,
      feedResolver,
    },
  },
  {
    path: ':id',
    component: ProfileComponent,
    providers: [provideEffects([GetProfileEffect, FollowProfileEffect])],
    resolve: {
      profileLoaded: profileResolver,
      feedResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];
