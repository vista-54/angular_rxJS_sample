import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { IdentityService } from '../../pages/identity-automation/pages/identity/shared/services/identity.service';
import * as TargetAccountsActions from '../states/target-accounts/target-accounts.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { TargetAccountResponse } from '@models/target-account.model';
import * as MenuActions from '../states/menu/menu.actions';

@Injectable()
export class TargetAccountsEffects {

  public getTargetAccounts$ = createEffect(() => this.actions$
    .pipe(
      ofType(TargetAccountsActions.getItems),
      withLatestFrom(
        this.store$.pipe(select(state => state.identityState)),
        this.store$.pipe(select(state => state.targetAccountsState))
      ),
      switchMap(([, {selectedIdentity}, {page, showAll, perPage, orderBy, orderDirection, query}]) =>
        this.identityService.getTargetAccounts({page, perPage}, selectedIdentity.id, showAll, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, accounts}: TargetAccountResponse) => [
                TargetAccountsActions.setItems({items: accounts}),
                TargetAccountsActions.setTotalItemsCount({totalItemsCount}),
                MenuActions.setIdentityTitle({selectedIdentity})
              ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );


  public getLinuxCmdFile = createEffect(() => this.actions$
    .pipe(
      ofType(TargetAccountsActions.getLinuxCMDFile),
      switchMap(({integrationId, accountId}) =>
        this.identityService.getLinuxCmdFile(integrationId, accountId)
          .pipe(
            switchMap(({totalItemsCount, accounts}: any) => [
                TargetAccountsActions.setItems({items: accounts}),
                TargetAccountsActions.setTotalItemsCount({totalItemsCount}),
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
