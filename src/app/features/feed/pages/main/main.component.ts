import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { FeedToggleComponent } from '../../components/feed-toggle/feed-toggle.component';
import { FeedTagsComponent } from '../../components/feed-tags/feed-tags.component';
import { FeedArticlesComponent } from '../../components/feed-articles/feed-articles.component';
import { FeedPaginationComponent } from '../../components/feed-pagination/feed-pagination.component';
import {
  articlesCountSelector,
  clearArticlesStateAction,
  getArticlesAction,
  isLoadingArticlesSelector,
} from '../../../../core/store';
import { FeedType } from '../../../../shared/model';
import { FeedBannerComponent } from '../../components/feed-banner/feed-banner.component';

const LIMIT = 10;

@Component({
  selector: 'app-main',
  imports: [
    FeedToggleComponent,
    FeedTagsComponent,
    FeedArticlesComponent,
    FeedPaginationComponent,
    AsyncPipe,
    MatProgressBarModule,
    FeedBannerComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  articlesCount$ = this.store.select(articlesCountSelector);
  isLoading$ = this.store.select(isLoadingArticlesSelector);

  limit = LIMIT;

  page = signal(0);
  tag = signal<string>('');
  feedType = signal(FeedType.Global);

  ngOnInit(): void {
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticlesStateAction());
  }

  fetchFeed(): void {
    const offset = this.page();

    this.store.dispatch(
      getArticlesAction({
        feedType: this.feedType(),
        options: { limit: this.limit, offset, tag: this.tag() },
      })
    );
  }

  initializeListeners(): void {
    const queryParamSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.feedType.set(params['feed'] ?? FeedType.Global);
        this.page.set(Number(params['page'] ?? '0'));
        this.tag.set(params['tag'] ?? '');

        this.fetchFeed();
      }
    );

    this.destroyRef.onDestroy(() => queryParamSubscription.unsubscribe());
  }

  handlePageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
