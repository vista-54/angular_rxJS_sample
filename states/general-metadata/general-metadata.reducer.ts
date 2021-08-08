import { createReducer, on } from '@ngrx/store';
import * as GeneralMetadataActions from '../general-metadata/general-metadata.actions';
import { DashboardApexUrls, Encoding, GeneralMetaData, Strategy } from '../../../models/generalMetaData.model';

export interface GeneralMetadataState {
  assignmentRuleSignature: string;
  tenantName: string;
  logoutUrl: string;
  loggedInUsername: string;
  identityAutomation: string;
  identityIntelligence: string;
  authenticationProviderMain: string;
  authenticationProviderProfile: string;
  awx: string;
  identityGovernance: string;
  companyAdmin: string;
  globalAdmin: string;
  liveScreenshots: string;
  accountTypes: string[];
  correlationRuleSignature: string;
  customizationRuleSignature: string;
  provisioningRuleSignature: string;
  nameProvisioningRuleSignature: string;

  joinerRuleSignature: string;
  moverRuleSignature: string;
  leaverRuleSignature: string;
  reinstatementRuleSignature: string;
  identityAttributesMappingRuleSignature: string;
  terminationRuleSignature: string;

  // Rest Api
  restApiCreateAccountRuleSignature: string;
  restApiDeleteAccountRuleSignature: string;
  restApiGetActiveLoginsRuleSignature: string;
  restApiGetBlackListRuleSignature: string;
  restApiGetBlacklistedLoginAttemptsRuleSignature: string;
  restApiGetCustomAuthHeaderRuleSignature: string;
  restApiGetIntegrationDataRuleSignature: string;
  restApiGetMetadataRuleSignature: string;
  restApiLockAccountRuleSignature: string;
  restApiSetBlackListRuleSignature: string;
  restApiUnlockAccountRuleSignature: string;
  restApiUpdateAccountAdditionalPropertiesRuleSignature: string;
  restApiUpdateAccountCredentialsRuleSignature: string;
  restApiUpdateAccountEntitlementsDeltaRuleSignature: string;

  onboardingApprovalStrategies: Strategy[];
  transferApprovalStrategies: Strategy[];
  offboardingApprovalStrategies: Strategy[];
  permanentAccessRequestApprovalStrategies: Strategy[];
  temporaryAccessRequestApprovalStrategies: Strategy[];
  privilegedUnlockRequestApprovalStrategies: Strategy[];
  firecallUnlockRequestApprovalStrategies: Strategy[];
  roleCreationApprovalStrategies: Strategy[];
  roleUpdateApprovalStrategies: Strategy[];
  roleDeletionApprovalStrategies: Strategy[];
  menu: any;
  companyAdministrationScreenshotSettings: string;
  companyAdministrationViolationsSettings: string;
  dignosticsUrl: string;
  isDevelopmentEnvironment: boolean;
  dashboardApexUrls: DashboardApexUrls;
  privileges: any;
  globalLeaverRuleSignature: string;
  globalLeaverRuleSignatureCompilation: string;
  globalLeaverRuleSignatureCompilationSuccess: boolean;
  isCompilation: boolean;
  encodings: Encoding[];
  csvGetMetadataRuleSignature: string;
  csvGetIntegrationDataRuleSignature: string;
  descriptionLookup: { [key: string]: string };
}

