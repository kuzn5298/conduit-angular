import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';
import {
  favoriteArticleAction,
  isLoggedInSelector,
  unfavoriteArticleAction,
} from '../../../core/store';
import { Article } from '../../model';
import { AvatarComponent } from '../avatar/avatar.component';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-article-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe,
    AvatarComponent,
    MatIconModule,
    ToggleButtonComponent,
    RouterLink,
    TagsComponent,
    AsyncPipe,
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
})
export class ArticleCardComponent {
  private store = inject(Store);

  article = input.required<Article>();

  isLoggedIn$ = this.store.select(isLoggedInSelector);

  favoriteArticle(article: Article): void {
    if (article.favorited) {
      this.store.dispatch(unfavoriteArticleAction({ id: article.slug }));
    } else {
      this.store.dispatch(favoriteArticleAction({ id: article.slug }));
    }
  }
}
