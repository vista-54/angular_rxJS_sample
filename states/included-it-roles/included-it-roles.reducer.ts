import { NameId } from '@models/identity.model';
import { createReducer, on } from '@ngrx/store';
import * as IncludedItRolesActions from '../included-it-roles/included-it-roles.actions';

export interface IncludedItRoleState {
  items: NameId[];
  perPage: number;
  page: number;
  orderBy: string;
  orderDirection: string;
  totalItemsCount: number;
  query: string;
}

export const initialState: IncludedItRoleState = {
  items: null,
  perPage: 10,
  page: 0,
  orderBy: null,
  orderDirection: null,
  totalItemsCount: 0,
  query: null,
};

export const includedItRolesStateReducer = createReducer(
  initialState,
  on(
    IncludedItRolesActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    IncludedItRolesActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    IncludedItRolesActions.resetEntitlements,
    (state, {}) => ({
      ...state,
        items: initialState.items,
    })
  ),
  on(
    IncludedItRolesActions.setItems,
    (state, {items}) => ({
      ...state,
      items: items ? items : []
    })
  ),
  on(
    IncludedItRolesActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
      ...state,
      totalItemsCount
    })
  ),
  on(
    IncludedItRolesActions.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    IncludedItRolesActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  ),
  on(
    IncludedItRolesActions.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
);
