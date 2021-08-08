import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { IdentityService } from '../../pages/identity-automation/pages/identity/shared/services/identity.service';
import { AppState } from '../app.state';
import { IdentitiesApiResponse, IdentityApiResponse, WorkgroupsApiResponse } from '@models/identity.model';
import { ItemsType } from '@models/workflow.model';
import * as AssignedAccessActions from '../states/assigned-access/assigned-access.actions';
import * as HistoryItemsActions from '../states/history-items/history-items.actions';
import * as IdentityActions from '../states/identity/identity.actions';
import * as SharedActions from '../states/shared/shared.actions';
import * as MenuActions from '../states/menu/menu.actions';
import * as TargetAccountsActions from '../states/target-accounts/target-accounts.actions';

@Injectable()
export class IdentityEffects {


    public getIdentities$ = createEffect(() => this.actions$
        .pipe(
            ofType(IdentityActions.getIdentities),
            withLatestFrom(this.store$.pipe(select(state => state.identityState))),
            switchMap(([, {perPage, page, orderBy, orderDirection, query, status}]) =>
                this.identityService.getAll({page, perPage}, {orderBy,orderingDirection: orderDirection}, query, status)
                    .pipe(
                        switchMap(({totalItemsCount, identities, managerIdentities, sourceIntegrations, users}: IdentitiesApiResponse) => [
                            IdentityActions.setIdentities({identities, managerIdentities, sourceIntegrations, users}),
                            IdentityActions.setTotalItemsCount({totalItemsCount}),
                            IdentityActions.toggleLoading({isLoading: false}),
                            IdentityActions.toggleRefresh({isRefreshing: false}),
                        ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            ),
            share()
        )
    );


    public getSelectedIdentity$ = createEffect(() => this.actions$
        .pipe(
            ofType(IdentityActions.getIdentity),
            switchMap(({id}) =>
                this.identityService.getIdentityById(id)
                    .pipe(
                        switchMap(({identity, managerIdentity, sourceIntegration, localUser}: IdentityApiResponse) => [
                            IdentityActions.setIdentity({identity, managerIdentity, sourceIntegration, localUser}),
                            HistoryItemsActions.resetToInitialState(),
                            HistoryItemsActions.setItemType({itemType: ItemsType.Identity}),
                            HistoryItemsActions.setCurrentItemID({currentItemId: identity.id}),
                            HistoryItemsActions.setCurrentItem({currentItem: identity}),

                            IdentityActions.toggleLoading({isLoading: false}),
                            IdentityActions.toggleRefresh({isRefreshing: false}),
                            AssignedAccessActions.resetToInitialState(),
                            TargetAccountsActions.resetToInitialState(),

                            MenuActions.setLevel3MyAccess(),
                        ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            ),
            share()
        )
    );

    public getWorkgroups$ = createEffect(() => this.actions$
        .pipe(
            ofType(IdentityActions.getWorkgroups),
            withLatestFrom(this.store$.pipe(select(state => state.identityState.selectedIdentityId))),
            switchMap(([, selectedIdentityId]) =>
                this.identityService.getWorkgroupsByIdentityId(selectedIdentityId)
                    .pipe(
                        switchMap(({allWorkgroups, identityWorkgroupsIds}: WorkgroupsApiResponse) => [
                            IdentityActions.setWorkgroups({allWorkgroups, identityWorkgroupsIds}),
                            IdentityActions.toggleLoading({isLoading: false}),
                            IdentityActions.toggleRefresh({isRefreshing: false}),
                        ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            ),
            share()
        )
    );

    public saveWorkgroups$ = createEffect(() => this.actions$
        .pipe(
            ofType(IdentityActions.saveWorkgroups),
            withLatestFrom(this.store$.pipe(select(state => state.identityState))),
            switchMap(([{ids}, {selectedIdentity}]) =>
                this.identityService.saveWorkgroups(selectedIdentity.id, ids)
                    .pipe(
                        map(() => SharedActions.setIsSaving({isSaving: false})),
                        catchError(() => of(SharedActions.setIsSaving({isSaving: false}))))
            ),
            share()
        )
    );

    public getMe$ = createEffect(() => this.actions$
        .pipe(
            ofType(IdentityActions.getMe),
            switchMap(() =>
                this.identityService.me()
                    .pipe(
                        switchMap(({identity, managerIdentity, sourceIntegration, localUser}: IdentityApiResponse) => [
                            IdentityActions.setIdentity({identity, managerIdentity, sourceIntegration, localUser}),
                            IdentityActions.setSelectedIdentityId({selectedIdentityId: identity.id}),
                            IdentityActions.toggleLoading({isLoading: false}),
                            IdentityActions.toggleRefresh({isRefreshing: false}),
                            HistoryItemsActions.resetToInitialState(),
                            HistoryItemsActions.setItemType({itemType: ItemsType.Identity}),
                            HistoryItemsActions.setCurrentItemID({currentItemId: identity.id}),
                            HistoryItemsActions.setCurrentItem({currentItem: identity}),
                        ]),
                        catchError(() => of(SharedActions.doNothing()))
                    ),
            ),
            share()
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private identityService: IdentityService
    ) {
    }
}
