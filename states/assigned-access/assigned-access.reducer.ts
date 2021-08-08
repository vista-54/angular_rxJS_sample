import { createReducer, on } from '@ngrx/store';
import * as AssignedAccess from '../assigned-access/assigned-access.actions';

export interface AssignedAccessState {
  items: any[];
  perPage: number;
  page: number;
  orderBy: string;
  orderDirection: string;
  totalItemsCount: number;
  query: string;
}

export const initialState: AssignedAccessState = {
  items: null,
  perPage: 10,
  page: 0,
  orderBy: null,
  orderDirection: null,
  totalItemsCount: 0,
  query: null,
};

export const AssignedAccessStateReducer = createReducer(
  initialState,
  on(
    AssignedAccess.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    AssignedAccess.resetItems,
    (state, {}) => ({
      ...state,
      items: initialState.items
    })
  ),
  on(
    AssignedAccess.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    AssignedAccess.setItems,
    (state, {items}) => ({
      ...state,
      items
    })
  ),
  on(
    AssignedAccess.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
        ...state,
        totalItemsCount
      })
  ),
  on(
    AssignedAccess.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    AssignedAccess.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
  on(
    AssignedAccess.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  )
);
