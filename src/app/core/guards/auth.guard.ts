import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isLoggedInSelector } from '../store/user/selectors';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const isLoggedIn$ = store.select(isLoggedInSelector);

  return isLoggedIn$.pipe(
    take(1),
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
