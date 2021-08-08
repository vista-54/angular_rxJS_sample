import { createAction, props } from '@ngrx/store';
import { IntegrationAccount } from '../../models/accounts.model';

export const resetToInitialState = createAction(
  '[IntegrationsAccounts] Reset To Initial State'
);
export const resetItems = createAction(
  '[IntegrationsAccounts] Reset To Empty Array'
);
export const getIntegrationsAccounts = createAction(
  '[IntegrationsAccounts] Get From Server'
);

export const setItems = createAction(
  '[IntegrationsAccounts] Set IntegrationsAccounts',
  props<{ items: IntegrationAccount[] }>()
);


export const setTotalItemsCount = createAction(
  '[IntegrationsAccounts] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[IntegrationsAccounts] Next Page',
  props<{ perPage: number; page: number }>()
);

export const resetPagination = createAction(
  '[IntegrationsAccounts] Reset IntegrationsAccounts Pagination'
);

export const search = createAction(
  '[IntegrationsAccounts] Search IntegrationsAccounts',
  props<{ query }>()
);

export const setAdditionalPropertyObjects = createAction(
  '[IntegrationsAccounts] Set Additional Property Objects',
  props<{ additionalPropertyObjects: [] }>()
);

export const orderByField = createAction(
  '[IntegrationsAccounts] Order By',
  props<{ orderBy: string; orderDirection: string }>()
);

export const setAllIdentitiesAndWorkgroups = createAction(
  '[IntegrationsAccounts] Set allIdentitiesAndWorkgroups',
  props<{ allIdentitiesAndWorkgroups: { allIdentities: any[]; allWorkgroups: any[] } }>()
);

export const setTargets = createAction(
  '[IntegrationsAccounts] Set Targets',
  props<{ targets: any[] }>()
);

export const setAccountEntitlements = createAction(
  '[IntegrationsAccounts] Set Account Entitlements',
  props<{ accountEntitlements: {} }>()
);



