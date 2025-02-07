import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ArticleFormComponent } from '../../components/article-form/article-form.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { ArticleInput } from '../../../../shared/model';
import {
  articleSelector,
  clearArticleStateAction,
  errorsArticleSelector,
  getArticleAction,
  isLoadingArticleSelector,
  isSubmittingArticleSelector,
  editArticleAction,
} from '../../../../core/store';

@Component({
  selector: 'app-edit-article',
  imports: [ArticleFormComponent, ErrorMessagesComponent, MatProgressBarModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  isSubmitting = toSignal(this.store.select(isSubmittingArticleSelector), {
    initialValue: false,
  });

  isLoading = toSignal(this.store.select(isLoadingArticleSelector), {
    initialValue: true,
  });

  article = toSignal(this.store.select(articleSelector), {
    initialValue: null,
  });

  errors = toSignal(this.store.select(errorsArticleSelector), {
    initialValue: null,
  });

  initialValue = computed(() => ({
    title: this.article()?.title ?? '',
    description: this.article()?.description ?? '',
    body: this.article()?.body ?? '',
    tagList: this.article()?.tagList ?? [],
  }));

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
    this.store.dispatch(editArticleAction({ id, articleInput }));
  }
}
