import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { FeedType } from '../../../../shared/model';
import {
  isLoadingProfileSelector,
  getArticlesAction,
  clearArticlesStateAction,
  articlesCountSelector,
} from '../../../../core/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticlesToggleComponent } from '../../components/articles-toggle/articles-toggle.component';
import { ProfileArticlesComponent } from '../../components/profile-articles/profile-articles.component';
import { ProfilePaginationComponent } from '../../components/profile-pagination/profile-pagination.component';
import { ProfileUserComponent } from '../../components/profile-user/profile-user.component';

const LIMIT = 10;

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    ArticlesToggleComponent,
    ProfileArticlesComponent,
    ProfilePaginationComponent,
    ProfileUserComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  feedType = signal(FeedType.My);
  page = signal(0);
  limit = LIMIT;

  isLoading$ = this.store.select(isLoadingProfileSelector);
  articlesCount$ = this.store.select(articlesCountSelector);

  ngOnInit(): void {
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticlesStateAction());
  }

  fetchFeed(): void {
    const offset = this.page();
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.store.dispatch(
      getArticlesAction({
        feedType: this.feedType(),
        options: { limit: this.limit, offset, author: id },
      })
    );
  }

  initializeListeners(): void {
    const queryParamSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.feedType.set(params['feed'] ?? FeedType.My);
        this.page.set(Number(params['page'] ?? '0'));

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
