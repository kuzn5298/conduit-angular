import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { getArticleAction } from '../../store/actions/getArticle.action';
import {
  articleSelector,
  isLoadingArticleSelector,
} from '../../store/selectors';
import { userSelector } from '../../../../core/store/user/selectors';
import { clearEditorStateAction } from '../../store/actions/article.action';
import { Article } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';

@Component({
  selector: 'app-article',
  imports: [AsyncPipe, RouterLink, DatePipe],
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
    this.store.dispatch(clearEditorStateAction());
  }

  fetchArticle(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(getArticleAction({ id }));
  }

  getAvatar(article: Article): string {
    const user = article.author;
    return getAvatarPlaceholder(user?.image ?? null, user?.username);
  }
}
