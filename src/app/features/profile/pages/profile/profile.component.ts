import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime } from 'rxjs';
import { FeedType } from '../../../../shared/model';
import {
  getArticlesAction,
  clearArticlesStateAction,
  articlesCountSelector,
  clearProfileStateAction,
  getProfileAction,
  isLoadingArticlesSelector,
  profileSelector,
  userSelector,
} from '../../../../core/store';
import { ArticlesToggleComponent } from '../../components/articles-toggle/articles-toggle.component';
import { ProfileArticlesComponent } from '../../components/profile-articles/profile-articles.component';
import { ProfilePaginationComponent } from '../../components/profile-pagination/profile-pagination.component';
import { ProfileUserComponent } from '../../components/profile-user/profile-user.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

const LIMIT = 10;

@Component({
  selector: 'app-profile',
  imports: [
    ArticlesToggleComponent,
    ProfileArticlesComponent,
    ProfilePaginationComponent,
    ProfileUserComponent,
    LoadingComponent,
    MatProgressBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  feedType = signal(FeedType.My);
  page = signal(0);
  limit = LIMIT;

  user = toSignal(this.store.select(userSelector));
  profile = toSignal(this.store.select(profileSelector));
  isLoadingArticle = toSignal(this.store.select(isLoadingArticlesSelector));
  isLoadingProfile = computed(() => !this.profile());
  articlesCount = toSignal(this.store.select(articlesCountSelector), {
    initialValue: 0,
  });

  ngOnInit(): void {
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearArticlesStateAction());
    this.store.dispatch(clearProfileStateAction());
  }

  get profileId(): string {
    return (
      this.route.snapshot.paramMap.get('id') ?? this.user()?.username ?? ''
    );
  }

  fetchProfile(): void {
    this.store.dispatch(getProfileAction({ id: this.profileId }));
  }

  fetchFeed(): void {
    const offset = this.page() * this.limit;

    this.store.dispatch(
      getArticlesAction({
        feedType: this.feedType(),
        options: { limit: this.limit, offset, author: this.profileId },
      })
    );
  }

  initializeListeners(): void {
    let prevPath: string = '';
    const routeSubscription = combineLatest([
      this.route.queryParams,
      this.route.url,
    ])
      .pipe(debounceTime(1))
      .subscribe(([params, url]) => {
        this.feedType.set(params['feed'] ?? FeedType.My);
        this.page.set(Number(params['page'] ?? '0'));
        this.fetchFeed();

        if (prevPath !== url[0]?.path) {
          prevPath = url[0]?.path;
          this.fetchProfile();
        }
      });

    this.destroyRef.onDestroy(() => {
      routeSubscription.unsubscribe();
    });
  }

  handlePageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}
