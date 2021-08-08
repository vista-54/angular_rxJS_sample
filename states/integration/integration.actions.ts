import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../../pages/identity-automation/pages/integration/models/product.model';
import { Settings } from '../../../pages/identity-automation/pages/integration/models/settings.model';
import { MetaData, Target } from '../../../pages/identity-automation/pages/integration/models/account.model';
import { AllIdentitiesAndWorkgroups } from '@models/integration.model';
import { IntegrationTypes } from '@const/environment-types.const';
import { NetworkLocation } from '@enums/integrations';
import { LinuxModel } from '../../../pages/identity-automation/pages/integration/models/linux.model';

export const resetToInitialState = createAction(
  '[Integrations] Reset To Initial State'
);
export const resetIntegrations = createAction(
  '[Integrations] Reset To Empty Array'
);
export const getIntegrations = createAction(
  '[Integrations] Get From Server'
);
export const resetSelectedIntegration = createAction(
  '[Integrations] Reset Selected Integration'
);


export const setIntegrations = createAction(
  '[Integrations] Set Integrations',
  props<{ integrations: ProductModel[] }>()
);
export const setTargetEntitlementTypes = createAction(
  '[Integrations] Set TargetEntitlementTypes',
  props<{ targetEntitlementTypes: any[] }>()
);

export const setTargets = createAction(
  '[Integrations] Set Targets',
  props<{ targets: Target[] }>()
);


export const saveDetails = createAction(
  '[Integrations] Save Product Details On Server',
  props<{ details: any }>()
);

export const deleteIntegration = createAction(
  '[Integrations] Delete',
);

export const deleteIntegrationSuccess = createAction(
  '[Integrations] Delete integration Success',
);

export const updateDetails = createAction(
  '[Integrations] Update Product Details On Server',
  props<{ details: any }>()
);

export const saveDetailsSuccess = createAction(
  '[Integrations] Save Product Details On Server Success',
  props<{ res: any }>()
);

export const getSelectedIntegration = createAction(
  '[Integrations] Get Selected Integration',
  props<{ id: number }>()
);

export const getSelectedIntegrationError = createAction(
  '[Integrations] Get Selected Integration Error',
  props<{ integrationType: IntegrationTypes }>()
);

export const setSelectedIntegration = createAction(
  '[Integrations] Set Selected Integration',
  props<{ selectedIntegration: ProductModel }>()
);


export const setTotalItemsCount = createAction(
  '[Integrations] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Integrations] Next Page',
  props<{ perPage: number; page: number }>()
);

export const resetPagination = createAction(
  '[Integrations] Reset Integrations Pagination'
);

export const search = createAction(
  '[Integrations] Search Integrations',
  props<{ query: string }>()
);

export const setSettings = createAction(
  '[Integrations] Set Settings',
  props<{ settings: Settings }>()
);

export const setMetadata = createAction(
  '[Integrations] Set Metadata',
  props<{ metadata: MetaData }>()
);

export const saveSettings = createAction(
  '[Integrations] Save Settings On the Server'
);

export const saveTerminationRule = createAction(
  '[Integrations] Save TerminationRule On the Server'
);

export const setSelectedIntegrationID = createAction(
  '[Integrations] Set Selected Integration Id',
  props<{ selectedIntegrationId: number }>()
);

export const setSelectedIntegrationEmpty = createAction(
  '[Integrations] Set Selected Integration Empty',
  props<{ integration: ProductModel }>()
);


export const setAdditionalPropertyObjectTypes = createAction(
  '[Integrations] Set Additional Property Object Types',
  props<{ additionalPropertyObjectTypes: any }>()
);


export const testConnectionBeforeSave = createAction(
  '[Integrations] Test Connection Before Save',
  props<{ product: ProductModel }>()
);

export const connectionBeforeSaveResultSuccessfully = createAction(
  '[Integrations] Test Connection Before Save Success',
  props<{ res: any }>()
);

export const connectionBeforeSaveResultError = createAction(
  '[Integrations] Test Connection Before Save Error',
);


export const testConnectionSave = createAction(
  '[Integrations] Test Connection Save',
);

export const connectionSaveResultSuccessfully = createAction(
  '[Integrations] Test Connection Save Success',
  props<{ res: any }>()
);

export const connectionSaveResultError = createAction(
  '[Integrations] Test Connection Save Error',
);

export const orderByField = createAction(
  '[Integrations] Order By',
  props<{ orderBy: string; orderDirection: string }>()
);
export const setEnvType = createAction(
  '[Integrations] Set Env Type',
  props<{ envType: string }>()
);

export const setAllIdentitiesAndWorkgroups = createAction(
  '[Integrations] Set All Identities And Workgroups',
  props<{ allIdentitiesAndWorkgroups: AllIdentitiesAndWorkgroups }>()
);

