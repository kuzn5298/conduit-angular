import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[class.full-width]': 'fullWidth',
  },
})
export class LoadingComponent {
  size = input<string>('2rem');
  fullWidth = input<boolean>(false);
}
