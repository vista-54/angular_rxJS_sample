/* tslint:disable:max-line-length */
import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { IntegrationState } from './integration.reducer';

export const selectIntegration = (state: AppState) => state.integrationState;
export const selectAllIdentitiesAndWorkgroups = (state: AppState) => state.generalWorkflowSettings.allIdentitiesAndWorkgroups;
export const selectGeneralWorkflowSettings = (state: AppState) => state.generalWorkflowSettings.settings;

export const selectIntegrations = createSelector(selectIntegration, ({integrations}: IntegrationState) => integrations);
export const selectTotalItemsCount = createSelector(selectIntegration, ({totalItemsCount}: IntegrationState) => totalItemsCount);
export const selectPage = createSelector(selectIntegration, ({page}: IntegrationState) => page);
export const selectPerPage = createSelector(selectIntegration, ({perPage}: IntegrationState) => perPage);
export const integrationLoader = createSelector(selectIntegration, ({integrationLoader}: IntegrationState) => integrationLoader);
export const validationCalled = createSelector(selectIntegration, ({validationCalled}: IntegrationState) => validationCalled);

export const selectSettings = createSelector(selectIntegration, ({settings}: IntegrationState) => settings);
export const selectMetadata = createSelector(selectIntegration, ({metadata}: IntegrationState) => metadata);
export const selectSelectedIntegrationId = createSelector(selectIntegration, ({selectedIntegrationId}: IntegrationState) => selectedIntegrationId);
export const selectedIntegration = createSelector(selectIntegration, ({selectedIntegration}: IntegrationState) => selectedIntegration);
export const selectedAwsForm = createSelector(selectIntegration, ({selectedIntegrationAWSForm}: IntegrationState) => selectedIntegrationAWSForm);
export const selectedIntegrationAzureAdForm = createSelector(selectIntegration, ({selectedIntegrationAzureAdForm}: IntegrationState) => selectedIntegrationAzureAdForm);
export const selectedIntegrationGoogleForm = createSelector(selectIntegration, ({selectedIntegrationGoogleForm}: IntegrationState) => selectedIntegrationGoogleForm);
export const selectedIntegrationOracleForm = createSelector(selectIntegration, ({selectedIntegrationOracleForm}: IntegrationState) => selectedIntegrationOracleForm);
export const selectedIntegrationMssqlForm = createSelector(selectIntegration, ({selectedIntegrationMssqlForm}: IntegrationState) => selectedIntegrationMssqlForm);
export const selectedIntegrationPeoplesoftForm = createSelector(selectIntegration, ({selectedIntegrationPeoplesoftForm}: IntegrationState) => selectedIntegrationPeoplesoftForm);
export const selectedIntegrationLinuxForm = createSelector(selectIntegration, ({selectedIntegrationLinuxForm}: IntegrationState) => selectedIntegrationLinuxForm);
export const selectedIntegrationRdpForm = createSelector(selectIntegration, ({selectedIntegrationRdpForm}: IntegrationState) => selectedIntegrationRdpForm);
export const selectedIntegrationCsvForm = createSelector(selectIntegration, ({selectedIntegrationCsvForm}: IntegrationState) => selectedIntegrationCsvForm);
export const selectedIntegrationEbsForm = createSelector(selectIntegration, ({selectedIntegrationEbsForm}: IntegrationState) => selectedIntegrationEbsForm);
export const selectedIntegrationRestApiForm = createSelector(selectIntegration, ({selectedIntegrationRestApiForm}: IntegrationState) => selectedIntegrationRestApiForm);

