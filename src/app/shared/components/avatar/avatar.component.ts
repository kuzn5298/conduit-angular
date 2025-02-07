import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { getAvatarPlaceholder } from '../../utils';

type Size = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.small]': 'size() === "small"',
    '[class.medium]': 'size() === "medium"',
    '[class.large]': 'size() === "large"',
  },
})
export class AvatarComponent {
  name = input.required<string>();
  image = input<string | null>(null);
  size = input<Size>('medium');

  src = computed(() => {
    return getAvatarPlaceholder(this.image(), this.name());
  });
}
