import { Component, inject, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ArticleFormComponent } from '../../components/article-form/article-form.component';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { ArticleInput } from '../../../../shared/model';
import {
  clearArticleStateAction,
  createArticleAction,
  errorsArticleSelector,
  isSubmittingArticleSelector,
} from '../../../../core/store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-article',
  imports: [ArticleFormComponent, ErrorMessagesComponent],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent implements OnDestroy {
  private store = inject(Store);

  isSubmitting = toSignal(this.store.select(isSubmittingArticleSelector), {
    initialValue: false,
  });

  errors = toSignal(this.store.pipe(select(errorsArticleSelector)), {
    initialValue: null,
  });

  onSubmit(articleInput: ArticleInput): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticleStateAction());
  }
}
