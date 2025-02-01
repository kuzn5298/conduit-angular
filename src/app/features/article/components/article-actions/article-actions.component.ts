import { Component, inject, input, output } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Article, Profile } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { userSelector } from '../../../../core/store/user/selectors';
import {
  deleteArticleAction,
  favoriteArticleAction,
  followProfileAction,
  unfavoriteArticleAction,
  unfollowProfileAction,
} from '../../../../core/store';
import { ToggleButtonComponent } from '../../../../shared/components/toggle-button/toggle-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-article-actions',
  imports: [
    RouterLink,
    AsyncPipe,
    ToggleButtonComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './article-actions.component.html',
  styleUrl: './article-actions.component.scss',
})
export class ArticleActionsComponent {
  private store = inject(Store);

  article = input.required<Article>();

  isAuthor$ = this.store
    .pipe(select(userSelector))
    .pipe(map((user) => this.article().author.username === user?.username));

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
    this.store.dispatch(deleteArticleAction({ id }));
  }
}
