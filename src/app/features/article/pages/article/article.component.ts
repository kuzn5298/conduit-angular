import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class ArticleComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  article = toSignal(this.store.select(articleSelector));
  isLoadingArticle = toSignal(this.store.select(isLoadingArticleSelector));
  isLoading = computed(() => this.isLoadingArticle() && !this.article());

  isLoggedIn = toSignal(this.store.select(isLoggedInSelector));
  user = toSignal(this.store.select(userSelector));
  isAuthor = computed(
    () => this.article()?.author.username === this.user()?.username
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