export const selectTargets = createSelector(selectIntegration, ({targets}: IntegrationState) => targets);
export const selectTargetEntitlementTypes = createSelector(selectIntegration, ({targetEntitlementTypes}: IntegrationState) => targetEntitlementTypes);
export const selectAdditionalPropertyObjectTypes = createSelector(selectIntegration, ({additionalPropertyObjectTypes}: IntegrationState) => additionalPropertyObjectTypes);
export const selectEnvType = createSelector(selectIntegration, ({envType}: IntegrationState) => envType);
export const selectTargetsLookup = createSelector(selectIntegration, ({targetsLookup}: IntegrationState) => targetsLookup);
export const selectAllIntegrationIdentitiesAndWorkgroups = createSelector(selectIntegration, ({allIdentitiesAndWorkgroups}: IntegrationState) => allIdentitiesAndWorkgroups);
export const selectAreBlackWhiteListsSupported = createSelector(selectIntegration, ({areBlackWhiteListsSupported}: IntegrationState) => areBlackWhiteListsSupported);
export const selectIsBlackWhiteListPropertiesVisible = createSelector(selectIntegration, ({isBlackWhiteListPropertiesVisible}: IntegrationState) => isBlackWhiteListPropertiesVisible);

export const selectIsTestingConnection = createSelector(selectIntegration, ({isConnectionTesting}: IntegrationState) => isConnectionTesting);

export const selectIsCompilation = createSelector(selectIntegration, ({isCompiling}: IntegrationState) => isCompiling);
export const selectHrSourceForm = createSelector(selectIntegration, ({hrSourceForm}: IntegrationState) => hrSourceForm);

export const selectLeaverRuleForm = createSelector(selectIntegration, ({leaverRuleForm}: IntegrationState) => leaverRuleForm);

export const selectIsCorrelationCompilation = createSelector(selectIntegration, ({isCorrelationCompiling}: IntegrationState) => isCorrelationCompiling);
export const selectCompileCorrelationRuleStatus = createSelector(selectIntegration, ({compileCorrelationRuleStatus}: IntegrationState) => compileCorrelationRuleStatus);
export const selectCompileCorrelationRuleMsg = createSelector(selectIntegration, ({compileCorrelationRuleMsg}: IntegrationState) => compileCorrelationRuleMsg);

export const selectIsCustomizationCompilation = createSelector(selectIntegration, ({isCustomizationCompiling}: IntegrationState) => isCustomizationCompiling);
export const selectCompileCustomizationRuleStatus = createSelector(selectIntegration, ({compileCustomizationRuleStatus}: IntegrationState) => compileCustomizationRuleStatus);
export const selectCompileCustomizationRuleMsg = createSelector(selectIntegration, ({compileCustomizationRuleMsg}: IntegrationState) => compileCustomizationRuleMsg);

export const selectIsJoinerCompilation = createSelector(selectIntegration, ({isJoinerCompiling}: IntegrationState) => isJoinerCompiling);
export const selectCompileJoinerRuleStatus = createSelector(selectIntegration, ({compileJoinerRuleStatus}: IntegrationState) => compileJoinerRuleStatus);
export const selectCompileJoinerRuleMsg = createSelector(selectIntegration, ({compileJoinerRuleMsg}: IntegrationState) => compileJoinerRuleMsg);

export const selectIsLeaverCompilation = createSelector(selectIntegration, ({isLeaverCompiling}: IntegrationState) => isLeaverCompiling);
export const selectCompileLeaverRuleStatus = createSelector(selectIntegration, ({compileLeaverRuleStatus}: IntegrationState) => compileLeaverRuleStatus);
export const selectCompileLeaverRuleMsg = createSelector(selectIntegration, ({compileLeaverRuleMsg}: IntegrationState) => compileLeaverRuleMsg);

export const selectIsMoverCompilation = createSelector(selectIntegration, ({isMoverCompiling}: IntegrationState) => isMoverCompiling);
export const selectCompileMoverRuleStatus = createSelector(selectIntegration, ({compileMoverRuleStatus}: IntegrationState) => compileMoverRuleStatus);
export const selectCompileMoverRuleMsg = createSelector(selectIntegration, ({compileMoverRuleMsg}: IntegrationState) => compileMoverRuleMsg);

export const selectIsReinstatementCompilation = createSelector(selectIntegration, ({isReinstatementCompiling}: IntegrationState) => isReinstatementCompiling);
export const selectCompileReinstatementRuleStatus = createSelector(selectIntegration, ({compileReinstatementRuleStatus}: IntegrationState) => compileReinstatementRuleStatus);
export const selectCompileReinstatementRuleMsg = createSelector(selectIntegration, ({compileReinstatementRuleMsg}: IntegrationState) => compileReinstatementRuleMsg);

