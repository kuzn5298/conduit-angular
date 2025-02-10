import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { userSelector, logoutAction } from '../../../core/store';
import { AvatarComponent } from '../avatar/avatar.component';
import { LogoComponent } from '../logo/logo.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { getHeaderLinks, getHeaderMenuLinks } from './header.helper';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AvatarComponent,
    LogoComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);

  user = toSignal(this.store.select(userSelector));
  isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  links = computed(() => getHeaderLinks(!!this.user(), this.isMobile()));
  menuLinks = computed(() =>
    this.user() ? getHeaderMenuLinks(this.isMobile()) : []
  );

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
