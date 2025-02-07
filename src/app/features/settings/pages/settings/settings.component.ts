import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  changeSettingsAction,
  clearSettingsStateAction,
  errorsSettingsSelector,
  isSubmittingSettingsSelector,
} from '../../../../core/store';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { UserWithPassword } from '../../../../shared/model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings',
  imports: [
    ErrorMessagesComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isSubmitting = toSignal(this.store.select(isSubmittingSettingsSelector), {
    initialValue: false,
  });
  errors = toSignal(this.store.select(errorsSettingsSelector), {
    initialValue: null,
  });

  form = this.fb.group({
    email: [''],
    username: [''],
    oldPassword: [''],
    password: [''],
    image: [''],
    bio: [''],
  });

  ngOnDestroy(): void {
    this.store.dispatch(clearSettingsStateAction());
  }

  submit(): void {
    if (this.form.valid) {
      const user: Partial<UserWithPassword> = Object.entries(
        this.form.value
      ).reduce(
        (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
        {}
      );

      const request = { user };
      this.store.dispatch(changeSettingsAction({ request }));
    }
  }
}
