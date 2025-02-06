import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PersistenceService } from '../../../services/persistence.service';
import { removeUserAction } from '../../user/actions/auth.action';
import { logoutAction } from '../actions';

@Injectable()
export class LogoutEffect {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private persistenceService = inject(PersistenceService);

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this.persistenceService.remove('accessToken');
        const currentUrl = this.router.url;
        const currentRoutes = this.router.config;
        this.router.resetConfig(currentRoutes);
        this.router.navigateByUrl(currentUrl);
      }),
      map(() => removeUserAction())
    )
  );
}
