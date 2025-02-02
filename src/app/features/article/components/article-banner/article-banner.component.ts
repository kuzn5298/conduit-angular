import { Component, inject, input } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Article } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { ArticleActionsComponent } from '../article-actions/article-actions.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { isLoggedInSelector } from '../../../../core/store';

@Component({
  selector: 'app-article-banner',
  imports: [
    DatePipe,
    AvatarComponent,
    ArticleActionsComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './article-banner.component.html',
  styleUrl: './article-banner.component.scss',
})
export class ArticleBannerComponent {
  private store = inject(Store);
  article = input.required<Article>();
  isLoggedIn$ = this.store.select(isLoggedInSelector);

  getAvatar(article: Article): string {
    const user = article.author;
    return getAvatarPlaceholder(user?.image ?? null, user?.username);
  }
}
