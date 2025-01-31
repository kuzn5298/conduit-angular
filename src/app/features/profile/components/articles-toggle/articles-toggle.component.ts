import { Component, inject, input } from '@angular/core';
import { FeedType } from '../../../../shared/model';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { isLoggedInSelector } from '../../../../core/store';

@Component({
  selector: 'app-articles-toggle',
  imports: [AsyncPipe, RouterLink, MatTabsModule, MatIconModule],
  templateUrl: './articles-toggle.component.html',
  styleUrl: './articles-toggle.component.css',
})
export class ArticlesToggleComponent {
  feedType = input<FeedType>();
  private store = inject(Store);

  isLoggedIn$ = this.store.select(isLoggedInSelector);

  Feed = FeedType;
}
