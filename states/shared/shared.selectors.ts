import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { SharedState } from './shared.reducer';

export const selectShared = (state: AppState) => state.sharedState;

export const selectGeneralMetadata = (state: AppState) => state.generalMetadataState.tenantName;
export const selectApexUrl = (state: AppState) => state.generalMetadataState.identityIntelligence;
export const selectGeneralWorkflowSettings = (state: AppState) => state.generalWorkflowSettings.settings;
export const selectIntegrationSettings = (state: AppState) => state.integrationState.integrations;

export const selectBusyState = createSelector(selectShared, ({busy}: SharedState) => busy);
export const selectPrivileges = createSelector(selectShared, ({privileges}: SharedState) => privileges);
export const selectExpand = createSelector(selectShared, ({expand}: SharedState) => expand);
export const selectTitle = createSelector(selectShared, ({title}: SharedState) => title);
export const selectIsSaving = createSelector(selectShared, ({isSaving}: SharedState) => isSaving);


export const selectApplicationLodaded = createSelector(
    selectGeneralMetadata,
    selectGeneralWorkflowSettings,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (selectGeneralMetadata, selectGeneralWorkflowSettings) => {
        if (selectGeneralMetadata
            && selectGeneralWorkflowSettings) {
            return true;
        }
    });

export const selectPrivilegesForIntelligence = createSelector(
    selectApexUrl,
    selectPrivileges,
    (apexUrl, privileges) => {
        if (apexUrl
            && privileges) {
            return {
                privileges,
                apexUrl
            };
        }
    });
