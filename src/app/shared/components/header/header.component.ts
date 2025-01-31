import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  isLoggedInSelector,
  userSelector,
  logoutAction,
} from '../../../core/store';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AvatarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);

  isLoggedIn$ = this.store.select(isLoggedInSelector);
  user$ = this.store.select(userSelector);

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
