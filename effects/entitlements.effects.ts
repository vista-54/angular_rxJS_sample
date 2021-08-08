import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { IntegrationService } from '../../pages/identity-automation/pages/integration/services/integration.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as EntitlementsAction from '../states/entitlements/entitlements.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { EntitlementByTargetAndTypeApiResponse, Target } from '@models/entitlement.model';

@Injectable()
export class EntitlementsEffects {
    public getEntitlementsByTypeAndTarget$ = createEffect(() => this.actions$
        .pipe(
            ofType(EntitlementsAction.getEntitlementsByTargetAndType),
            withLatestFrom(
                this.store$.pipe(select(state => state.entitlementsState)),
                this.store$.pipe(select(state => state.integrationState))
            ),
            switchMap(([, {perPage, page, orderBy, orderDirection, query, entitlementType, entitlementsSubTabsTargetId, targetId},
                           {selectedIntegrationId}]) => this.integrationService.getEntitlementsByTypeAndTarget({
                    integrationId: selectedIntegrationId,
                    entitlementType,
                    targetId
                }, {page, perPage}, {
                    orderBy,
                    orderingDirection: orderDirection
                }, query)
                    .pipe(
                        switchMap(({totalItemsCount, allIdentitiesAndWorkgroups, entitlementsIds, targets, integrationType, implicitEntitlements}: EntitlementByTargetAndTypeApiResponse) => {
                            return [
                                EntitlementsAction.setIdentityWorkgroupsDictionary({identityWorkgroupsDictionary: allIdentitiesAndWorkgroups}),
                                EntitlementsAction.setEntitlements({entitlements: this.entitlements(entitlementsIds, targets)}),
                                EntitlementsAction.setIntegrationType({integrationType}),
                                EntitlementsAction.setImplicitEntitlements({implicitEntitlements}),
                                EntitlementsAction.setTargets({targets}),
                                EntitlementsAction.setTotalItemsCount({totalItemsCount}),
                            ];
                        }),
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
        private integrationService: IntegrationService,
        private store$: Store<AppState>,
    ) {
    }

    public selectEntitlements(entitlementsIds: string[], entitlements) {
        return this.integrationService.selectIdsFromArray(entitlementsIds, entitlements);
    }

    public entitlements(entitlementsIds: string[], targets: Target[]) {
        return this.integrationService.selectIdsFromArray(entitlementsIds, targets);
    }
}
