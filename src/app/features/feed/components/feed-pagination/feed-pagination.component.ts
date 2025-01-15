import { Component, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-pagination',
  imports: [RouterLink],
  templateUrl: './feed-pagination.component.html',
  styleUrl: './feed-pagination.component.css',
})
export class FeedPaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  limit = input.required<number>();

  pages = computed(() => {
    const pagesCount = Math.ceil(this.total() / this.limit());
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  });
}
