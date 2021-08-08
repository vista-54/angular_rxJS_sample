import { createAction, props } from '@ngrx/store';
import { Role, RoleEntitlement, RoleType } from '@models/role.model';


export const resetToInitialState = createAction(
  '[Role] Reset To Initial State'
);

export const resetRoles = createAction(
  '[Role] Reset To Empty Array'
);

export const resetPagination = createAction(
  '[Role] Reset Roles Pagination'
);


export const getRoles = createAction(
  '[Role] Get Roles From Server',
);

export const setRoles = createAction(
  '[Role] Set Roles',
  props<{ roles: Role[] }>()
);

export const setRoleId = createAction(
  '[Role] Set Selected Role Id',
  props<{ selectedRoleId: number }>()
);

export const setTotalItemsCount = createAction(
  '[Role] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Role] Next Page',
  props<{ perPage; page }>()
);

export const toggleRefresh = createAction(
  '[Role] toggle Refresh',
  props<{ isRefreshing: boolean }>()
);
export const toggleLoading = createAction(
  '[Role] toggle Loading',
  props<{ isLoading: boolean }>()
);

export const orderByField = createAction(
  '[Role] Order By',
  props<{ orderBy; orderDirection }>()
);

export const search = createAction(
  '[Role] Search Workflows',
  props<{ query }>()
);

export const getRole = createAction(
  '[Role] Is Selected',
  props<{ id: number }>()
);

export const resetSelectedRole = createAction(
  '[Role] Reset Role'
);

export const setRole = createAction(
  '[Role] Set Role',
  props<{ role: Role }>()
);

export const getEntitlements = createAction(
  '[Role] Get Role Entitlements'
);

export const setRoleType = createAction(
  '[Role] Set Role Type',
  props<{ roleType: RoleType }>()
);

export const getAssignmentRuleSignature = createAction(
  '[Role] Get Assigment Rule Signature'
);



