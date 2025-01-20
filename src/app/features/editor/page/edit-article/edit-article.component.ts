import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ArticleFormComponent } from '../../components/article-form/article-form.component';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { ArticleInput, Errors } from '../../../../shared/model';
import {
  articleSelector,
  clearArticleStateAction,
  errorsArticleSelector,
  getArticleAction,
  isLoadingArticleSelector,
  isSubmittingArticleSelector,
  updateArticleAction,
} from '../../../../core/store';

@Component({
  selector: 'app-edit-article',
  imports: [ArticleFormComponent, AsyncPipe, ErrorMessagesComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css',
})
export class EditArticleComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(isSubmittingArticleSelector)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(isLoadingArticleSelector)
  );

  errors$: Observable<Errors | null> = this.store.pipe(
    select(errorsArticleSelector)
  );

  initialValue$ = this.store.pipe(
    select(articleSelector),
    filter(Boolean),
    map(
      (article): ArticleInput => ({
        title: article?.title ?? '',
        description: article?.description ?? '',
        body: article?.body ?? '',
        tagList: article?.tagList ?? [],
      })
    )
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

  onSubmit(articleInput: ArticleInput): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(updateArticleAction({ id, articleInput }));
  }
}
