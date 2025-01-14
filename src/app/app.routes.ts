import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.homeRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./features/article/article.routes').then((m) => m.articleRoutes),
  },
  { path: '**', redirectTo: '' },
];
