import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GeneralMetadataState } from './general-metadata.reducer';


export const selectGeneralMetadata = (state: AppState) => state.generalMetadataState;

export const selectAssignmentRuleSignature = createSelector(selectGeneralMetadata, ({assignmentRuleSignature}: GeneralMetadataState) => assignmentRuleSignature);
export const selectTenantName = createSelector(selectGeneralMetadata, ({tenantName}: GeneralMetadataState) => tenantName);
export const selectLoggedInUsername = createSelector(selectGeneralMetadata, ({loggedInUsername}: GeneralMetadataState) => loggedInUsername);
export const selectLogoutUrl = createSelector(selectGeneralMetadata, ({logoutUrl}: GeneralMetadataState) => logoutUrl);
export const selectAccess360Url = createSelector(selectGeneralMetadata, ({identityAutomation}: GeneralMetadataState) => identityAutomation);
export const selectGlobalAdminUrl = createSelector(selectGeneralMetadata, ({globalAdmin}: GeneralMetadataState) => globalAdmin);
export const selectCompanyAdminUrl = createSelector(selectGeneralMetadata, ({companyAdmin}: GeneralMetadataState) => companyAdmin);
export const selectHomeUrl = createSelector(selectGeneralMetadata, ({authenticationProviderMain}: GeneralMetadataState) => authenticationProviderMain);
export const selectProfileUrl = createSelector(selectGeneralMetadata, ({authenticationProviderProfile}: GeneralMetadataState) => authenticationProviderProfile);
export const selectApexUrl = createSelector(selectGeneralMetadata, ({identityIntelligence}: GeneralMetadataState) => identityIntelligence);
export const selectCertificationUrl = createSelector(selectGeneralMetadata, ({identityGovernance}: GeneralMetadataState) => identityGovernance);
export const selectLiveScreenshotsUrl = createSelector(selectGeneralMetadata, ({liveScreenshots}: GeneralMetadataState) => liveScreenshots);
export const selectAccountTypes = createSelector(selectGeneralMetadata, ({accountTypes}: GeneralMetadataState) => accountTypes);
export const selectCorrelationRuleSignature = createSelector(selectGeneralMetadata, ({correlationRuleSignature}: GeneralMetadataState) => correlationRuleSignature);
export const selectCustomizationRuleSignature = createSelector(selectGeneralMetadata, ({customizationRuleSignature}: GeneralMetadataState) => customizationRuleSignature);
export const selectProvisioningRuleSignature = createSelector(selectGeneralMetadata, ({provisioningRuleSignature}: GeneralMetadataState) => provisioningRuleSignature);
export const selectNameProvisioningRuleSignature = createSelector(selectGeneralMetadata, ({nameProvisioningRuleSignature}: GeneralMetadataState) => nameProvisioningRuleSignature);
export const selectOnboardingApprovalStrategies = createSelector(selectGeneralMetadata, ({onboardingApprovalStrategies}: GeneralMetadataState) => onboardingApprovalStrategies);

export const selectJoinerRuleSignature = createSelector(selectGeneralMetadata, ({joinerRuleSignature}: GeneralMetadataState) => joinerRuleSignature);
export const selectMoverRuleSignature = createSelector(selectGeneralMetadata, ({moverRuleSignature}: GeneralMetadataState) => moverRuleSignature);
export const leaverRuleSignature = createSelector(selectGeneralMetadata, ({leaverRuleSignature}: GeneralMetadataState) => leaverRuleSignature);
export const reinstatementRuleSignature = createSelector(selectGeneralMetadata, ({reinstatementRuleSignature}: GeneralMetadataState) => reinstatementRuleSignature);
export const identityAttributesMappingRuleSignature = createSelector(selectGeneralMetadata, ({identityAttributesMappingRuleSignature}: GeneralMetadataState) => identityAttributesMappingRuleSignature);
export const terminationRuleSignature = createSelector(selectGeneralMetadata, ({terminationRuleSignature}: GeneralMetadataState) => terminationRuleSignature);

export const selectDescriptionLookup = createSelector(selectGeneralMetadata, ({descriptionLookup}: GeneralMetadataState) => descriptionLookup);

export const restApiCreateAccountRuleSignature = createSelector(selectGeneralMetadata, ({restApiCreateAccountRuleSignature}: GeneralMetadataState) => restApiCreateAccountRuleSignature);
export const restApiDeleteAccountRuleSignature = createSelector(selectGeneralMetadata, ({restApiDeleteAccountRuleSignature}: GeneralMetadataState) => restApiDeleteAccountRuleSignature);
export const restApiGetActiveLoginsRuleSignature = createSelector(selectGeneralMetadata, ({restApiGetActiveLoginsRuleSignature}: GeneralMetadataState) => restApiGetActiveLoginsRuleSignature);
export const restApiGetBlackListRuleSignature = createSelector(selectGeneralMetadata, ({restApiGetBlackListRuleSignature}: GeneralMetadataState) => restApiGetBlackListRuleSignature);
export const restApiGetBlacklistedLoginAttemptsRuleSignature = createSelector(selectGeneralMetadata, ({restApiGetBlacklistedLoginAttemptsRuleSignature}: GeneralMetadataState) => restApiGetBlacklistedLoginAttemptsRuleSignature);
export const restApiGetCustomAuthHeaderRuleSignature = createSelector(selectGeneralMetadata, ({restApiGetCustomAuthHeaderRuleSignature}: GeneralMetadataState) => restApiGetCustomAuthHeaderRuleSignature);
export const restApiGetIntegrationDataRuleSignature = createSelector(selectGeneralMetadata, ({restApiGetIntegrationDataRuleSignature}: GeneralMetadataState) => restApiGetIntegrationDataRuleSignature);

