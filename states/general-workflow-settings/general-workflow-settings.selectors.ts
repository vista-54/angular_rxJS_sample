import { GeneralWorkflowSettingsState } from './general-workflow-settings.reducer';
import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GeneralWorkflowSetting } from 'src/app/pages/identity-automation/pages/integration/models/settings.model';

export const selectGeneralWorkflowSettingsState = (state: AppState) => state.generalWorkflowSettings;
export const selectGeneralWorkflowSettings = (state: AppState) => state.generalWorkflowSettings.settings;

export const selectGeneralWorkflowState = createSelector(selectGeneralWorkflowSettingsState, (state: GeneralWorkflowSettingsState) => state);
export const selectSettings = createSelector(selectGeneralWorkflowSettingsState, ({settings}: GeneralWorkflowSettingsState) => settings);
export const selectAllIdentitiesAndWorkgroups = createSelector(selectGeneralWorkflowSettingsState, ({allIdentitiesAndWorkgroups}: GeneralWorkflowSettingsState) => allIdentitiesAndWorkgroups);
export const selectRootOwner = createSelector(selectGeneralWorkflowSettings, ({rootOwner}: GeneralWorkflowSetting) => rootOwner);
