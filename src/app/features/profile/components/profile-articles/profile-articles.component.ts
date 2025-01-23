import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  articlesSelector,
  favoriteArticleAction,
  isLoadingArticlesSelector,
  unfavoriteArticleAction,
} from '../../../../core/store';
import { Article } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';

@Component({
  selector: 'app-profile-articles',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './profile-articles.component.html',
  styleUrl: './profile-articles.component.css',
})
export class ProfileArticlesComponent {
  private store = inject(Store);

  articles$ = this.store.select(articlesSelector);
  isLoading$ = this.store.select(isLoadingArticlesSelector);

  getAvatar(article: Article): string {
    const user = article.author;
    return getAvatarPlaceholder(user?.image ?? null, user?.username);
  }

  favoriteArticle(article: Article): void {
    if (article.favorited) {
      this.store.dispatch(unfavoriteArticleAction({ id: article.slug }));
    } else {
      this.store.dispatch(favoriteArticleAction({ id: article.slug }));
    }
  }
}
