import { createAction, props } from '@ngrx/store';


export const resetToInitialState = createAction(
  '[Target Accounts] Reset To Initial State'
);

export const resetRefresh = createAction(
    '[Target Accounts] Reset Refresh'
);

export const resetItems = createAction(
  '[Target Accounts] Reset To Empty Array'
);
export const resetPagination = createAction(
  '[Target Accounts] Reset Identities Pagination'
);

export const getItems = createAction(
  '[Target Accounts] Get Items From Server'
);

export const setItems = createAction(
  '[Target Accounts] Set Items',
  props<{ items: any[] }>()
);

export const setTotalItemsCount = createAction(
  '[Target Accounts] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Target Accounts] Next Page',
  props<{ perPage; page }>()
);

export const search = createAction(
  '[Target Accounts] Search Workflows',
  props<{ query }>()
);

export const orderByField = createAction(
  '[Target Accounts] Order By',
  props<{ orderBy: string; orderDirection: string }>()
);

export const setShowAll = createAction(
  '[Target Accounts] Order By',
  props<{ showAll: boolean }>()
);

export const getLinuxCMDFile = createAction(
  '[Target Accounts] Get Linux CMD File',
  props<{ integrationId: number; accountId: string }>()
);
