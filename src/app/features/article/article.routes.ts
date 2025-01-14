import { Routes } from '@angular/router';
import { ArticleComponent } from './pages/article/article.component';

export const articleRoutes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
  },
];
