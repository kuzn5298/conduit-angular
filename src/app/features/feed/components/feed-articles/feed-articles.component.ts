import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  articlesSelector,
  isLoadingArticlesSelector,
} from '../../store/selectors';
import { Article } from '../../../../shared/model/article.interface';
import { getAvatarPlaceholder } from '../../../../shared/utils';

@Component({
  selector: 'app-feed-articles',
  imports: [RouterLink, DatePipe, AsyncPipe],
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
}
