import { AppState } from '@store/app.state';
import { createSelector } from '@ngrx/store';
import { ViolationsState } from '@states/violations/violations.reducer';

export const selectViolations = (state: AppState) => state.violationsState;

export const selectItems = createSelector(selectViolations, ({items}: ViolationsState) => items);
export const selectSelectedConfiguration = createSelector(selectViolations, ({selectedConfiguration}: ViolationsState) => selectedConfiguration);
export const selectSelectedConfigurationId = createSelector(selectViolations, ({selectedConfigurationId}: ViolationsState) => selectedConfigurationId);
export const selectTotalItemsCount = createSelector(selectViolations, ({totalItemsCount}: ViolationsState) => totalItemsCount);
export const selectPage = createSelector(selectViolations, ({page}: ViolationsState) => page);
export const selectPerPage = createSelector(selectViolations, ({perPage}: ViolationsState) => perPage);
export const selectChartData = createSelector(selectViolations, ({chartData}: ViolationsState) => chartData);
export const selectGridData = createSelector(selectViolations, ({gridData}: ViolationsState) => gridData);
export const selectGridPerPage = createSelector(selectViolations, ({gridPerPage}: ViolationsState) => gridPerPage);
export const selectGridSkip = createSelector(selectViolations, ({gridSkip}: ViolationsState) => gridSkip);
export const selectViolationSettingsForm = createSelector(selectViolations, ({violationSettingsForm}: ViolationsState) => violationSettingsForm);
export const selectViolationSettingsFormLoaded = createSelector(selectViolations, ({isViolationSettingsLoaded}: ViolationsState) => isViolationSettingsLoaded);
