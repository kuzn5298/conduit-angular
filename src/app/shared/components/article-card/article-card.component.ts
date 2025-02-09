import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import {
  favoriteArticleAction,
  isLoggedInSelector,
  isSubmittingFavoriteSelector,
  setArticleStateAction,
  unfavoriteArticleAction,
} from '../../../core/store';
import { Article } from '../../model';
import { TagsComponent } from '../tags/tags.component';
import { ProfileComponent } from '../../../shared/components/profile/profile.component';
import { ViewTransitionDirective } from '../../directives/view-transition/view-transition.directive';

@Component({
  selector: 'app-article-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    MatIconModule,
    ToggleButtonComponent,
    TagsComponent,
    ProfileComponent,
    ViewTransitionDirective,
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCardComponent {
  private store = inject(Store);
  private router = inject(Router);

  article = input.required<Article>();

  isLoggedIn = toSignal(this.store.select(isLoggedInSelector), {
    initialValue: false,
  });

  isSubmittingFavorite = toSignal(
    this.store.select(isSubmittingFavoriteSelector),
    { initialValue: false }
  );

  favoriteArticle(article: Article): void {
    if (article.favorited) {
      this.store.dispatch(unfavoriteArticleAction({ id: article.slug }));
    } else {
      this.store.dispatch(favoriteArticleAction({ id: article.slug }));
    }
  }

  selectArticle(article: Article): void {
    this.store.dispatch(setArticleStateAction({ article }));
    this.router.navigate(['/article', article.slug]);
  }
}