export const restApiGetMetadataRuleSignature = createSelector(selectGeneralMetadata, ({restApiGetMetadataRuleSignature}: GeneralMetadataState) => restApiGetMetadataRuleSignature);
export const restApiLockAccountRuleSignature = createSelector(selectGeneralMetadata, ({restApiLockAccountRuleSignature}: GeneralMetadataState) => restApiLockAccountRuleSignature);
export const restApiSetBlackListRuleSignature = createSelector(selectGeneralMetadata, ({restApiSetBlackListRuleSignature}: GeneralMetadataState) => restApiSetBlackListRuleSignature);
export const restApiUnlockAccountRuleSignature = createSelector(selectGeneralMetadata, ({restApiUnlockAccountRuleSignature}: GeneralMetadataState) => restApiUnlockAccountRuleSignature);
export const restApiUpdateAccountAdditionalPropertiesRuleSignature = createSelector(selectGeneralMetadata, ({restApiUpdateAccountAdditionalPropertiesRuleSignature}: GeneralMetadataState) => restApiUpdateAccountAdditionalPropertiesRuleSignature);
export const restApiUpdateAccountCredentialsRuleSignature = createSelector(selectGeneralMetadata, ({restApiUpdateAccountCredentialsRuleSignature}: GeneralMetadataState) => restApiUpdateAccountCredentialsRuleSignature);
export const restApiUpdateAccountEntitlementsDeltaRuleSignature = createSelector(selectGeneralMetadata, ({restApiUpdateAccountEntitlementsDeltaRuleSignature}: GeneralMetadataState) => restApiUpdateAccountEntitlementsDeltaRuleSignature);

export const selectTransferApprovalStrategies = createSelector(selectGeneralMetadata, ({transferApprovalStrategies}: GeneralMetadataState) => transferApprovalStrategies);
export const selectOffboardingApprovalStrategies = createSelector(selectGeneralMetadata, ({offboardingApprovalStrategies}: GeneralMetadataState) => offboardingApprovalStrategies);
export const selectPermanentAccessRequestApprovalStrategies = createSelector(selectGeneralMetadata, ({permanentAccessRequestApprovalStrategies}: GeneralMetadataState) => permanentAccessRequestApprovalStrategies);
export const selectTemporaryAccessRequestApprovalStrategies = createSelector(selectGeneralMetadata, ({temporaryAccessRequestApprovalStrategies}: GeneralMetadataState) => temporaryAccessRequestApprovalStrategies);
export const selectPrivilegedUnlockRequestApprovalStrategies = createSelector(selectGeneralMetadata, ({privilegedUnlockRequestApprovalStrategies}: GeneralMetadataState) => privilegedUnlockRequestApprovalStrategies);
export const selectFirecallUnlockRequestApprovalStrategies = createSelector(selectGeneralMetadata, ({firecallUnlockRequestApprovalStrategies}: GeneralMetadataState) => firecallUnlockRequestApprovalStrategies);
export const selectRoleCreationApprovalStrategies = createSelector(selectGeneralMetadata, ({roleCreationApprovalStrategies}: GeneralMetadataState) => roleCreationApprovalStrategies);
export const selectRoleUpdateRequestApprovalStrategies = createSelector(selectGeneralMetadata, ({roleUpdateApprovalStrategies}: GeneralMetadataState) => roleUpdateApprovalStrategies);
export const selectRoleDeletionRequestApprovalStrategies = createSelector(selectGeneralMetadata, ({roleDeletionApprovalStrategies}: GeneralMetadataState) => roleDeletionApprovalStrategies);
export const selectMenu = createSelector(selectGeneralMetadata, ({menu}: GeneralMetadataState) => menu);
export const selectIsDevelopmentEnvironment = createSelector(selectGeneralMetadata, ({isDevelopmentEnvironment}: GeneralMetadataState) => isDevelopmentEnvironment);
export const selectDignosticsUrl = createSelector(selectGeneralMetadata, ({dignosticsUrl}: GeneralMetadataState) => dignosticsUrl);
export const dashboardApexUrls = createSelector(selectGeneralMetadata, ({dashboardApexUrls}: GeneralMetadataState) => dashboardApexUrls);
export const selectPrivileges = createSelector(selectGeneralMetadata, ({privileges}: GeneralMetadataState) => privileges);
export const selectGlobalLeaverRuleSignature = createSelector(selectGeneralMetadata, ({globalLeaverRuleSignature}: GeneralMetadataState) => globalLeaverRuleSignature);
export const globalLeaverRuleSignatureCompilation = createSelector(selectGeneralMetadata, ({globalLeaverRuleSignatureCompilation}: GeneralMetadataState) => globalLeaverRuleSignatureCompilation);
export const globalLeaverRuleSignatureCompilationSuccess = createSelector(selectGeneralMetadata, ({globalLeaverRuleSignatureCompilationSuccess}: GeneralMetadataState) => globalLeaverRuleSignatureCompilationSuccess);
export const globalLeaverRuleSignatureIsCompilation = createSelector(selectGeneralMetadata, ({isCompilation}: GeneralMetadataState) => isCompilation);
export const selectEncoding = createSelector(selectGeneralMetadata, ({encodings}: GeneralMetadataState) => encodings);
export const selectCsvGetMetadataRuleSignature = createSelector(selectGeneralMetadata, ({csvGetMetadataRuleSignature}: GeneralMetadataState) => csvGetMetadataRuleSignature);
export const selectCsvGetIntegrationDataRuleSignature = createSelector(selectGeneralMetadata, ({csvGetIntegrationDataRuleSignature}: GeneralMetadataState) => csvGetIntegrationDataRuleSignature);


