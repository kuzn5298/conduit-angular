import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import {
  clearProfileStateAction,
  followProfileAction,
  getProfileAction,
  profileSelector,
  unfollowProfileAction,
  userSelector,
} from '../../../../core/store';
import { Profile } from '../../../../shared/model';
import { getAvatarPlaceholder } from '../../../../shared/utils';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-user',
  imports: [
    AsyncPipe,
    AvatarComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  profile$ = this.store.select(profileSelector);

  isAuthor$ = combineLatest([
    this.profile$,
    this.store.pipe(select(userSelector)),
  ]).pipe(map(([profile, user]) => profile?.username === user?.username));

  ngOnInit(): void {
    this.fetchProfile();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearProfileStateAction());
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
}
