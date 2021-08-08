import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { exhaustMap, share, switchMap, tap } from 'rxjs/operators';
import * as SharedActions from 'src/app/store/states/shared/shared.actions';

@Injectable()
export class SharedEffects {

  public showMessage$ = createEffect(() => this.actions$
    .pipe(
      ofType(SharedActions.showMessage),
      exhaustMap(({error, warning, success}) => {
        if (error) {
          this.toastrService.error(error);
        }
        if (warning) {
          this.toastrService.error(warning);
        }
        if (success) {
          this.toastrService.success(success);
        }
        return of(SharedActions.doNothing());
      })
    )
  );

  public showMessages$ = createEffect(() => this.actions$
    .pipe(
      ofType(SharedActions.showMessages),
      switchMap(({messages}) => {
        messages.map(item => {
          if (item.error) {
            this.toastrService.error(item.error);
          }
          if (item.warning) {
            this.toastrService.error(item.warning);
          }
          if (item.success) {
            this.toastrService.success(item.success);
          }
        });
        return of(SharedActions.doNothing());
      })
    )
  );

  public refreshData$ = createEffect(() => this.actions$
      .pipe(
        ofType(SharedActions.refreshData),
        share()
      ),
    {
      dispatch: false,
      useEffectsErrorHandler: false
    }
  );

  constructor(
    private toastrService: ToastrService,
    private actions$: Actions,
  ) {
  }
}
