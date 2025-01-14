import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { Errors } from '../../../../shared/model';
import {
  authErrorSelector,
  authSubmittingSelector,
} from '../../store/selectors';
import { loginAction } from '../../store/actions/login.action';
import { LoginForm } from './login-form.interface';
import { clearAuthStateAction } from '../../store/actions/auth.action';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ErrorMessagesComponent,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isSubmitting$: Observable<boolean> = EMPTY;
  errors$: Observable<Errors | null> = EMPTY;

  form: FormGroup = this.fb.group<LoginForm>({
    email: '',
    password: '',
  });

  ngOnInit(): void {
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearAuthStateAction());
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.select(authSubmittingSelector);
    this.errors$ = this.store.select(authErrorSelector);
  }

  onSubmit(): void {
    this.store.dispatch(loginAction({ request: { user: this.form.value } }));
  }
}
