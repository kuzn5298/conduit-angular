import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Article } from '../../../../shared/model';
import { ArticleActionsComponent } from '../article-actions/article-actions.component';
import { isLoggedInSelector } from '../../../../core/store';
import { ProfileComponent } from '../../../../shared/components/profile/profile.component';
import { ViewTransitionDirective } from '../../../../shared/directives/view-transition/view-transition.directive';

@Component({
  selector: 'app-article-banner',
  imports: [
    DatePipe,
    ArticleActionsComponent,
    ProfileComponent,
    ViewTransitionDirective,
  ],
  templateUrl: './article-banner.component.html',
  styleUrl: './article-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBannerComponent {
  private store = inject(Store);
  article = input.required<Article>();

  isLoggedIn = toSignal(this.store.select(isLoggedInSelector));
}
