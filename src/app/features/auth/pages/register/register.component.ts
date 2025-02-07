import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { RegisterForm } from './register-form.interface';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import {
  authErrorsSelector,
  clearAuthStateAction,
  isSubmittingAuthSelector,
  registerAction,
} from '../../../../core/store';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ErrorMessagesComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isSubmitting = toSignal(this.store.select(isSubmittingAuthSelector), {
    initialValue: false,
  });
  errors = toSignal(this.store.select(authErrorsSelector), {
    initialValue: null,
  });

  form: FormGroup = this.fb.group<RegisterForm>({
    email: '',
    username: '',
    password: '',
  });

  ngOnDestroy(): void {
    this.store.dispatch(clearAuthStateAction());
  }

  onSubmit(): void {
    this.store.dispatch(registerAction({ request: { user: this.form.value } }));
  }
}
