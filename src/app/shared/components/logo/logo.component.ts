import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

type Size = 'small' | 'medium' | 'large';
type Role = 'link' | 'none';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  host: {
    '[class.small]': 'size() === "small"',
    '[class.medium]': 'size() === "medium"',
    '[class.large]': 'size() === "large"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  size = input<Size>('medium');
  role = input<Role>('none');

  @HostBinding('attr.role') get attrRole() {
    return this.role();
  }

  @HostBinding('attr.tabindex') get tabindex() {
    return this.role() === 'link' ? '0' : '-1';
  }
}
