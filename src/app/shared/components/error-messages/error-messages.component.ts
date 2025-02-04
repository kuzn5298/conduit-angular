import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Errors } from '../../model';

@Component({
  selector: 'app-error-messages',
  imports: [],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessagesComponent {
  errors = input.required<Errors>();
  errorMessages = computed(() => Object.values(this.errors()).flat());
}
