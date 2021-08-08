import { createReducer, on } from '@ngrx/store';
import * as AccountAttributesActions from '../account-attributes/account-attributes.actions';
import { AdditionalPropertyObject } from '@models/account-attributes.model';

export interface AccountAttributesState {
  items: AdditionalPropertyObject[];
  additionalPropertyObjectType: string;
  perPage: number;
  page: number;
  totalItemsCount: number;
  orderBy: string;
  orderDirection: string;
  query: string;
  additionalPropertyObjectsIds: string[];
}

export const initialState: AccountAttributesState = {
  items: null,
  additionalPropertyObjectType: null,
  perPage: 10,
  page: 0,
  totalItemsCount: 0,
  orderBy: null,
  orderDirection: null,
  query: null,
  additionalPropertyObjectsIds: null
};

export const accountAttributesStateReducer = createReducer(
  initialState,
  on(
    AccountAttributesActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    AccountAttributesActions.setItems,
    (state, {items}) => ({
      ...state,
      items
    })
  ),
  on(
    AccountAttributesActions.setSelectedAccountAttribute,
    (state, {additionalPropertyObjectType}) => ({
      ...state,
      additionalPropertyObjectType
    })
  ),
  on(
    AccountAttributesActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  ),
  on(
    AccountAttributesActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
        ...state,
        totalItemsCount
      })
  ),
  on(
    AccountAttributesActions.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    AccountAttributesActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    AccountAttributesActions.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
  on(
    AccountAttributesActions.setAdditionalPropertyObjectsIds,
    (state, {additionalPropertyObjectsIds}) => ({
        ...state,
        additionalPropertyObjectsIds
      })
  ),
  on(
    AccountAttributesActions.resetItems,
    (state, {}) => ({
      ...state,
      items: initialState.items,
    })
  ),
);
