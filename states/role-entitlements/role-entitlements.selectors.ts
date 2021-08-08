import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { RoleEntitlementsState } from './role-entitlements.reducer';

export const selectRoleEntitlements = (state: AppState) => state.roleEntitlements;

export const selectEntitlements = createSelector(selectRoleEntitlements, ({entitlements}: RoleEntitlementsState) => entitlements);
export const selectTotalItemsCount = createSelector(selectRoleEntitlements, ({totalItemsCount}: RoleEntitlementsState) => totalItemsCount);
export const selectPage = createSelector(selectRoleEntitlements, ({page}: RoleEntitlementsState) => page);
export const selectPerPage = createSelector(selectRoleEntitlements, ({perPage}: RoleEntitlementsState) => perPage);
export const selectSearchQuery = createSelector(selectRoleEntitlements, ({query}: RoleEntitlementsState) => query);
