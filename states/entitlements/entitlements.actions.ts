import { createAction, props } from '@ngrx/store';
import { Target, TargetEntitlementTypes } from '@models/entitlement.model';
import { AllIdentitiesAndWorkgroups } from '@models/general-workflow-settings.model';

export const resetToInitialState = createAction(
  '[Entitlements] Reset To Initial State'
);

export const setSelectedTargetId = createAction(
  '[Entitlements] Set Target Id',
  props<{ targetId: string }>()
);

export const setSelectedEntitlementType = createAction(
  '[Entitlements] Set Entitlement Type',
  props<{ entitlementType: string }>()
);

export const setSelectedEntitlementTab = createAction(
    '[Entitlements] Set Entitlement Tab',
    props<{ entitlementTab: string }>()
);

export const getEntitlementsByTargetAndType = createAction(
  '[Entitlements] Get getEntitlementsByTargetAndType',
);


export const setEntitlements = createAction(
  '[Entitlements] Set Entitlements',
  props<{ entitlements: number[] }>()
);

export const setEntitlementsSubTabs = createAction(
  '[Entitlements] Set Entitlements Sub Tabs',
  props<{ targetEntitlementTypes: TargetEntitlementTypes[] }>()
);

export const setIdentityWorkgroupsDictionary = createAction(
  '[Entitlements] Set identityWorkgroupsDictionary',
  props<{ identityWorkgroupsDictionary: AllIdentitiesAndWorkgroups }>()
);
export const setIntegrationType = createAction(
  '[Entitlements] Set Integration Type',
  props<{ integrationType: string }>()
);
export const setImplicitEntitlements = createAction(
  '[Entitlements] Set Implicit Entitlements',
  props<{ implicitEntitlements: {} }>()
);
export const setTargets = createAction(
  '[Entitlements] Set Targets',
  props<{ targets: Target[]}>()
);

export const nextPage = createAction(
  '[Entitlements] Next Page',
  props<{ perPage: number; page: number }>()
);

export const resetPagination = createAction(
  '[Entitlements] Reset Pagination'
);

export const search = createAction(
  '[Entitlements] Search Integrations',
  props<{ query: string }>()
);

export const orderByField = createAction(
  '[Entitlements] Order By',
  props<{ orderBy: string; orderDirection: string }>()
);

export const resetItems = createAction(
  '[Entitlements] Reset To Empty Array'
);

export const setTotalItemsCount = createAction(
  '[Entitlements] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);
