import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { IncludedItRoleState } from './included-it-roles.reducer';

export const selectIncludedItRoles = (state: AppState) => state.includedItRoles;


export const selectItems = createSelector(selectIncludedItRoles, ({items}: IncludedItRoleState) => items);
export const selectTotalItemsCount = createSelector(selectIncludedItRoles, ({totalItemsCount}: IncludedItRoleState) => totalItemsCount);
export const selectPage = createSelector(selectIncludedItRoles, ({page}: IncludedItRoleState) => page);
export const selectPerPage = createSelector(selectIncludedItRoles, ({perPage}: IncludedItRoleState) => perPage);
export const selectSearchQuery = createSelector(selectIncludedItRoles, ({query}: IncludedItRoleState) => query);

