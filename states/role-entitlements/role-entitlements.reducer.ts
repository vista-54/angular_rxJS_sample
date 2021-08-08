import { RoleEntitlement, RoleEntitlementMode } from '@models/role.model';
import { createReducer, on } from '@ngrx/store';
import * as RoleEntitlementActions from '../role-entitlements/role-entitlements.actions';

export interface RoleEntitlementsState {
  entitlements: RoleEntitlement[];
  perPage: number;
  page: number;
  orderBy: string;
  orderDirection: string;
  totalItemsCount: number;
  query: string;
  isRefreshing: boolean;
  isLoading: boolean;
  mode: RoleEntitlementMode;
  integrationId: number;
  targetId: string;
  accountId: string;
}

export const initialState: RoleEntitlementsState = {
  entitlements: null,
  perPage: 25,
  page: 0,
  orderBy: null,
  orderDirection: null,
  totalItemsCount: 0,
  query: null,
  isRefreshing: false,
  isLoading: false,
  mode: null,
  integrationId: null,
  targetId: null,
  accountId: null
};

export const roleEntitlementStateReducer = createReducer(
  initialState,
  on(
    RoleEntitlementActions.resetToInitialState,
    (state) => ({
      ...initialState,
      mode: state.mode
    })
  ),
  on(
    RoleEntitlementActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    RoleEntitlementActions.resetEntitlements,
    (state, {}) => ({
      ...state,
      entitlements: initialState.entitlements,
    })
  ),
  on(
    RoleEntitlementActions.setItems,
    (state, {entitlements}) => ({
      ...state,
      entitlements: entitlements ? entitlements : []
    })
  ), on(
    RoleEntitlementActions.setAccountEntitlements,
    (state, {accountEntitlements}) => ({
        ...state,
        entitlements: accountEntitlements ? accountEntitlements : []
      })
  ),
  on(
    RoleEntitlementActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
      ...state,
      totalItemsCount
    })
  ),
  on(
    RoleEntitlementActions.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    RoleEntitlementActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  ),
  on(
    RoleEntitlementActions.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
  on(
    RoleEntitlementActions.setMode,
    (state, {mode}) => ({
        ...state,
        mode
      })
  ),
  on(
    RoleEntitlementActions.setTargetAccountsParams,
    (state, {integrationId, targetId, accountId}) => ({
        ...state,
        integrationId, targetId, accountId
      })
  ),
);
