import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { RoleService } from '../../pages/identity-automation/pages/role/shared/services/role.service';
import * as RoleEntitlementsActions from '../states/role-entitlements/role-entitlements.actions';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  RoleEntitlementMode,
  RoleEntitlementsApiResponse,
  RoleEntitlementsRequestParams,
} from '@models/role.model';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { TargetAccountEntitlementsRequestParams } from '@models/target-account.model';
import * as MenuActions from '../states/menu/menu.actions';
import { MENU_TITLES } from '@const/menu.const';

@Injectable()

export class RoleEntitlementEffect {

  public getEntitlements$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleEntitlementsActions.getItems),
      withLatestFrom(
        this.store$.pipe(select(state => state.roleEntitlements)),
        this.store$.pipe(select(state => state.roleState)),
        this.store$.pipe(select(state => state.menuState)),
      ),
      switchMap(([, {
          perPage, page, orderBy, orderDirection, query, mode, integrationId,
          targetId,
          accountId
        }, {selectedRoleId}, {activeLevel2}]) =>
          this.getEntitlements(mode, {
            roleId: selectedRoleId,
            pagination: {page, perPage},
            ordering: {orderBy, orderingDirection: orderDirection},
            query
          }, {
            pagination: {page, perPage},
            ordering: {orderBy, orderingDirection: orderDirection},
            query,
            targetAccount: {targetId, accountId, integrationId}
          })
            .pipe(
              switchMap(({totalItemsCount, entitlements, accountEntitlements}: RoleEntitlementsApiResponse) => {
                const menuActions = (activeLevel2 !== MENU_TITLES.IDENTITIES && activeLevel2 !== MENU_TITLES.MY_ACCESS) ? MenuActions.setLevel3Roles() : SharedActions.doNothing();
                return [
                  this.setEntitlements(entitlements, accountEntitlements),
                  RoleEntitlementsActions.setTotalItemsCount({totalItemsCount}),
                  menuActions
                ];
              }),
              catchError((err) => of(SharedActions.doNothing()))
            )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private searchService: SearchService,
    private store$: Store<AppState>,
    private roleService: RoleService
  ) {
  }

  private setEntitlements(items, accountEntitlements) {
    if (items) {
      return RoleEntitlementsActions.setItems({entitlements: items});
    } else if (accountEntitlements) {
      return RoleEntitlementsActions.setAccountEntitlements({accountEntitlements});
    } else {
      return RoleEntitlementsActions.setItems({entitlements: null});
    }
  }

  private getEntitlements(mode: RoleEntitlementMode, roleParams: RoleEntitlementsRequestParams, targetAccountParams: TargetAccountEntitlementsRequestParams) {
    switch (mode) {
      case RoleEntitlementMode.role:
        return this.roleService.getEntitlements(roleParams.roleId, roleParams.pagination, roleParams.ordering, roleParams.query);
      case RoleEntitlementMode.targetAccount:
        return this.roleService.getTargetAccountsEntitlements(targetAccountParams.targetAccount, targetAccountParams.pagination, targetAccountParams.ordering, targetAccountParams.query);
    }
  }
}
