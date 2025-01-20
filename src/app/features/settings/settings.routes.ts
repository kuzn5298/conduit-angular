import { Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangeSettingsEffect, settingsReducer } from '../../core/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    providers: [
      provideState('settings', settingsReducer),
      provideEffects([ChangeSettingsEffect]),
    ],
  },
];
