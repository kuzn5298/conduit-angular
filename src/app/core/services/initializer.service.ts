import { inject, Injectable } from '@angular/core';
import { Observable, takeWhile } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from '../store/user/actions/getCurrentUser.action';
import { isLoadingUserSelector } from '../store/user/selectors';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  private store = inject(Store);

  initialize(): Observable<any> {
    const isLoading$ = this.store.select(isLoadingUserSelector);
    this.store.dispatch(getCurrentUserAction());
    return isLoading$.pipe(takeWhile((isLoading) => isLoading));
  }
}
