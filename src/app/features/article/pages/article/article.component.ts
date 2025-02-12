import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  isLoggedInSelector,
  userSelector,
} from '../../../../core/store/user/selectors';
import { CommentsComponent } from '../../components/comments/comments.component';
import {
  articleSelector,
  clearArticleStateAction,
  getArticleAction,
  isLoadingArticleSelector,
} from '../../../../core/store';
import { ArticleBannerComponent } from '../../components/article-banner/article-banner.component';
import { TagsComponent } from '../../../../shared/components/tags/tags.component';
import { MarkdownPipe } from '../../../../shared/pipes/markdown.pipe';
import { ViewTransitionDirective } from '../../../../shared/directives/view-transition/view-transition.directive';
import { combineLatest, filter, first, map } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [
    CommentsComponent,
    ArticleBannerComponent,
    TagsComponent,
    MatProgressBarModule,
    MarkdownPipe,
    ViewTransitionDirective,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnDestroy {
  private store = inject(Store);

  article = toSignal(this.store.select(articleSelector));
  isLoggedIn = toSignal(this.store.select(isLoggedInSelector));
  user = toSignal(this.store.select(userSelector));
  isAuthor = computed(
    () => this.article()?.author.username === this.user()?.username
  );

  ngOnDestroy(): void {
    this.store.dispatch(clearArticleStateAction());
  }
}

export const articleResolver: ResolveFn<boolean> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const id = activatedRouteSnapshot.paramMap.get('id') ?? '';
  store.dispatch(getArticleAction({ id }));

  return combineLatest([
    store.select(isLoadingArticleSelector),
    store.select(articleSelector),
  ]).pipe(
    filter(([isLoading, article]) => !isLoading || !!article),
    first(),
    map(() => true)
  );
};
