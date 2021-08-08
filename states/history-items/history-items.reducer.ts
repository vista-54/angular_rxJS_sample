import { createReducer, on } from '@ngrx/store';
import * as HistoryItemsActions from './history-items.actions';
import { ItemsType } from '@models/workflow.model';
import { Identity } from '@models/identity.model';
import { Workflow } from '../../../pages/identity-automation/pages/workflow/workflow.model';


export interface HistoryItemsState {
    historyItems: any[];
    perPage: number;
    page: number;
    orderBy: string;
    orderDirection: string;
    itemType: ItemsType;
    currentItemId: number;
    totalItemsCount: number;
    currentItem: Identity | Workflow;
}

export const initialState: HistoryItemsState = {
    historyItems: null,
    perPage: 10,
    page: 0,
    orderBy: null,
    orderDirection: null,
    itemType: null,
    currentItemId: null,
    totalItemsCount: 0,
    currentItem: null
};

export const historyItemStateReducer = createReducer(
    initialState,
    on(
        HistoryItemsActions.resetToInitialState,
        () => ({
            ...initialState
        })
    ),
    on(
        HistoryItemsActions.resetItems,
        (state, {}) => ({
            ...state,
            historyItems: initialState.historyItems
        })
    ),
    on(
        HistoryItemsActions.setItemType,
        (state, {itemType}) => ({
            ...state,
            itemType
        })
    ),
    on(
        HistoryItemsActions.setCurrentItemID,
        (state, {currentItemId}) => ({
            ...state,
            historyItems: null,
            currentItemId
        })
    ),
    on(
        HistoryItemsActions.setCurrentItem,
        (state, {currentItem}) => ({
            ...state,
            historyItems: null,
            currentItem
        })
    ),
    on(
        HistoryItemsActions.setHistoryItems,
        (state, {historyItems}) => ({
            ...state,
            historyItems
        })
    ),
    on(
        HistoryItemsActions.setTotalItemsCount,
        (state, {totalItemsCount}) => ({
            ...state,
            totalItemsCount
        })
    ),
    on(
        HistoryItemsActions.nextPage,
        (state, {perPage, page}) => ({
            ...state,
            perPage,
            page
        })
    ),
    on(
        HistoryItemsActions.orderByField,
        (state, {orderBy, orderDirection}) => ({
            ...state,
            orderBy,
            orderDirection
        })
    ),
);
