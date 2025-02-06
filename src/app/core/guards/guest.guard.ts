import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { isLoggedInSelector } from '../store/user/selectors';

export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const isLoggedIn = toSignal(store.select(isLoggedInSelector), {
    initialValue: false,
  });

  if (isLoggedIn()) {
    router.navigate(['/']);
  }

  return !isLoggedIn();
};
