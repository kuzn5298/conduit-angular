import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {
  articlesSelector,
  favoriteArticleAction,
  unfavoriteArticleAction,
} from '../../../../core/store';
import { Article } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { ArticleCardComponent } from '../../../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-profile-articles',
  imports: [AsyncPipe, ArticleCardComponent],
  templateUrl: './profile-articles.component.html',
  styleUrl: './profile-articles.component.css',
})
export class ProfileArticlesComponent {
  private store = inject(Store);

  articles$ = this.store.select(articlesSelector);

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
