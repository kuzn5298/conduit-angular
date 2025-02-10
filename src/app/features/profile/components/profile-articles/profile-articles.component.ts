import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  articlesSelector,
  favoriteArticleAction,
  unfavoriteArticleAction,
} from '../../../../core/store';
import { Article } from '../../../../shared/model';
import { ArticleCardComponent } from '../../../../shared/components/article-card/article-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const LIMIT = 10;

@Component({
  selector: 'app-profile-articles',
  imports: [ArticleCardComponent, MatPaginatorModule],
  templateUrl: './profile-articles.component.html',
  styleUrl: './profile-articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileArticlesComponent {
  private store = inject(Store);

  articles = toSignal(this.store.select(articlesSelector));
  limit = LIMIT;

  favoriteArticle(article: Article): void {
    if (article.favorited) {
      this.store.dispatch(unfavoriteArticleAction({ id: article.slug }));
    } else {
      this.store.dispatch(favoriteArticleAction({ id: article.slug }));
    }
  }
}