export const selectIsIdentityAttributesCompilation = createSelector(selectIntegration, ({isIdentityAttributesCompiling}: IntegrationState) => isIdentityAttributesCompiling);
export const selectCompileIdentityAttributesRuleStatus = createSelector(selectIntegration, ({compileIdentityAttributesRuleStatus}: IntegrationState) => compileIdentityAttributesRuleStatus);
export const selectCompileIdentityAttributesRuleMsg = createSelector(selectIntegration, ({compileIdentityAttributesRuleMsg}: IntegrationState) => compileIdentityAttributesRuleMsg);


export const selectIsTerminationCompilingCompilation = createSelector(selectIntegration, ({isTerminationCompiling}: IntegrationState) => isTerminationCompiling);
export const selectCompileTerminationRuleStatus = createSelector(selectIntegration, ({compileTerminationRuleStatus}: IntegrationState) => compileTerminationRuleStatus);
export const selectCompileTerminationRuleMsgRuleMsg = createSelector(selectIntegration, ({compileTerminationRuleMsg}: IntegrationState) => compileTerminationRuleMsg);


export const restApiCompileGetMetaDataRuleStatus = createSelector(selectIntegration, ({restApiCompileGetMetaDataRuleStatus}: IntegrationState) => restApiCompileGetMetaDataRuleStatus);
export const restApiCompileGetMetaDataRuleMsg = createSelector(selectIntegration, ({restApiCompileGetMetaDataRuleMsg}: IntegrationState) => restApiCompileGetMetaDataRuleMsg);
export const isRestApiCompileGetMetadata = createSelector(selectIntegration, ({isRestApiCompileGetMetadata}: IntegrationState) => isRestApiCompileGetMetadata);


export const restApiGetIntegrationDataRuleStatus = createSelector(selectIntegration, ({restApiGetIntegrationDataRuleStatus}: IntegrationState) => restApiGetIntegrationDataRuleStatus);
export const restApiGetIntegrationDataRuleMsg = createSelector(selectIntegration, ({restApiGetIntegrationDataRuleMsg}: IntegrationState) => restApiGetIntegrationDataRuleMsg);
export const isRestApiGetIntegration = createSelector(selectIntegration, ({isRestApiGetIntegration}: IntegrationState) => isRestApiGetIntegration);


export const restApiCreateAccountRuleStatus = createSelector(selectIntegration, ({restApiCreateAccountRuleStatus}: IntegrationState) => restApiCreateAccountRuleStatus);
export const restApiCreateAccountRuleMsg = createSelector(selectIntegration, ({restApiCreateAccountRuleMsg}: IntegrationState) => restApiCreateAccountRuleMsg);
export const isRestApiCreateAccountRule = createSelector(selectIntegration, ({isRestApiCreateAccountRule}: IntegrationState) => isRestApiCreateAccountRule);


export const restApiDeleteAccountRuleStatus = createSelector(selectIntegration, ({restApiDeleteAccountRuleStatus}: IntegrationState) => restApiDeleteAccountRuleStatus);
export const restApiDeleteAccountRuleMsg = createSelector(selectIntegration, ({restApiDeleteAccountRuleMsg}: IntegrationState) => restApiDeleteAccountRuleMsg);
export const isRestApiDeleteAccountRule = createSelector(selectIntegration, ({isRestApiDeleteAccountRule}: IntegrationState) => isRestApiDeleteAccountRule);


export const restApiLockAccountRuleStatus = createSelector(selectIntegration, ({restApiLockAccountRuleStatus}: IntegrationState) => restApiLockAccountRuleStatus);
export const restApiLockAccountRuleMsg = createSelector(selectIntegration, ({restApiLockAccountRuleMsg}: IntegrationState) => restApiLockAccountRuleMsg);
export const isRestApiLockAccountRule = createSelector(selectIntegration, ({isRestApiLockAccountRule}: IntegrationState) => isRestApiLockAccountRule);


