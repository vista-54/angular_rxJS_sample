import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { IdentityService } from '../../pages/identity-automation/pages/identity/shared/services/identity.service';
import * as AssignedAccessActions from '../states/assigned-access/assigned-access.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { AssignedAccessResponse } from '@models/assigned-access.model';

@Injectable()
export class AssignedAccessEffects {
  public getAssignedAccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(AssignedAccessActions.getItems),
      withLatestFrom(this.store$.pipe(select(state => state.identityState)), this.store$.pipe(select(state => state.assignedAccessState))),
      switchMap(([, {selectedIdentity}, {page, perPage, orderBy, orderDirection, query}]) =>
        this.identityService.getAssignedAccess({page, perPage}, selectedIdentity.id, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, items}: AssignedAccessResponse) => [
                AssignedAccessActions.setItems({items}),
                AssignedAccessActions.setTotalItemsCount({totalItemsCount}),
             ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private searchService: SearchService,
    private store$: Store<AppState>,
    private identityService: IdentityService
  ) {
  }
}
