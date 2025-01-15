import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { isLoggedInSelector } from '../../../../core/store/user/selectors';
import { FeedType } from '../../model/feed-type.enum';

@Component({
  selector: 'app-feed-toggle',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './feed-toggle.component.html',
  styleUrl: './feed-toggle.component.css',
})
export class FeedToggleComponent {
  tag = input<string>();
  feedType = input<FeedType>();

  private store = inject(Store);

  isLoggedIn$ = this.store.select(isLoggedInSelector);

  Feed = FeedType;
}
