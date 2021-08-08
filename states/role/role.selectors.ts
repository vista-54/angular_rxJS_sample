import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { RoleState } from './role.reducer';

export const selectRole = (state: AppState) => state.roleState;

export const selectRoles = createSelector(selectRole, ({roles}: RoleState) => roles);
export const selectTotalItemsCount = createSelector(selectRole, ({totalItemsCount}: RoleState) => totalItemsCount);
export const selectPage = createSelector(selectRole, ({page}: RoleState) => page);
export const selectPerPage = createSelector(selectRole, ({perPage}: RoleState) => perPage);
export const selectSelectedRole = createSelector(selectRole, ({selectedRole}: RoleState) => selectedRole);
export const selectIsRefreshing = createSelector(selectRole, ({isRefreshing}: RoleState) => isRefreshing);
export const selectIsLoading = createSelector(selectRole, ({isLoading}: RoleState) => isLoading);
export const selectRoleType = createSelector(selectRole, ({type}: RoleState) => type);
export const selectAssignmentRuleCompilationError = createSelector(selectRole, ({assignmentRuleCompilationError}: RoleState) => assignmentRuleCompilationError);
export const selectAssignmentRuleBody = createSelector(selectRole, ({assignmentRuleCompilationError}: RoleState) => assignmentRuleCompilationError);
export const selectSelectedRoleId = createSelector(selectRole, ({selectedRoleId}: RoleState) => selectedRoleId);
