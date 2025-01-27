import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Article } from '../../../../shared/model/article.interface';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import {
  articlesSelector,
  favoriteArticleAction,
  isLoadingArticlesSelector,
  unfavoriteArticleAction,
} from '../../../../core/store';
import { ArticleCardComponent } from '../../../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-feed-articles',
  imports: [AsyncPipe, ArticleCardComponent],
  templateUrl: './feed-articles.component.html',
  styleUrl: './feed-articles.component.css',
})
export class FeedArticlesComponent {
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
