import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  first,
  firstValueFrom,
  map,
  Observable,
} from 'rxjs';
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
  isLoadingProfileSelector,
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
export class ProfileComponent implements OnDestroy {
  private router = inject(Router);
  private store = inject(Store);

  feedType = input.required<FeedType, string>({
    alias: 'feed',
    transform: (value) => (value ?? FeedType.My) as FeedType,
  });
  page = input.required<number, string>({
    transform: (value) => Number(value ?? '0'),
  });

  limit = LIMIT;

  user = toSignal(this.store.select(userSelector));
  profile = toSignal(this.store.select(profileSelector));
  isLoadingArticle = toSignal(this.store.select(isLoadingArticlesSelector));
  isLoadingProfile = computed(() => !this.profile());
  articlesCount = toSignal(this.store.select(articlesCountSelector), {
    initialValue: 0,
  });

  ngOnDestroy(): void {
    this.store.dispatch(clearArticlesStateAction());
    this.store.dispatch(clearProfileStateAction());
  }

  handlePageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
}

export const feedResolver: ResolveFn<Promise<void>> = async (
  activatedRouteSnapshot: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const id = activatedRouteSnapshot.paramMap.get('id');
  const page = Number(activatedRouteSnapshot.queryParamMap.get('page') ?? 0);
  const feedType = (activatedRouteSnapshot.queryParamMap.get('feed') ??
    FeedType.My) as FeedType;
  const user = await firstValueFrom(store.select(userSelector));
  const author = id ?? user?.username ?? '';

  const offset = page * LIMIT;

  store.dispatch(
    getArticlesAction({
      feedType,
      options: {
        limit: LIMIT,
        offset,
        author: author,
      },
    })
  );
};

export const profileResolver: ResolveFn<Observable<boolean>> = async (
  activatedRouteSnapshot: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const id = activatedRouteSnapshot.paramMap.get('id');
  const user = await firstValueFrom(store.select(userSelector));
  const profile = await firstValueFrom(store.select(profileSelector));
  const profileId = id ?? user?.username ?? '';

  if (profile?.username !== profileId) {
    store.dispatch(getProfileAction({ id: profileId }));
  }

  return combineLatest([
    store.select(isLoadingProfileSelector),
    store.select(profileSelector),
  ]).pipe(
    filter(([isLoading, profile]) => !isLoading || !!profile),
    first(),
    map(() => true)
  );
};
