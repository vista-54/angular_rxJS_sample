import { createAction, props } from '@ngrx/store';

export const getAccountProperties = createAction(
  '[Account Properties] Get Account Properties'
);

export const setInitialState = createAction(
  '[Account Properties] Set Initial State'
);

export const setItemsOptions = createAction(
  '[Account Properties] Set Account Properties',
  props<{
    accountProperties;
    entitlementProperties;
    additionalPropertyObjectProperties;
  }>()
);

export const paginationInit = createAction(
  '[Account Properties] Pagination Init',
  props<{ tabIndex: number }>()
);


export const nextPage = createAction(
  '[Account Properties] Next Page',
  props<{
    perPage;
    page;
  }>()
);

export const orderByField = createAction(
  '[Account Properties] Order By Field',
  props<{
    orderBy;
    orderDirection;
  }>()
);

export const searchByQuery = createAction(
  '[Account Properties] Search By Query',
  props<{
    query;
  }>()
);

export const setFilteredItems = createAction(
  '[Account Properties] set Filtered Items',
  props<{
    items: any[];
  }>()
);
