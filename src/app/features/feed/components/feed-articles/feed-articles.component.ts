import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { articlesSelector } from '../../../../core/store';
import { ArticleCardComponent } from '../../../../shared/components/article-card/article-card.component';

@Component({
  selector: 'app-feed-articles',
  imports: [ArticleCardComponent],
  templateUrl: './feed-articles.component.html',
  styleUrl: './feed-articles.component.scss',
})
export class FeedArticlesComponent {
  private store = inject(Store);

  articles = toSignal(this.store.select(articlesSelector));
}
