import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import {
  isLoggedInSelector,
  userSelector,
} from '../../../core/store/user/selectors';
import { getAvatarPlaceholder } from '../../utils';
import { logoutAction } from '../../../core/store';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private store = inject(Store);

  isLoggedIn$ = this.store.select(isLoggedInSelector);
  user$ = this.store.select(userSelector);

  get avatar$() {
    return this.user$.pipe(
      map((user) => getAvatarPlaceholder(user?.image ?? null, user?.username))
    );
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
