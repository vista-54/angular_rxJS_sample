import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { RoleService } from '../../pages/identity-automation/pages/role/shared/services/role.service';
import * as IdentityActions from '../states/identity/identity.actions';
import * as IncludedItRolesActions from '../states/included-it-roles/included-it-roles.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { IncludedItRolesApiResponse } from '@models/role.model';
import * as MenuActions from '../states/menu/menu.actions';

@Injectable()
export class IncludedItRolesEffect {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private searchService: SearchService,
    private store$: Store<AppState>,
    private roleService: RoleService
  ) {
  }


  public getIncludedItRoles$ = createEffect(() => this.actions$
    .pipe(
      ofType(IncludedItRolesActions.getItems),
      withLatestFrom(
        this.store$.pipe(select(state => state.includedItRoles)),
        this.store$.pipe(select(state => state.roleState))
      ),
      switchMap(([, {perPage, page, orderBy, orderDirection, query},{selectedRoleId}]) =>
        this.roleService.getIncludedItRoles(selectedRoleId, {page, perPage}, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, roles}: IncludedItRolesApiResponse) => [
                IncludedItRolesActions.setItems({items: roles}),
                IncludedItRolesActions.setTotalItemsCount({totalItemsCount}),
                IdentityActions.toggleLoading({isLoading: false}),
                IdentityActions.toggleRefresh({isRefreshing: false}),
                MenuActions.setLevel3Roles()

              ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );
}
