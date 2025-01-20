import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import {
  getTagsAction,
  isLoadingTagsSelector,
  tagsSelector,
} from '../../../../core/store';

@Component({
  selector: 'app-feed-tags',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './feed-tags.component.html',
  styleUrl: './feed-tags.component.css',
})
export class FeedTagsComponent implements OnInit {
  private store = inject(Store);

  tags$ = this.store.select(tagsSelector);
  isLoading$ = this.store.select(isLoadingTagsSelector);

  ngOnInit(): void {
    this.store.dispatch(getTagsAction());
  }
}
