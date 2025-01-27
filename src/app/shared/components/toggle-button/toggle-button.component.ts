import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-button',
  imports: [MatButtonModule, NgTemplateOutlet],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css',
})
export class ToggleButtonComponent {
  active = input<boolean>(false);
  click = output<void>();

  onClick() {
    this.click.emit();
  }
}
