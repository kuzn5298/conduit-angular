import { Component, input, computed, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-feed-pagination',
  imports: [MatPaginatorModule],
  templateUrl: './feed-pagination.component.html',
  styleUrl: './feed-pagination.component.css',
})
export class FeedPaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  pageSize = input<number>(10);
  handlePage = output<number>();

  handlePageEvent(event: PageEvent): void {
    this.handlePage.emit(event.pageIndex);
  }
}
