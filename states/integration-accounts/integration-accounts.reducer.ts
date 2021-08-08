import { IntegrationAccount } from '../../models/accounts.model';
import { createReducer, on } from '@ngrx/store';
import * as IntegrationAccountsActions from '../integration-accounts/integration-accounts.actions';

export interface IntegrationAccountsState {
  items: IntegrationAccount[];
  perPage: number;
  page: number;
  totalItemsCount: number;
  orderBy: string;
  orderDirection: string;
  query: string;
  additionalPropertyObjects: any[];
  allIdentitiesAndWorkgroups: { allIdentities: any[]; allWorkgroups: any[] };
  targets: any[];
  accountEntitlements: {};
}

export const initialState: IntegrationAccountsState = {
  items: null,
  perPage: 10,
  page: 0,
  totalItemsCount: 0,
  orderBy: null,
  orderDirection: null,
  query: null,
  additionalPropertyObjects: null,
  allIdentitiesAndWorkgroups: null,
  targets: null,
  accountEntitlements: null
};

export const integrationAccountsStateReducer = createReducer(
  initialState,
  on(
    IntegrationAccountsActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    IntegrationAccountsActions.resetItems,
    (state, {}) => ({
      ...state,
      items: initialState.items,
    })
  ),
  on(
    IntegrationAccountsActions.setItems,
    (state, {items}) => ({
        ...state,
        items
      })
  ),
  on(
    IntegrationAccountsActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
        ...state,
        totalItemsCount
      })
  ),
  on(
    IntegrationAccountsActions.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    IntegrationAccountsActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    IntegrationAccountsActions.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
  on(
    IntegrationAccountsActions.setAdditionalPropertyObjects,
    (state, {additionalPropertyObjects}) => ({
        ...state,
        additionalPropertyObjects
      })
  ),
  on(
    IntegrationAccountsActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  ),
  on(
    IntegrationAccountsActions.setAllIdentitiesAndWorkgroups,
    (state, {allIdentitiesAndWorkgroups}) => ({
        ...state,
        allIdentitiesAndWorkgroups
      })
  ),
  on(
    IntegrationAccountsActions.setTargets,
    (state, {targets}) => ({
        ...state,
        targets
      })
  ),
  on(
    IntegrationAccountsActions.setAccountEntitlements,
    (state, {accountEntitlements}) => ({
        ...state,
        accountEntitlements
      })
  )
);