export const initialState: GeneralMetadataState = {
  assignmentRuleSignature: null,
  tenantName: null,
  logoutUrl: null,
  loggedInUsername: null,
  identityAutomation: null,
  identityIntelligence: null,
  authenticationProviderMain: null,
  authenticationProviderProfile: null,
  awx: null,
  identityGovernance: null,
  companyAdmin: null,
  globalAdmin: null,
  liveScreenshots: null,
  accountTypes: null,
  correlationRuleSignature: null,
  customizationRuleSignature: null,
  provisioningRuleSignature: null,
  nameProvisioningRuleSignature: null,
  onboardingApprovalStrategies: null,

  joinerRuleSignature: null,
  moverRuleSignature: null,
  leaverRuleSignature: null,
  reinstatementRuleSignature: null,
  identityAttributesMappingRuleSignature: null,
  terminationRuleSignature: null,

  // Rest Api
  restApiCreateAccountRuleSignature: null,
  restApiDeleteAccountRuleSignature: null,
  restApiGetActiveLoginsRuleSignature: null,
  restApiGetBlackListRuleSignature: null,
  restApiGetBlacklistedLoginAttemptsRuleSignature: null,
  restApiGetCustomAuthHeaderRuleSignature: null,
  restApiGetIntegrationDataRuleSignature: null,
  restApiGetMetadataRuleSignature: null,
  restApiLockAccountRuleSignature: null,
  restApiSetBlackListRuleSignature: null,
  restApiUnlockAccountRuleSignature: null,
  restApiUpdateAccountAdditionalPropertiesRuleSignature: null,
  restApiUpdateAccountCredentialsRuleSignature: null,
  restApiUpdateAccountEntitlementsDeltaRuleSignature: null,

  transferApprovalStrategies: null,
  offboardingApprovalStrategies: null,
  permanentAccessRequestApprovalStrategies: [],
  temporaryAccessRequestApprovalStrategies: [],
  privilegedUnlockRequestApprovalStrategies: [],
  firecallUnlockRequestApprovalStrategies: [],
  roleCreationApprovalStrategies: [],
  roleUpdateApprovalStrategies: [],
  roleDeletionApprovalStrategies: [],
  menu: null,
  companyAdministrationScreenshotSettings: null,
  companyAdministrationViolationsSettings: null,
  dignosticsUrl: null,
  isDevelopmentEnvironment: null,
  dashboardApexUrls: null,
  privileges: [],
  globalLeaverRuleSignature: null,
  globalLeaverRuleSignatureCompilation: null,
  globalLeaverRuleSignatureCompilationSuccess: null,
  isCompilation: null,
  encodings: null,
  csvGetMetadataRuleSignature: null,
  csvGetIntegrationDataRuleSignature: null,
  descriptionLookup: null
};


