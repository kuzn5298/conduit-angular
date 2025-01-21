import { Component, inject, input, output } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Article, Profile } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { userSelector } from '../../../../core/store/user/selectors';

@Component({
  selector: 'app-article-actions',
  imports: [RouterLink, DatePipe, AsyncPipe],
  templateUrl: './article-actions.component.html',
  styleUrl: './article-actions.component.css',
})
export class ArticleActionsComponent {
  private store = inject(Store);

  article = input.required<Article>();
  favorite = output<Article>();

  isAuthor$ = this.store
    .pipe(select(userSelector))
    .pipe(map((user) => this.article().author.username === user?.username));

  getAvatar(author: Profile): string {
    return getAvatarPlaceholder(author?.image ?? null, author?.username);
  }

  favoriteArticle(article: Article): void {
    this.favorite.emit(article);
  }
}
