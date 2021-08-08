import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { IntegrationAccountsState } from './integration-accounts.reducer';

export const selectIntegrationAccount = (state: AppState) => state.integrationAccountsState;
export const selectAllIdentitiesAndWorkgroups = (state: AppState) => state.integrationAccountsState.allIdentitiesAndWorkgroups;
export const selectGeneralWorkflowSettings = (state: AppState) => state.generalWorkflowSettings.settings;
export const selectIntegrationSettings = (state: AppState) => state.integrationState.settings;

export const selectItems = createSelector(selectIntegrationAccount, ({items}: IntegrationAccountsState) => items);
export const selectTotalItemsCount = createSelector(selectIntegrationAccount, ({totalItemsCount}: IntegrationAccountsState) => totalItemsCount);
export const selectPage = createSelector(selectIntegrationAccount, ({page}: IntegrationAccountsState) => page);
export const selectPerPage = createSelector(selectIntegrationAccount, ({perPage}: IntegrationAccountsState) => perPage);
export const selectAdditionalObjectProperties = createSelector(selectIntegrationAccount, ({additionalPropertyObjects}: IntegrationAccountsState) => additionalPropertyObjects);
export const selectAllIdentitiesWorkgroups = createSelector(selectIntegrationAccount, ({allIdentitiesAndWorkgroups}: IntegrationAccountsState) => allIdentitiesAndWorkgroups);
export const selectTargets = createSelector(selectIntegrationAccount, ({targets}: IntegrationAccountsState) => targets);
export const selectAccountEntitlements = createSelector(selectIntegrationAccount, ({accountEntitlements}: IntegrationAccountsState) => accountEntitlements);

export const selectConfig = createSelector(
  selectAllIdentitiesAndWorkgroups,
  selectGeneralWorkflowSettings,
  selectIntegrationSettings,
  (
    allIdentitiesAndWorkgroups,
    generalWorkflowSettings,
    integrationSettings
  ) => {
    if (allIdentitiesAndWorkgroups && generalWorkflowSettings && integrationSettings) {
      return {
        allIdentitiesAndWorkgroups,
        generalWorkflowSettings,
        integrationSettings
      };
    }
  });
