import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ArticleFormComponent } from '../../components/article-form/article-form.component';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { ArticleInput, Errors } from '../../../../shared/model';
import {
  clearArticleStateAction,
  createArticleAction,
  errorsArticleSelector,
  isSubmittingArticleSelector,
} from '../../../../core/store';

@Component({
  selector: 'app-add-article',
  imports: [ArticleFormComponent, ErrorMessagesComponent, AsyncPipe],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css',
})
export class AddArticleComponent implements OnDestroy {
  private store = inject(Store);

  isSubmitting$: Observable<boolean> = this.store.pipe(
    select(isSubmittingArticleSelector)
  );
  errors$: Observable<Errors | null> = this.store.pipe(
    select(errorsArticleSelector)
  );

  onSubmit(articleInput: ArticleInput): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticleStateAction());
  }
}
