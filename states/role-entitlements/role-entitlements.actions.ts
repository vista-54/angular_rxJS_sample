import { createAction, props } from '@ngrx/store';
import { Role, RoleEntitlement, RoleEntitlementMode } from '../../models/role.model';

export const resetToInitialState = createAction(
  '[Role Entitlements] Reset To Initial State'
);

export const resetEntitlements = createAction(
  '[Role Entitlements] Reset To Empty Array'
);

export const resetPagination = createAction(
  '[Role Entitlements] Reset Entitlements Pagination'
);

export const getItems = createAction(
  '[Role Entitlements] Get FromServer'
);

export const setItems = createAction(
  '[Role Entitlements] Set Items',
  props<{ entitlements: RoleEntitlement[] }>()
);

export const setAccountEntitlements = createAction(
  '[Role Entitlements] Set Account Entitlements',
  props<{ accountEntitlements: RoleEntitlement[] }>()
);

export const setMode = createAction(
  '[Role Entitlements] Set Mode',
  props<{ mode: RoleEntitlementMode }>()
);
export const setTargetAccountsParams = createAction(
  '[Role Entitlements] Set Target Accounts Params',
  props<{ targetId: string; accountId: string; integrationId: number }>()
);

export const setTotalItemsCount = createAction(
  '[Role Entitlements] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Role Entitlements] Next Page',
  props<{ perPage; page }>()
);

export const orderByField = createAction(
  '[Role Entitlements] Order By',
  props<{ orderBy; orderDirection }>()
);

export const search = createAction(
  '[Role Entitlements] Search',
  props<{ query }>()
);