export const restApiUnlockAccountRuleStatus = createSelector(selectIntegration, ({restApiUnlockAccountRuleStatus}: IntegrationState) => restApiUnlockAccountRuleStatus);
export const restApiUnlockAccountRuleMsg = createSelector(selectIntegration, ({restApiUnlockAccountRuleMsg}: IntegrationState) => restApiUnlockAccountRuleMsg);
export const isRestApiUnlockAccountRule = createSelector(selectIntegration, ({isRestApiUnlockAccountRule}: IntegrationState) => isRestApiUnlockAccountRule);


export const restApiUpdateAccountCredentialsRuleStatus = createSelector(selectIntegration, ({restApiUpdateAccountCredentialsRuleStatus}: IntegrationState) => restApiUpdateAccountCredentialsRuleStatus);
export const restApiUpdateAccountCredentialsRuleMsg = createSelector(selectIntegration, ({restApiUpdateAccountCredentialsRuleMsg}: IntegrationState) => restApiUpdateAccountCredentialsRuleMsg);
export const isRestUpdateAccountCredentialsRule = createSelector(selectIntegration, ({isRestUpdateAccountCredentialsRule}: IntegrationState) => isRestUpdateAccountCredentialsRule);


export const restApiUpdateAccountAdditionalPropertiesRuleStatus = createSelector(selectIntegration, ({restApiUpdateAccountAdditionalPropertiesRuleStatus}: IntegrationState) => restApiUpdateAccountAdditionalPropertiesRuleStatus);
export const restApiUpdateAccountAdditionalPropertiesRuleMsg = createSelector(selectIntegration, ({restApiUpdateAccountAdditionalPropertiesRuleMsg}: IntegrationState) => restApiUpdateAccountAdditionalPropertiesRuleMsg);
export const isRestUpdateAccountAdditionalPropertiesRule = createSelector(selectIntegration, ({isRestUpdateAccountAdditionalPropertiesRule}: IntegrationState) => isRestUpdateAccountAdditionalPropertiesRule);


export const restApiUpdateAccountEntitlementsDeltaRuleStatus = createSelector(selectIntegration, ({restApiUpdateAccountEntitlementsDeltaRuleStatus}: IntegrationState) => restApiUpdateAccountEntitlementsDeltaRuleStatus);
export const restApiUpdateAccountEntitlementsDeltaRuleMsg = createSelector(selectIntegration, ({restApiUpdateAccountEntitlementsDeltaRuleMsg}: IntegrationState) => restApiUpdateAccountEntitlementsDeltaRuleMsg);
export const isRestUpdateAccountEntitlementsDeltaRule = createSelector(selectIntegration, ({isRestUpdateAccountEntitlementsDeltaRule}: IntegrationState) => isRestUpdateAccountEntitlementsDeltaRule);


export const restApiGetActiveLoginsRuleStatus = createSelector(selectIntegration, ({restApiGetActiveLoginsRuleStatus}: IntegrationState) => restApiGetActiveLoginsRuleStatus);
export const restApiGetActiveLoginsRuleMsg = createSelector(selectIntegration, ({restApiGetActiveLoginsRuleMsg}: IntegrationState) => restApiGetActiveLoginsRuleMsg);
export const isRestGetActiveLoginsRule = createSelector(selectIntegration, ({isRestGetActiveLoginsRule}: IntegrationState) => isRestGetActiveLoginsRule);


export const restApiGetBlacklistedLoginAttemptsRuleStatus = createSelector(selectIntegration, ({restApiGetBlacklistedLoginAttemptsRuleStatus}: IntegrationState) => restApiGetBlacklistedLoginAttemptsRuleStatus);
export const restApiGetBlacklistedLoginAttemptsRuleMsg = createSelector(selectIntegration, ({restApiGetBlacklistedLoginAttemptsRuleMsg}: IntegrationState) => restApiGetBlacklistedLoginAttemptsRuleMsg);
export const isRestGetBlacklistedLoginAttemptsRule = createSelector(selectIntegration, ({isRestGetBlacklistedLoginAttemptsRule}: IntegrationState) => isRestGetBlacklistedLoginAttemptsRule);


