import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../model';
import { AvatarComponent } from '../avatar/avatar.component';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, AvatarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  profile = input.required<Profile>();
  subtitle = input<string | null>();
  orientation = input<Orientation>('vertical');
}
