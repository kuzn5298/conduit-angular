import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { userSelector } from '../../../../core/store/user/selectors';
import { Article, Profile } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { CommentsComponent } from '../../components/comments/comments.component';
import { ArticleActionsComponent } from '../../components/article-actions/article-actions.component';
import {
  articleSelector,
  clearArticleStateAction,
  favoriteArticleAction,
  followProfileAction,
  getArticleAction,
  isLoadingArticleSelector,
  unfavoriteArticleAction,
  unfavoriteArticleSuccessAction,
  unfollowProfileAction,
} from '../../../../core/store';

@Component({
  selector: 'app-article',
  imports: [
    AsyncPipe,
    RouterLink,
    DatePipe,
    CommentsComponent,
    ArticleActionsComponent,
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

  followProfile(profile: Profile): void {
    if (profile.following) {
      this.store.dispatch(unfollowProfileAction({ id: profile.username }));
    } else {
      this.store.dispatch(followProfileAction({ id: profile.username }));
    }
  }
}
