import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { FeedType } from '../../../../shared/model';
import { isLoggedInSelector } from '../../../../core/store';

@Component({
  selector: 'app-articles-toggle',
  imports: [RouterLink, MatTabsModule, MatIconModule],
  templateUrl: './articles-toggle.component.html',
  styleUrl: './articles-toggle.component.scss',
})
export class ArticlesToggleComponent {
  feedType = input<FeedType>();
  private store = inject(Store);

  isLoggedIn = toSignal(this.store.select(isLoggedInSelector));

  Feed = FeedType;
}
