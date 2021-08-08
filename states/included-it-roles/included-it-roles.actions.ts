import { createAction, props } from '@ngrx/store';
import { RoleEntitlement, RoleEntitlementMode } from '../../models/role.model';
import { NameId } from '../../models/identity.model';


export const resetToInitialState = createAction(
  '[Included It Role] Reset To Initial State'
);

export const resetEntitlements = createAction(
  '[Included It Role] Reset To Empty Array'
);

export const resetPagination = createAction(
  '[Included It Role] Reset Entitlements Pagination'
);

export const getItems = createAction(
  '[Included It Role] Get FromServer'
);

export const setItems = createAction(
  '[Included It Role] Set Items',
  props<{ items: NameId[] }>()
);

export const setAccountEntitlements = createAction(
  '[Included It Role] Set Account Entitlements',
  props<{ accountEntitlements: RoleEntitlement[] }>()
);

export const setMode = createAction(
  '[Included It Role] Set Mode',
  props<{ mode: RoleEntitlementMode }>()
);
export const setTargetAccountsParams = createAction(
  '[Included It Role] Set Target Accounts Params',
  props<{ targetId: string; accountId: string; integrationId: number }>()
);

export const setTotalItemsCount = createAction(
  '[Included It Role] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Included It Role] Next Page',
  props<{ perPage; page }>()
);

export const orderByField = createAction(
  '[Included It Role] Order By',
  props<{ orderBy; orderDirection }>()
);

export const search = createAction(
  '[Included It Role] Search',
  props<{ query }>()
);