export const setAreBlackListSupported = createAction(
  '[Integrations] Set AreBlackListSupported',
  props<{ areBlackWhiteListsSupported: boolean }>()
);

export const setBlackListProp = createAction(
  '[Integrations] Set Is Black WhiteListPropertiesVisible',
  props<{ isBlackWhiteListPropertiesVisible: boolean }>()
);

export const setMenuLevel3 = createAction(
  '[Integrations] Set Menu Level3',
);

export const startTerminationRuleCompilation = createAction(
  '[Integrations] Start Termination Rule Compilation',
  props<{ compiling: boolean }>()
);

export const setIsConnectionTesting = createAction(
  '[Integrations] Test Connection Change Status',
  props<{ isConnectionTesting: boolean }>()
);

export const startCorrelationCompilation = createAction(
  '[Integrations] Start Correlation Compilation',
  props<{ compiling: boolean }>()
);

export const startCustomizationCompilation = createAction(
  '[Integrations] Start Customization Compilation',
  props<{ compiling: boolean }>()
);

export const startJoinerCompilation = createAction(
  '[Integrations] Start Joiner Compilation',
  props<{ compiling: boolean }>()
);

export const startMoverCompilation = createAction(
  '[Integrations] Start Mover Compilation',
  props<{ compiling: boolean }>()
);

export const startLeaverCompilation = createAction(
  '[Integrations] Start Leaver Compilation',
  props<{ compiling: boolean }>()
);

export const startReinstatementRuleCompilation = createAction(
  '[Integrations] Start Reinstatement Compilation',
  props<{ compiling: boolean }>()
);

export const startIdentityAttributesRuleCompilation = createAction(
  '[Integrations] Start Identity Attributes Compilation',
  props<{ compiling: boolean }>()
);

export const compileLeaverRuleSuccess = createAction(
  '[Integrations] Compile Leaver Rule Success',
);

export const compileLeaverRuleError = createAction(
  '[Integrations] Compile Leaver Rule Error',
  props<{ message: string }>()
);

export const compileCorrelationRule = createAction(
  '[Integrations] Compile Correlation Rule',
  props<{ ruleBody: string }>()
);

export const compileCorrelationRuleSuccess = createAction(
  '[Integrations] Compile Correlation Rule Success',
);

export const compileCorrelationRuleError = createAction(
  '[Integrations] Compile Correlation Rule Error',
  props<{ message: string }>()
);

// REST API INTEGRATION

export const restApiCompileGetMetaDataRule = createAction(
  '[Integrations] Rest Api Compile Get Meta Data Rule',
);

export const restApiCompileGetMetaDataRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Get Meta Data Rule Success',
);

export const restApiCompileGetMetaDataRuleError = createAction(
  '[Integrations] Rest Api Compile Get Meta Data Rule Error',
  props<{ message: string }>()
);

export const restApiCompileGetIntegrationDataRule = createAction(
  '[Integrations] Rest Api Compile Get Integration Data Rule',
);

export const restApiCompileGetIntegrationDataRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Get Integration Data Rule Success',
);

export const restApiCompileGetIntegrationDataRuleError = createAction(
  '[Integrations] Rest Api Compile Get Integration Data Rule Error',
  props<{ message: string }>()
);


export const restApiCompileCreateAccountRule = createAction(
  '[Integrations] Rest Api Compile Create Account Rule',
);

export const restApiCompileCreateAccountRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Create Account Rule Success',
);

export const restApiCompileCreateAccountRuleError = createAction(
  '[Integrations] Rest Api Compile Create Account Rule Error',
  props<{ message: string }>()
);


export const restApiCompileDeleteAccountRule = createAction(
  '[Integrations] Rest Api Compile Delete Account Rule',
);

export const restApiCompileDeleteAccountRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Delete Account Rule Success',
);

export const restApiCompileDeleteAccountRuleError = createAction(
  '[Integrations] Rest Api Compile Delete Account Rule Error',
  props<{ message: string }>()
);

export const restApiCompileLockAccountRule = createAction(
  '[Integrations] Rest Api Lock Account Rule',
);

export const restApiCompileLockAccountRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Lock Account Rule Success',
);

export const restApiCompileLockAccountRuleError = createAction(
  '[Integrations] Rest Api Compile Lock Account Rule Error',
  props<{ message: string }>()
);

export const restApiCompileUnlockAccountRule = createAction(
  '[Integrations] Rest Api Unlock Account Rule',
);

export const restApiCompileUnlockAccountRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Unlock Account Rule Success',
);

export const restApiCompileUnlockAccountRuleError = createAction(
  '[Integrations] Rest Api Compile Unlock Account Rule Error',
  props<{ message: string }>()
);

