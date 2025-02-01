import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { combineLatest, map } from 'rxjs';

import { userSelector } from '../../../../core/store/user/selectors';
import { CommentsComponent } from '../../components/comments/comments.component';
import {
  articleSelector,
  clearArticleStateAction,
  getArticleAction,
  isLoadingArticleSelector,
} from '../../../../core/store';
import { ArticleBannerComponent } from '../../components/article-banner/article-banner.component';
import { TagsComponent } from '../../../../shared/components/tags/tags.component';

@Component({
  selector: 'app-article',
  imports: [
    AsyncPipe,
    CommentsComponent,
    ArticleBannerComponent,
    TagsComponent,
    MatProgressBarModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  isLoading$ = this.store.pipe(select(isLoadingArticleSelector));
  article$ = this.store.pipe(select(articleSelector));
  isAuthor$ = combineLatest([
    this.article$,
    this.store.pipe(select(userSelector)),
  ]).pipe(
    map(([article, user]) => article?.author.username === user?.username)
  );

  ngOnInit(): void {
    this.fetchArticle();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticleStateAction());
  }

  fetchArticle(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(getArticleAction({ id }));
  }
}
