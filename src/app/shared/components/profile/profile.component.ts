import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../model';
import { AvatarComponent } from '../avatar/avatar.component';
import { Store } from '@ngrx/store';
import { setProfileStateAction } from '../../../core/store';
import { ViewTransitionDirective } from '../../directives/view-transition/view-transition.directive';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-profile',
  imports: [AvatarComponent, ViewTransitionDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  profile = input.required<Profile>();
  subtitle = input<string | null>();
  orientation = input<Orientation>('vertical');

  private router = inject(Router);
  private store = inject(Store);

  clicked = signal<boolean>(false);

  selectProfile(profile: Profile) {
    this.clicked.set(true);
    this.router.navigate(['/profile', profile.username]);
    this.store.dispatch(setProfileStateAction({ profile }));
  }
}
