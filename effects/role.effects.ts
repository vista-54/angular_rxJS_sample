import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { RoleService } from '../../pages/identity-automation/pages/role/shared/services/role.service';
import * as RoleActions from '../states/role/role.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { Role, RoleApiResponse, RolesApiResponse } from '@models/role.model';
import { identityIdName } from '@states/general-workflow-settings/general-workflow-settings.reducer';
import * as MenuActions from '../states/menu/menu.actions';

@Injectable()
export class RoleEffects {


  public getRoles$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleActions.getRoles),
      withLatestFrom(this.store$.pipe(select(state => state))),
      switchMap(([, {
          roleState: {perPage, page, orderBy, orderDirection, query, type},
          generalWorkflowSettings: {rootOwnerIdName}
        }]) =>
          this.roleService.getAll(type, {page, perPage}, {
            orderBy,
            orderingDirection: orderDirection
          }, query)
            .pipe(
              switchMap(({totalItemsCount, roles, identityOwners, workgroupOwners}: RolesApiResponse) => {
                const resultRoles = roles.map((role: Role) => (
                  this.prepareRole(role, identityOwners, workgroupOwners, rootOwnerIdName)
                ));
                return [
                  RoleActions.setRoles({roles: resultRoles}),
                  RoleActions.setTotalItemsCount({totalItemsCount}),
                  RoleActions.toggleLoading({isLoading: false}),
                  RoleActions.toggleRefresh({isRefreshing: false}),

                ];
              }),
              catchError((err) => of(SharedActions.doNothing()))
            )
      )
    )
  );

  public getSelectedRole$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleActions.getRole),
      withLatestFrom(this.store$.pipe(select(state => state))),
      switchMap(([, {
          roleState: {perPage, page, selectedRoleId, orderBy, orderDirection, query, selectedRole, assignmentRuleCompilationError},
          generalWorkflowSettings: {rootOwnerIdName, allIdentitiesAndWorkgroups: {allIdentities, allWorkgroups}}
        }]) =>
          this.checkIfLoadedRole(selectedRoleId, selectedRole, assignmentRuleCompilationError)
            .pipe(
              switchMap(({role, assignmentRuleCompilationError}: RoleApiResponse) => {
                const resultRole = this.prepareRole(role, allIdentities, allWorkgroups, rootOwnerIdName);
                return [
                  // RoleEntitlementActions.resetToInitialState(),
                  // IncludedItRolesActions.resetToInitialState(),
                  RoleActions.setRole({role: resultRole}),
                  RoleActions.toggleLoading({isLoading: false}),
                  RoleActions.toggleRefresh({isRefreshing: false}),
                  MenuActions.setLevel3Roles(),

                ];
              }),
              catchError((err) => of(SharedActions.doNothing()))
            )
      ),
      share()
    )
  );

  public getRoleEntitlements$ = createEffect(() => this.actions$
    .pipe(
      ofType(RoleActions.getEntitlements),
      withLatestFrom(this.store$.pipe(select(state => state))),
      switchMap(([, {
          roleState: {perPage, page, orderBy, orderDirection, query, type},
          generalWorkflowSettings: {rootOwnerIdName}
        }]) =>
          this.roleService.getAll(type, {page, perPage}, {
            orderBy,
            orderingDirection: orderDirection
          }, query)
            .pipe(
              switchMap(({totalItemsCount, roles, identityOwners, workgroupOwners}: RolesApiResponse) => {
                const resultRoles = roles.map((role: Role) => (
                  this.prepareRole(role, identityOwners, workgroupOwners, rootOwnerIdName)
                ));
                return [
                  RoleActions.setRoles({roles: resultRoles}),
                  RoleActions.setTotalItemsCount({totalItemsCount}),
                  RoleActions.toggleLoading({isLoading: false}),
                  RoleActions.toggleRefresh({isRefreshing: false})
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

  public checkIfLoadedRole(currentId: number, storedRole: Role, assignmentRuleCompilationError: string): Observable<RoleApiResponse> {
    return this.roleService.getOne(currentId);
  }

  private setRoleOwnerIdentity(role: Role, identityList: identityIdName[], rootOwnerIdName: identityIdName): Role {
    let owner = identityList.find(x => x.id === role.owner.id);
    if (!owner?.name) {
      owner = rootOwnerIdName;
    }
    return {
      ...role,
      ownerIdentity: owner
    };
  }


  private prepareRole(role: Role,
                      identityOwners: identityIdName[],
                      workgroupOwners: identityIdName[],
                      rootOwnerIdName: identityIdName): Role {
    if (role.owner) {
      if (role.owner.type === 'Identity') {
        return this.setRoleOwnerIdentity(role, identityOwners, rootOwnerIdName);
      } else if (role.owner.type === 'Workgroup') {
        return this.setRoleOwnerIdentity(role, workgroupOwners, rootOwnerIdName);
      }
    } else {
      return {...role, ownerIdentity: rootOwnerIdName};
    }
  }
}
