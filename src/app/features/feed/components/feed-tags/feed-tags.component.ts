import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import {
  getTagsAction,
  isLoadingTagsSelector,
  tagsSelector,
} from '../../../../core/store';
import { TagsComponent } from '../../../../shared/components/tags/tags.component';

@Component({
  selector: 'app-feed-tags',
  imports: [AsyncPipe, TagsComponent, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './feed-tags.component.html',
  styleUrl: './feed-tags.component.scss',
})
export class FeedTagsComponent implements OnInit {
  private store = inject(Store);

  tags$ = this.store.select(tagsSelector);
  isLoading$ = this.store.select(isLoadingTagsSelector);

  ngOnInit(): void {
    this.store.dispatch(getTagsAction());
  }
}
