import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-feed-pagination',
  imports: [MatPaginatorModule],
  templateUrl: './feed-pagination.component.html',
  styleUrl: './feed-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  pageSize = input<number>(PAGE_SIZE);
  handlePage = output<number>();

  handlePageEvent(event: PageEvent): void {
    this.handlePage.emit(event.pageIndex);
  }
}
