import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  getTagsAction,
  isLoadingTagsSelector,
  tagsSelector,
} from '../../../../core/store';
import { TagsComponent } from '../../../../shared/components/tags/tags.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-feed-tags',
  imports: [
    TagsComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    LoadingComponent,
  ],
  templateUrl: './feed-tags.component.html',
  styleUrl: './feed-tags.component.scss',
})
export class FeedTagsComponent implements OnInit {
  private store = inject(Store);

  tags = toSignal(this.store.select(tagsSelector), { initialValue: [] });
  isLoading = toSignal(this.store.select(isLoadingTagsSelector));

  ngOnInit(): void {
    this.store.dispatch(getTagsAction());
  }
}
