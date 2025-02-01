import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { take } from 'rxjs';
import {
  changeSettingsAction,
  clearSettingsStateAction,
  errorsSettingsSelector,
  isSubmittingSettingsSelector,
  userSelector,
} from '../../../../core/store';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { UserWithPassword } from '../../../../shared/model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  imports: [
    AsyncPipe,
    ErrorMessagesComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isSubmitting$ = this.store.select(isSubmittingSettingsSelector);
  errors$ = this.store.select(errorsSettingsSelector);

  form = this.fb.group({
    email: [''],
    username: [''],
    oldPassword: [''],
    password: [''],
    image: [''],
    bio: [''],
  });

  ngOnInit(): void {
    this.initializationForm();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSettingsStateAction());
  }

  initializationForm(): void {}

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
