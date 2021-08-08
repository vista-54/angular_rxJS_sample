import { createSelector } from '@ngrx/store';
import { AssignedAccessState } from './assigned-access.reducer';
import { AppState } from '../../app.state';

export const selectAssignedAccess = (state: AppState) => state.assignedAccessState;


export const selectItems = createSelector(selectAssignedAccess, ({items}: AssignedAccessState) => items);
export const selectTotalItemsCount = createSelector(selectAssignedAccess, ({totalItemsCount}: AssignedAccessState) => totalItemsCount);
export const selectPage = createSelector(selectAssignedAccess, ({page}: AssignedAccessState) => page);
export const selectPerPage = createSelector(selectAssignedAccess, ({perPage}: AssignedAccessState) => perPage);
export const selectSearchQuery = createSelector(selectAssignedAccess, ({query}: AssignedAccessState) => query);
