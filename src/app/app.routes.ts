import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/feed/feed.routes').then((m) => m.homeRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [guestGuard],
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./features/article/article.routes').then((m) => m.articleRoutes),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./features/editor/editor.routes').then((m) => m.editorRoutes),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
