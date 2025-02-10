import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { isLoggedInSelector } from '../../../../core/store/user/selectors';
import { FeedType } from '../../../../shared/model';

@Component({
  selector: 'app-feed-toggle',
  imports: [RouterLink, MatTabsModule, MatIconModule],
  templateUrl: './feed-toggle.component.html',
  styleUrl: './feed-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedToggleComponent {
  tag = input<string>();
  feedType = input<FeedType>();

  private store = inject(Store);

  isLoggedIn = toSignal(this.store.select(isLoggedInSelector));

  Feed = FeedType;
}
