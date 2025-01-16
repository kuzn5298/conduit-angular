import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { ArticleFormComponent } from '../../components/article-form/article-form.component';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import {
  articleEditorSelector,
  errorsEditorSelector,
  isLoadingEditorSelector,
  isSubmittingEditorSelector,
} from '../../store/selectors';
import { ArticleInput, Errors } from '../../../../shared/model';
import { getArticleAction } from '../../store/actions/getArticle.action';
import { updateArticleAction } from '../../store/actions/updateArticle.action';
import { clearEditorStateAction } from '../../store/actions/editor.action';

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
    select(isSubmittingEditorSelector)
  );

  isLoading$: Observable<boolean> = this.store.pipe(
    select(isLoadingEditorSelector)
  );

  errors$: Observable<Errors | null> = this.store.pipe(
    select(errorsEditorSelector)
  );

  initialValue$ = this.store.pipe(
    select(articleEditorSelector),
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
    this.store.dispatch(clearEditorStateAction());
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
