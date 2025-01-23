import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { provideEffects } from '@ngrx/effects';
import { GetProfileEffect } from '../../core/store/profile';
import { FollowProfileEffect } from '../../core/store';

export const profileRoutes: Routes = [
  {
    path: ':id',
    component: ProfileComponent,
    providers: [provideEffects([GetProfileEffect, FollowProfileEffect])],
  },
];
