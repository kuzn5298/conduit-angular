import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authReducer, LoginEffect, RegisterEffect } from '../../core/store';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    providers: [
      provideState('auth', authReducer),
      provideEffects([LoginEffect]),
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    providers: [
      provideState('auth', authReducer),
      provideEffects([RegisterEffect]),
    ],
  },
];
