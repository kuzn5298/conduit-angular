import { Component, input } from '@angular/core';
import { FeedType } from '../../../../shared/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles-toggle',
  imports: [RouterLink],
  templateUrl: './articles-toggle.component.html',
  styleUrl: './articles-toggle.component.css',
})
export class ArticlesToggleComponent {
  feedType = input<FeedType>();

  Feed = FeedType;
}
