import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { Errors } from '../../../../shared/model';
import { RegisterForm } from './register-form.interface';
import {
  authErrorSelector,
  authSubmittingSelector,
} from '../../store/selectors';
import { registerAction } from '../../store/actions/register.action';
import { ErrorMessagesComponent } from '../../../../shared/components/error-messages/error-messages.component';
import { clearAuthStateAction } from '../../store/actions/auth.action';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ErrorMessagesComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  isSubmitting$: Observable<boolean> = EMPTY;
  errors$: Observable<Errors | null> = EMPTY;

  form: FormGroup = this.fb.group<RegisterForm>({
    email: '',
    username: '',
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
    this.store.dispatch(registerAction({ request: { user: this.form.value } }));
  }
}
