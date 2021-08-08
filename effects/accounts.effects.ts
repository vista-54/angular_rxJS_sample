import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IntegrationAccountsAction from '../states/integration-accounts/integration-accounts.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { AppState } from '../app.state';
import { IntegrationService } from '../../pages/identity-automation/pages/integration/services/integration.service';
import { IntegrationAccountApiResponse } from '@models/accounts.model';

@Injectable()
export class AccountsEffects {


  constructor(private store$: Store<AppState>,
              private actions$: Actions,
              private integrationService: IntegrationService) {
  }

  public getAccounts$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationAccountsAction.getIntegrationsAccounts),
      withLatestFrom(
        this.store$.pipe(select(state => state.integrationAccountsState)),
        this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {perPage, page, orderBy, orderDirection, query}, {selectedIntegrationId}]) =>
        this.integrationService.getAccounts(selectedIntegrationId, {page, perPage}, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, integrationData, allIdentitiesAndWorkgroups}: IntegrationAccountApiResponse) => [
                IntegrationAccountsAction.setItems({items: integrationData.data.accounts}),
                IntegrationAccountsAction.setTargets({targets: integrationData.data.targets}),
                IntegrationAccountsAction.setAccountEntitlements({accountEntitlements: integrationData.data.accountsEntitlements}),
                IntegrationAccountsAction.setAdditionalPropertyObjects({additionalPropertyObjects: integrationData.data.additionalPropertyObjects}),
                IntegrationAccountsAction.setTotalItemsCount({totalItemsCount}),
                IntegrationAccountsAction.setAllIdentitiesAndWorkgroups({allIdentitiesAndWorkgroups})
              ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );
}
