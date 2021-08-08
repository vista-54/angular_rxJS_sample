import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { WorkgroupState } from './workgroup.reducer';
export const selectWorkgroup = (state: AppState) => state.workgroupState;

export const selectWorkgroups = createSelector(selectWorkgroup, ({workgroups}: WorkgroupState) => workgroups);
export const selectTotalItemsCount = createSelector(selectWorkgroup, ({totalItemsCount}: WorkgroupState) => totalItemsCount);
export const selectPage = createSelector(selectWorkgroup, ({page}: WorkgroupState) => page);
export const selectPerPage = createSelector(selectWorkgroup, ({perPage}: WorkgroupState) => perPage);
export const selectSelectedWorkgroup = createSelector(selectWorkgroup, ({selectedWorkgroup}: WorkgroupState) => selectedWorkgroup);
export const selectIsRefreshing = createSelector(selectWorkgroup, ({isRefreshing}: WorkgroupState) => isRefreshing);
export const selectIsLoading = createSelector(selectWorkgroup, ({isLoading}: WorkgroupState) => isLoading);
export const selectIsCreate = createSelector(selectWorkgroup, ({isCreate}: WorkgroupState) => isCreate);
export const selectIsSaving = createSelector(selectWorkgroup, ({isSaving}: WorkgroupState) => isSaving);
