import { Component, computed, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import {
  followProfileAction,
  isLoggedInSelector,
  isSubmittingFollowSelector,
  profileSelector,
  unfollowProfileAction,
  userSelector,
} from '../../../../core/store';
import { Profile } from '../../../../shared/model';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToggleButtonComponent } from '../../../../shared/components/toggle-button/toggle-button.component';
import { ViewTransitionDirective } from '../../../../shared/directives/view-transition/view-transition.directive';

@Component({
  selector: 'app-profile-user',
  imports: [
    AvatarComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    ToggleButtonComponent,
    ViewTransitionDirective,
  ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent {
  private store = inject(Store);

  profile = toSignal(this.store.select(profileSelector));
  isLoggedIn = toSignal(this.store.select(isLoggedInSelector));
  user = toSignal(this.store.pipe(select(userSelector)));
  isAuthor = computed(() => this.profile()?.username === this.user()?.username);
  isSubmittingFollow = toSignal(this.store.select(isSubmittingFollowSelector), {
    initialValue: false,
  });

  followProfile(profile: Profile): void {
    if (profile.following) {
      this.store.dispatch(unfollowProfileAction({ id: profile.username }));
    } else {
      this.store.dispatch(followProfileAction({ id: profile.username }));
    }
  }
}
