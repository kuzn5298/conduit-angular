import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { FeedType, Profile } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { combineLatest, map } from 'rxjs';
import {
  userSelector,
  getProfileAction,
  isLoadingProfileSelector,
  profileSelector,
  unfollowProfileAction,
  followProfileAction,
  clearProfileStateAction,
  getArticlesAction,
  clearArticlesStateAction,
  articlesCountSelector,
} from '../../../../core/store';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ArticlesToggleComponent } from '../../components/articles-toggle/articles-toggle.component';
import { ProfileArticlesComponent } from '../../components/profile-articles/profile-articles.component';
import { ProfilePaginationComponent } from '../../components/profile-pagination/profile-pagination.component';

const LIMIT = 10;

@Component({
  selector: 'app-profile',
  imports: [
    AsyncPipe,
    RouterLink,
    ArticlesToggleComponent,
    ProfileArticlesComponent,
    ProfilePaginationComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  feedType = signal(FeedType.My);
  page = signal(1);
  limit = LIMIT;

  isLoading$ = this.store.select(isLoadingProfileSelector);
  profile$ = this.store.select(profileSelector);
  articlesCount$ = this.store.select(articlesCountSelector);

  isAuthor$ = combineLatest([
    this.profile$,
    this.store.pipe(select(userSelector)),
  ]).pipe(map(([profile, user]) => profile?.username === user?.username));

  ngOnInit(): void {
    this.fetchProfile();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearProfileStateAction());
    this.store.dispatch(clearArticlesStateAction());
  }

  getAvatar(profile: Profile | null): string {
    return getAvatarPlaceholder(profile?.image ?? null, profile?.username);
  }

  fetchProfile(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.dispatch(getProfileAction({ id }));
  }

  followProfile(profile: Profile): void {
    if (profile.following) {
      this.store.dispatch(unfollowProfileAction({ id: profile.username }));
    } else {
      this.store.dispatch(followProfileAction({ id: profile.username }));
    }
  }

  fetchFeed(): void {
    const offset = this.page() - 1;
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
        this.page.set(Number(params['page'] ?? '1'));

        this.fetchFeed();
      }
    );

    this.destroyRef.onDestroy(() => queryParamSubscription.unsubscribe());
  }
}
