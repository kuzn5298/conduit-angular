import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { toSignal } from '@angular/core/rxjs-interop';
import { userSelector, logoutAction } from '../../../core/store';
import { AvatarComponent } from '../avatar/avatar.component';
import { LogoComponent } from '../logo/logo.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

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

  user = toSignal(this.store.select(userSelector));

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
