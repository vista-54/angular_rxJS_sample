import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, share } from 'rxjs/operators';
import * as SharedActions from '@states/shared/shared.actions';
import * as AuthActions from '@states/auth/auth.actions';
import { AuthService } from 'src/app/auth/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  public logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.logout),
      exhaustMap(() => {
        this.authService.logout();
        return of(SharedActions.doNothing());
      }),
      share()
    )
  );
}
