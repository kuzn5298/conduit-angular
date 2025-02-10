import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Article, Profile } from '../../../../shared/model';
import { userSelector } from '../../../../core/store/user/selectors';
import {
  deleteArticleAction,
  favoriteArticleAction,
  followProfileAction,
  isSubmittingFavoriteSelector,
  isSubmittingFollowSelector,
  unfavoriteArticleAction,
  unfollowProfileAction,
} from '../../../../core/store';
import { ToggleButtonComponent } from '../../../../shared/components/toggle-button/toggle-button.component';
@Component({
  selector: 'app-article-actions',
  imports: [RouterLink, ToggleButtonComponent, MatIconModule, MatButtonModule],
  templateUrl: './article-actions.component.html',
  styleUrl: './article-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleActionsComponent {
  private store = inject(Store);

  article = input.required<Article>();
  user = toSignal(this.store.select(userSelector));
  isSubmittingFavorite = toSignal(
    this.store.select(isSubmittingFavoriteSelector),
    { initialValue: false }
  );
  isSubmittingFollow = toSignal(this.store.select(isSubmittingFollowSelector), {
    initialValue: false,
  });

  isAuthor = computed(
    () => this.article().author.username === this.user()?.username
  );

  favoriteArticle(article: Article): void {
    if (article.favorited) {
      this.store.dispatch(unfavoriteArticleAction({ id: article.slug }));
    } else {
      this.store.dispatch(favoriteArticleAction({ id: article.slug }));
    }
  }

  followProfile(profile: Profile): void {
    if (profile.following) {
      this.store.dispatch(unfollowProfileAction({ id: profile.username }));
    } else {
      this.store.dispatch(followProfileAction({ id: profile.username }));
    }
  }

  deleteArticle(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this article?');
    if (confirmed) {
      this.store.dispatch(deleteArticleAction({ id }));
    }
  }
}
