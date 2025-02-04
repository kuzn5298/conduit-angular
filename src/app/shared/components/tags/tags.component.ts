import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';

type Variant = 'filled' | 'outlined';

@Component({
  selector: 'app-tags',
  imports: [MatChipsModule, RouterLink],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  tags = input.required<string[]>();
  variant = input<Variant>('filled');
}
