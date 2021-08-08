import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { HistoryItemsState } from './history-items.reducer';


export const selectHistoryItems = (state: AppState) => state.historyItemsState;

export const selectItems = createSelector(selectHistoryItems, ({historyItems}: HistoryItemsState) => historyItems);
export const selectTotalItemsCount = createSelector(selectHistoryItems, ({totalItemsCount}: HistoryItemsState) => totalItemsCount);
export const selectPage = createSelector(selectHistoryItems, ({page}: HistoryItemsState) => page);
export const selectPerPage = createSelector(selectHistoryItems, ({perPage}: HistoryItemsState) => perPage);
export const selectCurrentItemId = createSelector(selectHistoryItems, ({currentItemId}: HistoryItemsState) => currentItemId);
export const selectCurrentItem = createSelector(selectHistoryItems, ({currentItem}: HistoryItemsState) => currentItem);
export const selectItemType = createSelector(selectHistoryItems, ({itemType}: HistoryItemsState) => itemType);


export const selectItemAndItemType = createSelector(selectCurrentItem,
    selectItemType,
    (
        item,
        itemType) => {
        if (item) {
            return {
                item,
                itemType
            };
        }
    });
