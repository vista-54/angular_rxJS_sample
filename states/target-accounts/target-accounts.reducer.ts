import { createReducer, on } from '@ngrx/store';
import * as TargetAccountActions from '../target-accounts/target-accounts.actions';
import { query } from '@angular/animations';

export interface TargetAccountsState {
    items: any[];
    perPage: number;
    page: number;
    orderBy: string;
    orderDirection: string;
    totalItemsCount: number;
    query: string;
    showAll: boolean;
}

export const initialState: TargetAccountsState = {
    items: null,
    perPage: 10,
    page: 0,
    orderBy: null,
    orderDirection: null,
    totalItemsCount: 0,
    query: null,
    showAll: false
};


export const targetAccountsStateReducer = createReducer(
    initialState,
    on(
        TargetAccountActions.resetToInitialState,
        () => ({
            ...initialState
        })
    ),
    on(
        TargetAccountActions.resetRefresh,
        (state, {}) => ({
            ...initialState,
            query: state.query
        })
    ),
    on(
        TargetAccountActions.resetItems,
        (state, {}) => ({
            ...state,
            items: initialState.items
        })
    ),
    on(
        TargetAccountActions.resetPagination,
        (state, {}) => ({
            ...state,
            page: initialState.page,
        })
    ),
    on(
        TargetAccountActions.setItems,
        (state, {items}) => ({
            ...state,
            items
        })
    ),
    on(
        TargetAccountActions.setTotalItemsCount,
        (state, {totalItemsCount}) => ({
            ...state,
            totalItemsCount
        })
    ),
    on(
        TargetAccountActions.nextPage,
        (state, {perPage, page}) => ({
            ...state,
            perPage,
            page
        })
    ),
    on(
        TargetAccountActions.search,
        (state, {query}) => ({
            ...state,
            query
        })
    ),
    on(
        TargetAccountActions.orderByField,
        (state, {orderBy, orderDirection}) => ({
            ...state,
            orderBy,
            orderDirection
        })
    ),
    on(
        TargetAccountActions.setShowAll,
        (state, {showAll}) => ({
            ...state,
            showAll
        })
    ),
);