export const restApiCompileUpdateAccountCredentialRule = createAction(
  '[Integrations] Rest Api Update Account Credential Rule',
);

export const restApiCompileUpdateAccountCredentialRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Update Account Credential Success',
);

export const restApiCompileUpdateAccountCredentialRuleError = createAction(
  '[Integrations] Rest Api Compile Update Account Credential Error',
  props<{ message: string }>()
);

export const restApiCompileUpdateAccountAdditionalPropertiesRule = createAction(
  '[Integrations] Rest Api Update Account Additional Properties Rule',
);

export const restApiCompileUpdateAccountAdditionalPropertiesRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Update Account Additional Properties Success',
);

export const restApiCompileUpdateAccountAdditionalPropertiesRuleError = createAction(
  '[Integrations] Rest Api Compile Update Account Additional Properties Error',
  props<{ message: string }>()
);

export const restApiCompileUpdateAccountEntitlementsDeltaRule = createAction(
  '[Integrations] Rest Api Update Account Entitlements Delta Rule',
);

export const restApiCompileUpdateAccountEntitlementsDeltaRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Update Account Entitlements Delta Success',
);

export const restApiCompileUpdateAccountEntitlementsDeltaRuleError = createAction(
  '[Integrations] Rest Api Compile Update Account Entitlements Delta Error',
  props<{ message: string }>()
);

export const restApiCompileGetActiveLoginsRule = createAction(
  '[Integrations] Rest Api Get Active Logins Rule',
);

export const restApiCompileGetActiveLoginsRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Get Active Logins Success',
);

export const restApiCompileGetActiveLoginsRuleError = createAction(
  '[Integrations] Rest Api Compile Get Active Logins Error',
  props<{ message: string }>()
);

export const restApiCompileGetBlacklistedLoginAttemptsRule = createAction(
  '[Integrations] Rest Api Get Blacklisted Login Attempts Rule',
);

export const restApiCompileGetBlacklistedLoginAttemptsRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Get Blacklisted Login Attempts Success',
);

export const restApiCompileGetBlacklistedLoginAttemptsRuleError = createAction(
  '[Integrations] Rest Api Compile Get Blacklisted Login Attempts Error',
  props<{ message: string }>()
);

export const restApiCompileGetBlackListRule = createAction(
  '[Integrations] Rest Api Get Black List Rule',
);

export const restApiCompileGetBlackListRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Get Black List Success',
);

export const restApiCompileGetBlackListRuleError = createAction(
  '[Integrations] Rest Api Compile Get Black List Error',
  props<{ message: string }>()
);

export const restApiCompileSetBlackListRule = createAction(
  '[Integrations] Rest Api Set Black List Rule',
);

export const restApiCompileSetBlackListRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Set Black List Success',
);

export const restApiCompileSetBlackListRuleError = createAction(
  '[Integrations] Rest Api Compile Set Black List Error',
  props<{ message: string }>()
);

export const restApiCompileGetCustomAuthHeaderRule = createAction(
  '[Integrations] Rest Api Get Custom Auth Header Rule',
);

export const restApiCompileGetCustomAuthHeaderRuleSuccess = createAction(
  '[Integrations] Rest Api Compile Get Custom Auth Header Success',
);

export const restApiCompileGetCustomAuthHeaderRuleError = createAction(
  '[Integrations] Rest Api Compile Get Custom Auth Header Error',
  props<{ message: string }>()
);

//

/**
 * CSV INTEGRATION
 */

export const csvCompileGetMetadataMappingRule = createAction(
  '[Integrations] CSV Get Metadata Mapping Rule',
);

export const csvCompileGetMetadataMappingRuleSuccess = createAction(
  '[Integrations] CSV Get Metadata Mapping Rule Success',
);

export const csvCompileGetMetadataMappingRuleError = createAction(
  '[Integrations] CSV Get Metadata Mapping Rule Error',
  props<{ message: string }>()
);

export const csvCompileGetIntegrationDataMappingRule = createAction(
  '[Integrations] CSV Get Integration Data Mapping Rule',
);

export const csvCompileGetIntegrationDataMappingRuleSuccess = createAction(
  '[Integrations] CSV Get Integration Data  Mapping Rule Success',
);

export const csvCompileGetIntegrationDataMappingRuleError = createAction(
  '[Integrations] CSV Get Integration Data  Mapping Rule Error',
  props<{ message: string }>()
);

/**
 * CSV END
 */
export const compileCustomizationRule = createAction(
  '[Integrations] Compile Customization Rule',
  props<{ ruleBody: string }>()
);

export const compileCustomizationRuleSuccess = createAction(
  '[Integrations] Compile Customization Rule Success',
);

export const compileCustomizationRuleError = createAction(
  '[Integrations] Compile Customization Rule Error',
  props<{ message: string }>()
);


