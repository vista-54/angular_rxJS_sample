import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountAttributesAction from '../states/account-attributes/account-attributes.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { IntegrationService } from '../../pages/identity-automation/pages/integration/services/integration.service';
import { AppState } from '../app.state';
import { GetAdditionalPropertyObjectsApiResponse } from '@models/account-attributes.model';
import * as MenuActions from '../states/menu/menu.actions';

@Injectable()
export class AccountAttributesEffect {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private searchService: SearchService,
    private integrationService: IntegrationService,
    private store$: Store<AppState>,
  ) {
  }


  public getAccountAttributes$ = createEffect(() => this.actions$
    .pipe(
      ofType(AccountAttributesAction.getItems),
      withLatestFrom(
        this.store$.pipe(select(state => state.integrationState)),
        this.store$.pipe(select(state => state.accountAttributesState))
      ),
      switchMap(([, {selectedIntegrationId, selectedIntegration}, {additionalPropertyObjectType, perPage, page, orderBy, orderDirection, query}]) =>
        this.integrationService.getAccountsAttributes({
          integrationId: selectedIntegrationId,
          additionalPropertyObjectType
        }, {page, perPage}, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, additionalPropertyObjects, additionalPropertyObjectsIds}: GetAdditionalPropertyObjectsApiResponse) => [
                AccountAttributesAction.setTotalItemsCount({totalItemsCount}),
                AccountAttributesAction.setItems({items: additionalPropertyObjects}),
                AccountAttributesAction.setAdditionalPropertyObjectsIds({additionalPropertyObjectsIds}),
                MenuActions.setIntegrationTitle({selectedIntegration:selectedIntegration.value})

              ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );
}
