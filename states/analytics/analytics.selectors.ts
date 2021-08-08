/* tslint:disable:max-line-length */
import { AppState } from '@store/app.state';
import { createSelector } from '@ngrx/store';
import { AnalyticsState } from '@states/analytics/analytics.reducer';

export const selectAnalytics = (state: AppState) => state.analyticsState;

export const selectItems = createSelector(selectAnalytics, ({items}: AnalyticsState) => items);
export const selectMetadata = createSelector(selectAnalytics, ({metadata}: AnalyticsState) => metadata);
export const selectSelectedConfiguration = createSelector(selectAnalytics, ({selectedConfiguration}: AnalyticsState) => selectedConfiguration);
export const selectSelectedConfigurationId = createSelector(selectAnalytics, ({selectedConfigurationId}: AnalyticsState) => selectedConfigurationId);
export const selectTotalItemsCount = createSelector(selectAnalytics, ({totalItemsCount}: AnalyticsState) => totalItemsCount);
export const selectPage = createSelector(selectAnalytics, ({page}: AnalyticsState) => page);
export const selectPerPage = createSelector(selectAnalytics, ({perPage}: AnalyticsState) => perPage);
export const selectIsEdited = createSelector(selectAnalytics, ({isEdited}: AnalyticsState) => isEdited);
export const selectGridData = createSelector(selectAnalytics, ({gridData}: AnalyticsState) => gridData);
export const selectCloneMode = createSelector(selectAnalytics, ({isCloneMode}: AnalyticsState) => isCloneMode);
export const selectCloneId = createSelector(selectAnalytics, ({cloneConfigurationId}: AnalyticsState) => cloneConfigurationId);
export const selectViewModeDefaultView = createSelector(selectAnalytics, ({viewModeDefaultView}: AnalyticsState) => viewModeDefaultView);
export const selectChartData = createSelector(selectAnalytics, ({chartData}: AnalyticsState) => chartData);
export const selectIsValid = createSelector(selectAnalytics, ({isConfigurationValid}: AnalyticsState) => isConfigurationValid);
export const selectValidationMsg = createSelector(selectAnalytics, ({validationErrorText}: AnalyticsState) => validationErrorText);
export const selectGridPerPage = createSelector(selectAnalytics, ({gridPerPage}: AnalyticsState) => gridPerPage);
export const selectGridSkip = createSelector(selectAnalytics, ({gridSkip}: AnalyticsState) => gridSkip);
export const selectColumnNameColumnTypeLookup = createSelector(selectAnalytics, ({columnNameColumnTypeLookup}: AnalyticsState) => columnNameColumnTypeLookup);
export const selectIsViolationCloned = createSelector(selectAnalytics, ({isViolationCloned}: AnalyticsState) => isViolationCloned);
export const isGridError = createSelector(selectAnalytics, ({gridError}: AnalyticsState) => gridError);
export const filters = createSelector(selectAnalytics, ({filters}: AnalyticsState) => filters);

export const colNamesLookup = createSelector(selectAnalytics, ({colNamesLookup}: AnalyticsState) => colNamesLookup);
export const colNamesColTypeLookup = createSelector(selectAnalytics, ({colNamesColTypeLookup}: AnalyticsState) => colNamesColTypeLookup);


export const selectConfig = createSelector(
  selectSelectedConfiguration,
  selectMetadata,
  (
    selectedConfiguration,
    metadata,
  ) => {
    if (selectedConfiguration && metadata) {
      return {
        selectedConfiguration,
        metadata
      };
    }
  });

export const selectCloneConfig = createSelector(
  selectCloneMode,
  selectCloneId,
  selectIsViolationCloned,
  (
    cloneMode,
    cloneId,
    isViolationCloned
  ) => {
    if (cloneId) {
      return {
        cloneMode,
        cloneId,
        isViolationCloned
      };
    }
  });


export const selectConfigurationIdCloneMode = createSelector(
  selectSelectedConfigurationId,
  selectCloneMode,
  (
    configurationId,
    cloneMode,
  ) => {
    if (configurationId) {
      return {
        configurationId,
        cloneMode
      };
    }
  });

export const selectConfigurationViewMode = createSelector(
  selectSelectedConfiguration,
  selectViewModeDefaultView,
  selectIsEdited,
  (
    selectedConfiguration,
    viewMode,
    isEdited
  ) => {
    if (selectedConfiguration && viewMode && isEdited !== null) {
      return {
        selectedConfiguration,
        viewMode,
        isEdited
      };
    }
  });

export const selectConfigurationAndIsEdited = createSelector(
  selectSelectedConfiguration,
  selectIsEdited,
  (
    selectedConfiguration,
    isEdited
  ) => {
    if (selectedConfiguration && isEdited !== null) {
      return {
        selectedConfiguration,
        isEdited
      };
    }
  });

