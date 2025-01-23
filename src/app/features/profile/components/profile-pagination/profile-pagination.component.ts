import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-pagination',
  imports: [RouterLink],
  templateUrl: './profile-pagination.component.html',
  styleUrl: './profile-pagination.component.css',
})
export class ProfilePaginationComponent {
  page = input.required<number>();
  total = input.required<number>();
  limit = input.required<number>();

  pages = computed(() => {
    const pagesCount = Math.ceil(this.total() / this.limit());
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  });
}