export const generalMetadataStateReducer = createReducer(
  initialState,
  on(
    GeneralMetadataActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    GeneralMetadataActions.setGlobalLeaverRuleSignatureCompilation,
    (state, {text, success}) => ({
      ...state,
      globalLeaverRuleSignatureCompilation: text,
      globalLeaverRuleSignatureCompilationSuccess: success
    })
  ),
  on(
    GeneralMetadataActions.setCompilationStatus,
    (state, {compilation}) => ({
      ...state,
      isCompilation: compilation
    })
  ),
  on(
    GeneralMetadataActions.setGeneralMetadata,
    (state, {generalMetadata}) => (
      {
        ...state,
        assignmentRuleSignature: generalMetadata.assignmentRuleSignature,
        tenantName: generalMetadata.tenantName,
        logoutUrl: generalMetadata.logoutUrl,
        loggedInUsername: generalMetadata.loggedInUsername,
        identityAutomation: generalMetadata.crossAppUrls.identityAutomation,
        identityIntelligence: generalMetadata.crossAppUrls.identityIntelligence,
        authenticationProviderMain: generalMetadata.crossAppUrls.authenticationProviderMain,
        authenticationProviderProfile: generalMetadata.crossAppUrls.authenticationProviderProfile,
        companyAdministrationScreenshotSettings: generalMetadata.crossAppUrls.companyAdministrationScreenshotSettings,
        companyAdministrationViolationsSettings: generalMetadata.crossAppUrls.companyAdministrationViolationsSettings,
        awx: generalMetadata.crossAppUrls.awx,
        identityGovernance: generalMetadata.crossAppUrls.identityGovernance,
        companyAdmin: generalMetadata.crossAppUrls.companyAdmin,
        globalAdmin: generalMetadata.crossAppUrls.globalAdmin,
        liveScreenshots: generalMetadata.crossAppUrls.liveScreenshots,
        accountTypes: generalMetadata.accountTypes,
        correlationRuleSignature: generalMetadata.correlationRuleSignature,
        customizationRuleSignature: generalMetadata.customizationRuleSignature,
        provisioningRuleSignature: generalMetadata.provisioningRuleSignature,
        nameProvisioningRuleSignature: generalMetadata.nameProvisioningRuleSignature,

        joinerRuleSignature: generalMetadata.joinerRuleSignature,
        moverRuleSignature: generalMetadata.moverRuleSignature,
        leaverRuleSignature: generalMetadata.leaverRuleSignature,
        reinstatementRuleSignature: generalMetadata.reinstatementRuleSignature,
        identityAttributesMappingRuleSignature: generalMetadata.identityAttributesMappingRuleSignature,
        terminationRuleSignature: generalMetadata.terminationRuleSignature,

        restApiCreateAccountRuleSignature: generalMetadata.restApiCreateAccountRuleSignature,
        restApiDeleteAccountRuleSignature: generalMetadata.restApiDeleteAccountRuleSignature,
        restApiGetActiveLoginsRuleSignature: generalMetadata.restApiGetActiveLoginsRuleSignature,
        restApiGetBlackListRuleSignature: generalMetadata.restApiGetBlackListRuleSignature,
        restApiGetBlacklistedLoginAttemptsRuleSignature: generalMetadata.restApiGetBlacklistedLoginAttemptsRuleSignature,
        restApiGetCustomAuthHeaderRuleSignature: generalMetadata.restApiGetCustomAuthHeaderRuleSignature,
        restApiGetIntegrationDataRuleSignature: generalMetadata.restApiGetIntegrationDataRuleSignature,
        restApiGetMetadataRuleSignature: generalMetadata.restApiGetMetadataRuleSignature,
        restApiLockAccountRuleSignature: generalMetadata.restApiLockAccountRuleSignature,
        restApiSetBlackListRuleSignature: generalMetadata.restApiSetBlackListRuleSignature,
        restApiUnlockAccountRuleSignature: generalMetadata.restApiUnlockAccountRuleSignature,
        restApiUpdateAccountAdditionalPropertiesRuleSignature: generalMetadata.restApiUpdateAccountAdditionalPropertiesRuleSignature,
        restApiUpdateAccountCredentialsRuleSignature: generalMetadata.restApiUpdateAccountCredentialsRuleSignature,
        restApiUpdateAccountEntitlementsDeltaRuleSignature: generalMetadata.restApiUpdateAccountEntitlementsDeltaRuleSignature,

        transferApprovalStrategies: generalMetadata.transferApprovalStrategies,
        onboardingApprovalStrategies: generalMetadata.onboardingApprovalStrategies,
        offboardingApprovalStrategies: generalMetadata.offboardingApprovalStrategies,


        permanentAccessRequestApprovalStrategies: generalMetadata.permanentAccessRequestApprovalStrategies,
        temporaryAccessRequestApprovalStrategies: generalMetadata.temporaryAccessRequestApprovalStrategies,

        privilegedUnlockRequestApprovalStrategies: generalMetadata.privilegedUnlockRequestApprovalStrategies,
        firecallUnlockRequestApprovalStrategies: generalMetadata.firecallUnlockRequestApprovalStrategies,
        roleCreationApprovalStrategies: generalMetadata.roleCreationApprovalStrategies,
        roleUpdateApprovalStrategies: generalMetadata.roleUpdateApprovalStrategies,
        roleDeletionApprovalStrategies: generalMetadata.roleDeletionApprovalStrategies,
        dignosticsUrl: generalMetadata.dignosticsUrl,
        isDevelopmentEnvironment: generalMetadata.isDevelopmentEnvironment,
        dashboardApexUrls: generalMetadata.dashboardApexUrls,
        privileges: generalMetadata.privileges,
        globalLeaverRuleSignature: generalMetadata.globalLeaverRuleSignature,
        encodings: generalMetadata.encodings,
        csvGetMetadataRuleSignature: generalMetadata.csvGetMetadataRuleSignature,
        csvGetIntegrationDataRuleSignature: generalMetadata.csvGetIntegrationDataRuleSignature,

        descriptionLookup: generateDescriptionLookup(generalMetadata)
      })
  )
);

const generateDescriptionLookup = (generalMetaData: GeneralMetaData): { [key: string]: string } => {
  const lookup: { [key: string]: string } = {};
  generalMetaData.transferApprovalStrategies.forEach(item => {
    lookup[item.key] = item.description;
  });
  generalMetaData.onboardingApprovalStrategies.forEach(item => {
    lookup[item.key] = item.description;
  });
  generalMetaData.offboardingApprovalStrategies.forEach(item => {
    lookup[item.key] = item.description;
  });
  return lookup;
};


