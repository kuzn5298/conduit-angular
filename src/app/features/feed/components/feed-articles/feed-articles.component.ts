import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { articlesSelector } from '../../../../core/store';
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
}
