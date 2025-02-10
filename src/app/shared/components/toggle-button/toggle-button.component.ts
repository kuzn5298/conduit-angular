import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-button',
  imports: [MatButtonModule, NgTemplateOutlet],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  active = input<boolean>(false);
  notInteract = input<boolean>(false);
  disabled = input<boolean>(false);
  toggle = output<void>();

  onClick() {
    if (!this.disabled() && !this.notInteract()) {
      this.toggle.emit();
    }
  }
}
