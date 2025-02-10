import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-feed-banner',
  imports: [LogoComponent],
  templateUrl: './feed-banner.component.html',
  styleUrl: './feed-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedBannerComponent {}
