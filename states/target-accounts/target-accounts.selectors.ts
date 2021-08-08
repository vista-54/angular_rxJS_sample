import { createSelector } from '@ngrx/store';
import { TargetAccountsState } from './target-accounts.reducer';
import { AppState } from '../../app.state';

export const selectTargetAccounts = (state: AppState) => state.targetAccountsState;


export const selectItems = createSelector(selectTargetAccounts, ({items}: TargetAccountsState) => items);
export const selectTotalItemsCount = createSelector(selectTargetAccounts, ({totalItemsCount}: TargetAccountsState) => totalItemsCount);
export const selectPage = createSelector(selectTargetAccounts, ({page}: TargetAccountsState) => page);
export const selectPerPage = createSelector(selectTargetAccounts, ({perPage}: TargetAccountsState) => perPage);
export const selectSearchQuery = createSelector(selectTargetAccounts, ({query}: TargetAccountsState) => query);