export const saveIntegration = createAction(
  '[Integrations] Save Integration Save',
);

export const compileTerminationRule = createAction(
  '[Integrations] Compile Termination Rule',
);

export const compileTerminationSuccess = createAction(
  '[Integrations] Compile Termination Rule Success',
);

export const compileJoinerRule = createAction(
  '[Integrations] Compile Joiner Rule',
);

export const compileLeaverRule = createAction(
  '[Integrations] Compile Leaver Rule',
);

export const compileMoverRule = createAction(
  '[Integrations] Compile Mover Rule',
);

export const compileMoverRuleSuccess = createAction(
  '[Integrations] Compile Mover Rule Success',
);


export const compileReinstatementRule = createAction(
  '[Integrations] Compile Reinstatement Rule',
);
export const compileReinstatementRuleSuccess = createAction(
  '[Integrations] Compile Reinstatement Rule Success',
);

export const compileIdentityAttributesRule = createAction(
  '[Integrations] Compile identityAttributes Rule',
);

export const compileIdentityAttributesRuleSuccess = createAction(
  '[Integrations] Compile identityAttributes Rule Success',
);

export const compileJoinerRuleSuccess = createAction(
  '[Integrations] Compile Joiner Rule Success',
);

export const addHttpUrl = createAction(
  '[Integrations] Add Http Url',
);

export const updateNetworkLocation = createAction(
  '[Integrations] Update Network Location',
  props<{ networkLocation: NetworkLocation }>()
);

export const rmHttpUrl = createAction(
  '[Integrations] Remove Http Url',
  props<{ index: number }>()
);

export const addReferer = createAction(
  '[Integrations] Add Referer',
);

export const rmReferer = createAction(
  '[Integrations] Remove Refer',
  props<{ index: number }>()
);


export const compileJoinerRuleError = createAction(
  '[Integrations] Compile Joiner Rule Error',
  props<{ message: string }>()
);

export const compileMoverRuleError = createAction(
  '[Integrations] Compile Mover Rule Error',
  props<{ message: string }>()
);

export const compileReinstatementRuleError = createAction(
  '[Integrations] Compile Reinstatement Rule Error',
  props<{ message: string }>()
);
export const compileIdentityAttributesRuleError = createAction(
  '[Integrations] Compile Identity Attributes Rule Error',
  props<{ message: string }>()
);

export const compileTerminationRuleError = createAction(
  '[Integrations] Compile Termination Rule Error',
  props<{ message: string }>()
);

/**
 * New
 */
export const testIntegrationConnection = createAction(
  '[INTEGRATIONS] Test Connection',
);

export const testIntegrationConnectionSuccess = createAction(
  '[INTEGRATIONS] Test Connection SUCCESS',
);

export const testIntegrationConnectionError = createAction(
  '[INTEGRATIONS] Test Connection ERROR',
);

export const disableHRSource = createAction(
  '[INTEGRATIONS] Disable HR Source',
);

export const saveHRSource = createAction(
  '[INTEGRATIONS] Save HR Source',
);

/**
 * CG-1843
 */
export const validateIntegration = createAction(
  '[INTEGRATIONS] Validate Integration Before Saving',
);

export const initIntegration = createAction(
  '[INTEGRATIONS] Create New Integration',
  props<{ integrationType: IntegrationTypes }>()
);

export const initAWSIntegration = createAction(
  '[INTEGRATIONS] Create New AWS Integration',
);

export const initAzureAdIntegration = createAction(
  '[INTEGRATIONS] Create New Azure Integration',
);

export const initGoogleIntegration = createAction(
  '[INTEGRATIONS] Create New Google Integration',
);

export const initOracleIntegration = createAction(
  '[INTEGRATIONS] Create New Oracle Integration',
);

export const initMssqlIntegration = createAction(
  '[INTEGRATIONS] Create New Mssql Integration',
);

export const initPeoplesoftIntegration = createAction(
  '[INTEGRATIONS] Create New Peoplesoft Integration',
);

export const initLinuxIntegration = createAction(
  '[INTEGRATIONS] Create New Linux Integration',
);

export const initRdpIntegration = createAction(
  '[INTEGRATIONS] Create New Rdp Integration',
);

export const initCsvIntegration = createAction(
  '[INTEGRATIONS] Create New Csv Integration',
);

export const initEbsIntegration = createAction(
  '[INTEGRATIONS] Create New Ebs Integration',
);

export const initRestApiIntegration = createAction(
  '[INTEGRATIONS] Create New Rest Api Integration',
);

export const integrationLoader = createAction(
  '[INTEGRATIONS] Set Loader Status',
  props<{ loader: boolean }>()
);

export const resetValidationCalled = createAction(
  '[INTEGRATIONS] Reset Validation Called',
);

