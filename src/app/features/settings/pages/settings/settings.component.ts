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

@Component({
  selector: 'app-settings',
  imports: [AsyncPipe, ErrorMessagesComponent, ReactiveFormsModule],
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
    password: ['', Validators.required],
    image: [''],
    bio: [''],
  });

  ngOnInit(): void {
    this.initializationForm();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSettingsStateAction());
  }

  initializationForm(): void {
    this.store
      .select(userSelector)
      .pipe(take(1))
      .subscribe((user) => {
        this.form.patchValue(user ?? {});
      });
  }

  submit(): void {
    if (this.form.valid) {
      const request = { user: this.form.value as UserWithPassword };
      this.store.dispatch(changeSettingsAction({ request }));
    }
  }
}
