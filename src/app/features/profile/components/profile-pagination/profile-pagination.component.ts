import { Component, input, computed, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-pagination',
  imports: [MatPaginatorModule],
  templateUrl: './profile-pagination.component.html',
  styleUrl: './profile-pagination.component.scss',
})
export class ProfilePaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  pageSize = input<number>(10);
  handlePage = output<number>();

  handlePageEvent(event: PageEvent): void {
    this.handlePage.emit(event.pageIndex);
  }
}
