import { createAction, props } from '@ngrx/store';


export const resetToInitialState = createAction(
  '[Assigned Access] Reset To Initial State'
);

export const resetItems = createAction(
  '[Assigned Access] Reset To Empty Array'
);
export const resetPagination = createAction(
  '[Assigned Access] Reset Identities Pagination'
);

export const getItems = createAction(
  '[Assigned Access] Get Items From Server'
);

export const setItems = createAction(
  '[Assigned Access] Set Items',
  props<{ items: any[] }>()
);

export const setTotalItemsCount = createAction(
  '[Assigned Access] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Assigned Access] Next Page',
  props<{ perPage; page }>()
);

export const search = createAction(
  '[Assigned Access] Search Workflows',
  props<{ query }>()
);

export const orderByField = createAction(
  '[Assigned Access] Order By',
  props<{ orderBy: string; orderDirection: string }>()
);

