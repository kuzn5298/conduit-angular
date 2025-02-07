import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { LoginForm } from './login-form.interface';
import {
  authErrorsSelector,
  clearAuthStateAction,
  isSubmittingAuthSelector,
  loginAction,
} from '../../../../core/store';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ErrorMessagesComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isSubmitting = toSignal(this.store.select(isSubmittingAuthSelector), {
    initialValue: false,
  });
  errors = toSignal(this.store.select(authErrorsSelector), {
    initialValue: null,
  });

  form: FormGroup = this.fb.group<LoginForm>({
    email: '',
    password: '',
  });

  ngOnDestroy(): void {
    this.store.dispatch(clearAuthStateAction());
  }

  onSubmit(): void {
    this.store.dispatch(loginAction({ request: { user: this.form.value } }));
  }
}
