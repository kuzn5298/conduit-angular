import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Article } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { ArticleActionsComponent } from '../article-actions/article-actions.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-banner',
  imports: [DatePipe, AvatarComponent, ArticleActionsComponent, RouterLink],
  templateUrl: './article-banner.component.html',
  styleUrl: './article-banner.component.scss',
})
export class ArticleBannerComponent {
  article = input.required<Article>();

  getAvatar(article: Article): string {
    const user = article.author;
    return getAvatarPlaceholder(user?.image ?? null, user?.username);
  }
}