export const restApiGetBlackListRuleStatus = createSelector(selectIntegration, ({restApiGetBlackListRuleStatus}: IntegrationState) => restApiGetBlackListRuleStatus);
export const restApiGetBlackListRuleMsg = createSelector(selectIntegration, ({restApiGetBlackListRuleMsg}: IntegrationState) => restApiGetBlackListRuleMsg);
export const isRestGetBlackListRule = createSelector(selectIntegration, ({isRestGetBlackListRule}: IntegrationState) => isRestGetBlackListRule);


export const restApiSetBlackListRuleStatus = createSelector(selectIntegration, ({restApiSetBlackListRuleStatus}: IntegrationState) => restApiSetBlackListRuleStatus);
export const restApiSetBlackListRuleMsg = createSelector(selectIntegration, ({restApiSetBlackListRuleMsg}: IntegrationState) => restApiSetBlackListRuleMsg);
export const isRestSetBlackListRule = createSelector(selectIntegration, ({isRestSetBlackListRule}: IntegrationState) => isRestSetBlackListRule);


export const restApiGetCustomAuthHeaderRuleStatus = createSelector(selectIntegration, ({restApiGetCustomAuthHeaderRuleStatus}: IntegrationState) => restApiGetCustomAuthHeaderRuleStatus);
export const restApiGetCustomAuthHeaderRuleMsg = createSelector(selectIntegration, ({restApiGetCustomAuthHeaderRuleMsg}: IntegrationState) => restApiGetCustomAuthHeaderRuleMsg);
export const isRestGetCustomAuthHeaderRule = createSelector(selectIntegration, ({isRestGetCustomAuthHeaderRule}: IntegrationState) => isRestGetCustomAuthHeaderRule);


export const csvCompileGetMetadataMappingRuleStatus = createSelector(selectIntegration, ({csvCompileGetMetadataMappingRuleStatus}: IntegrationState) => csvCompileGetMetadataMappingRuleStatus);
export const csvCompileGetMetadataMappingRuleMsg = createSelector(selectIntegration, ({csvCompileGetMetadataMappingRuleMsg}: IntegrationState) => csvCompileGetMetadataMappingRuleMsg);
export const isCsvCompileGetMetadataMappingRule = createSelector(selectIntegration, ({isCsvCompileGetMetadataMappingRule}: IntegrationState) => isCsvCompileGetMetadataMappingRule);


export const csvCompileGetIntegrationDataMappingRuleStatus = createSelector(selectIntegration, ({csvCompileGetIntegrationDataMappingRuleStatus}: IntegrationState) => csvCompileGetIntegrationDataMappingRuleStatus);
export const csvCompileGetIntegrationDataMappingRuleMsg = createSelector(selectIntegration, ({csvCompileGetIntegrationDataMappingRuleMsg}: IntegrationState) => csvCompileGetIntegrationDataMappingRuleMsg);
export const isCsvCompileGetIntegrationDataMappingRule = createSelector(selectIntegration, ({isCsvCompileGetIntegrationDataMappingRule}: IntegrationState) => isCsvCompileGetIntegrationDataMappingRule);

export const integrationTogglesForms = createSelector(selectIntegration, ({integrationTogglesForms}: IntegrationState) => integrationTogglesForms);


export const selectPermissionTabConfig = createSelector(selectAllIdentitiesAndWorkgroups, selectSettings, selectEnvType,
  selectGeneralWorkflowSettings,
  (
    allIdentitiesAndWorkgroups,
    integrationSettings,
    envType,
    generalWorkflowSettings
  ) => {
    if (allIdentitiesAndWorkgroups && integrationSettings && envType && generalWorkflowSettings) {
      return {
        allIdentitiesAndWorkgroups,
        integrationSettings,
        envType,
        generalWorkflowSettings
      };
    }
  });


export const selectConfig = createSelector(
  selectAllIdentitiesAndWorkgroups,
  selectGeneralWorkflowSettings,
  selectSettings,
  selectEnvType,
  (
    allIdentitiesAndWorkgroups,
    generalWorkflowSettings,
    integrationSettings,
    envType
  ) => {
    if (allIdentitiesAndWorkgroups && generalWorkflowSettings && integrationSettings && envType) {
      return {
        allIdentitiesAndWorkgroups,
        generalWorkflowSettings,
        integrationSettings,
        envType
      };
    }
  });
