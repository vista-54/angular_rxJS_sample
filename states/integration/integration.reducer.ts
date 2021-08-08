import { Action, createReducer, on } from '@ngrx/store';
import * as IntegrationActions from '../integration/integration.actions';
import { ProductModel } from '../../../pages/identity-automation/pages/integration/models/product.model';
import { HrSourceSettings, LeaverRuleForm, Settings } from '../../../pages/identity-automation/pages/integration/models/settings.model';
import { MetaData, Target } from '../../../pages/identity-automation/pages/integration/models/account.model';
import { AllIdentitiesAndWorkgroups, IntegrationModel, IntegrationTogglesForm } from '@models/integration.model';
import { toastMessages } from '@const/toast.const';
import {
  addArrayControl,
  box,
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
  onNgrxForms,
  onNgrxFormsAction,
  removeArrayControl,
  setValue,
  SetValueAction,
} from 'ngrx-forms';
import { getIntegrationName } from '../../../helpers/common.helpers';
import { IntegrationTypes } from '@const/environment-types.const';
import {
  validateAwsIntegration,
  validateAzureAdIntegration,
  validateBodyIntegration,
  validateCsvIntegration,
  validateEbsIntegration,
  validateGoogleIntegration,
  validateHrSource,
  validateLinuxIntegration,
  validateMssqlIntegration,
  validateOracleIntegration,
  validatePeoplesoftIntegration,
  validateRdpIntegration,
  validateRestApiIntegration,
} from '@states/integration/integration.validators';
import { AWSModel } from '../../../pages/identity-automation/pages/integration/models/aws.model';
import {
  HR_SOURCE_FORM_ID, initialHrSourceForm,
  initialIntegrationTogglesForms, initialLeaverRuleForm,
  initialSelectedIntegrationAWSForm,
  initialSelectedIntegrationAzureForm,
  initialSelectedIntegrationCsvForm,
  initialSelectedIntegrationEbsForm,
  initialSelectedIntegrationForm,
  initialSelectedIntegrationGoogleForm,
  initialSelectedIntegrationLinuxForm,
  initialSelectedIntegrationMssqlForm,
  initialSelectedIntegrationOracleForm,
  initialSelectedIntegrationPeoplesoftForm,
  initialSelectedIntegrationRdpForm,
  initialSelectedIntegrationRestApiForm, INTEGRATION_TOGGLES_FORM_ID, LEAVER_RULE_FORM_ID,
  SELECTED_INTEGRATION_AWS_FORM_ID,
  SELECTED_INTEGRATION_AZURE_FORM_ID,
  SELECTED_INTEGRATION_CSV_FORM_ID,
  SELECTED_INTEGRATION_EBS_FORM_ID,
  SELECTED_INTEGRATION_FORM_ID,
  SELECTED_INTEGRATION_GOOGLE_FORM_ID,
  SELECTED_INTEGRATION_LINUX_FORM_ID,
  SELECTED_INTEGRATION_MSSQL_FORM_ID,
  SELECTED_INTEGRATION_ORACLE_FORM_ID,
  SELECTED_INTEGRATION_PEOPLESOFT_FORM_ID,
  SELECTED_INTEGRATION_RDP_FORM_ID,
  SELECTED_INTEGRATION_REST_API_FORM_ID
} from '@states/integration/forms/forms';
import { AzureAdModel } from '../../../pages/identity-automation/pages/integration/models/azureAd.model';
import { GoogleModel } from '../../../pages/identity-automation/pages/integration/models/google.model';
import { OracleModel } from '../../../pages/identity-automation/pages/integration/models/oracle.model';
import { MssqlModel } from '../../../pages/identity-automation/pages/integration/models/mssql.model';
import { PeoplesoftModel } from '../../../pages/identity-automation/pages/integration/models/peoplesoft.model';
import { LinuxModel } from '../../../pages/identity-automation/pages/integration/models/linux.model';
import { RdpModel } from '../../../pages/identity-automation/pages/integration/models/rdp.model';
import { CsvModel } from '../../../pages/identity-automation/pages/integration/models/csv.model';
import { EbsModel } from '../../../pages/identity-automation/pages/integration/models/ebs.model';
import { RestApiModel } from '../../../pages/identity-automation/pages/integration/models/rest-api.model';
import { AuthType, PwdOrPK } from '../../../pages/identity-automation/pages/integration/models/integration.model';

export interface IntegrationState {
  integrations: ProductModel[];
  selectedIntegration: FormGroupState<IntegrationModel>;
  selectedIntegrationAWSForm: FormGroupState<AWSModel>;
  selectedIntegrationAzureAdForm: FormGroupState<AzureAdModel>;
  selectedIntegrationGoogleForm: FormGroupState<GoogleModel>;
  selectedIntegrationOracleForm: FormGroupState<OracleModel>;
  selectedIntegrationMssqlForm: FormGroupState<MssqlModel>;
  selectedIntegrationPeoplesoftForm: FormGroupState<PeoplesoftModel>;
  selectedIntegrationLinuxForm: FormGroupState<LinuxModel>;
  selectedIntegrationRdpForm: FormGroupState<RdpModel>;
  selectedIntegrationCsvForm: FormGroupState<CsvModel>;
  selectedIntegrationEbsForm: FormGroupState<EbsModel>;
  selectedIntegrationRestApiForm: FormGroupState<RestApiModel>;
  integrationTogglesForms: FormGroupState<IntegrationTogglesForm>;
  integrationLoader: boolean;
  validationCalled: boolean;
  envType: string;
  perPage: number;
  page: number;
  totalItemsCount: number;
  orderBy: string;
  orderDirection: string;
  query: string;
  settings: Settings;
  // settings
  hrSourceForm: FormGroupState<HrSourceSettings>;
  // Leaver Rule
  leaverRuleForm: FormGroupState<LeaverRuleForm>;
  // hrSettings
  joinerRulesBody: string;
  offboardingApprovalStrategy: string;
  onboardingApprovalStrategy: string;
  transferApprovalStrategy: string;
  //
  metadata: MetaData;
  selectedIntegrationId: number;
  targets: Target[];
  targetsLookup: any;
  targetEntitlementTypes: string[];
  additionalPropertyObjectTypes: any;
  allIdentitiesAndWorkgroups: AllIdentitiesAndWorkgroups;
  areBlackWhiteListsSupported: boolean;
  isBlackWhiteListPropertiesVisible: boolean;
  isCompiling: boolean;
  isConnectionTesting: boolean;
  // Leaver Rule
  isLeaverCompiling: boolean;
  compileLeaverRuleStatus: boolean;
  compileLeaverRuleMsg: string;
  isCorrelationCompiling: boolean;
  compileCorrelationRuleStatus: boolean;
  compileCorrelationRuleMsg: string;
  isCustomizationCompiling: boolean;
  compileCustomizationRuleStatus: boolean;
  compileCustomizationRuleMsg: string;
  // Joiner Rule
  isJoinerCompiling: boolean;
  compileJoinerRuleStatus: boolean;
  compileJoinerRuleMsg: string;
  // Mover Rule
  isMoverCompiling: boolean;
  compileMoverRuleStatus: boolean;
  compileMoverRuleMsg: string;
  // Reinstatement Rule
  isReinstatementCompiling: boolean;
  compileReinstatementRuleStatus: boolean;
  compileReinstatementRuleMsg: string;
  // Identity attributes mapping Rule
  isIdentityAttributesCompiling: boolean;
  compileIdentityAttributesRuleStatus: boolean;
  compileIdentityAttributesRuleMsg: string;
  // Termination Rule
  isTerminationCompiling: boolean;
  compileTerminationRuleStatus: boolean;
  compileTerminationRuleMsg: string;
  // restApiGetIntegrationDataRuleSignature
  restApiCompileGetMetaDataRuleStatus: boolean;
  restApiCompileGetMetaDataRuleMsg: string;
  isRestApiCompileGetMetadata: boolean;
  // restApiGetIntegrationDataRuleSignature
  restApiGetIntegrationDataRuleStatus: boolean;
  restApiGetIntegrationDataRuleMsg: string;
  isRestApiGetIntegration: boolean;
  // restApiCreateAccountRuleSignature
  restApiCreateAccountRuleStatus: boolean;
  restApiCreateAccountRuleMsg: string;
  isRestApiCreateAccountRule: boolean;
  // restApiDeleteAccountRuleSignature
  restApiDeleteAccountRuleStatus: boolean;
  restApiDeleteAccountRuleMsg: string;
  isRestApiDeleteAccountRule: boolean;
  // restApiLockAccountRuleSignature
  restApiLockAccountRuleStatus: boolean;
  restApiLockAccountRuleMsg: string;
  isRestApiLockAccountRule: boolean;
  // restApiUnlockAccountRuleSignature
  restApiUnlockAccountRuleStatus: boolean;
  restApiUnlockAccountRuleMsg: string;
  isRestApiUnlockAccountRule: boolean;
  // restApiUpdateAccountCredentialsSignature
  restApiUpdateAccountCredentialsRuleStatus: boolean;
  restApiUpdateAccountCredentialsRuleMsg: string;
  isRestUpdateAccountCredentialsRule: boolean;
  // restApiUpdateAccountCredentialsSignature
  restApiUpdateAccountAdditionalPropertiesRuleStatus: boolean;
  restApiUpdateAccountAdditionalPropertiesRuleMsg: string;
  isRestUpdateAccountAdditionalPropertiesRule: boolean;
  // restApiUpdateAccountCredentialsSignature
  restApiUpdateAccountEntitlementsDeltaRuleStatus: boolean;
  restApiUpdateAccountEntitlementsDeltaRuleMsg: string;
  isRestUpdateAccountEntitlementsDeltaRule: boolean;
  // restApiGetActiveLoginsSignature
  restApiGetActiveLoginsRuleStatus: boolean;
  restApiGetActiveLoginsRuleMsg: string;
  isRestGetActiveLoginsRule: boolean;
  // restApiCompileGetBlacklistedLoginAttemptsSignature
  restApiGetBlacklistedLoginAttemptsRuleStatus: boolean;
  restApiGetBlacklistedLoginAttemptsRuleMsg: string;
  isRestGetBlacklistedLoginAttemptsRule: boolean;
  // restApiCompileGetBlackListSignature
  restApiGetBlackListRuleStatus: boolean;
  restApiGetBlackListRuleMsg: string;
  isRestGetBlackListRule: boolean;
  // restApiCompileSetBlackListSignature
  restApiSetBlackListRuleStatus: boolean;
  restApiSetBlackListRuleMsg: string;
  isRestSetBlackListRule: boolean;
  // restApiCompileGetCustomAuthHeaderSignature
  restApiGetCustomAuthHeaderRuleStatus: boolean;
  restApiGetCustomAuthHeaderRuleMsg: string;
  isRestGetCustomAuthHeaderRule: boolean;
  // csvCompileGetMetadataMappingSignature
  csvCompileGetMetadataMappingRuleStatus: boolean;
  csvCompileGetMetadataMappingRuleMsg: string;
  isCsvCompileGetMetadataMappingRule: boolean;
  // csvCompileGetIntegrationDataMappingSignature
  csvCompileGetIntegrationDataMappingRuleStatus: boolean;
  csvCompileGetIntegrationDataMappingRuleMsg: string;
  isCsvCompileGetIntegrationDataMappingRule: boolean;

}

export const initialState: IntegrationState = {
  integrations: null,
  selectedIntegration: createFormGroupState(SELECTED_INTEGRATION_FORM_ID, initialSelectedIntegrationForm),
  selectedIntegrationAWSForm: createFormGroupState(SELECTED_INTEGRATION_AWS_FORM_ID, initialSelectedIntegrationAWSForm),
  selectedIntegrationAzureAdForm: createFormGroupState(SELECTED_INTEGRATION_AZURE_FORM_ID, initialSelectedIntegrationAzureForm),
  selectedIntegrationGoogleForm: createFormGroupState(SELECTED_INTEGRATION_GOOGLE_FORM_ID, initialSelectedIntegrationGoogleForm),
  selectedIntegrationOracleForm: createFormGroupState(SELECTED_INTEGRATION_ORACLE_FORM_ID, initialSelectedIntegrationOracleForm),
  selectedIntegrationMssqlForm: createFormGroupState(SELECTED_INTEGRATION_MSSQL_FORM_ID, initialSelectedIntegrationMssqlForm),
  selectedIntegrationPeoplesoftForm: createFormGroupState(SELECTED_INTEGRATION_PEOPLESOFT_FORM_ID, initialSelectedIntegrationPeoplesoftForm),
  selectedIntegrationLinuxForm: createFormGroupState(SELECTED_INTEGRATION_LINUX_FORM_ID, initialSelectedIntegrationLinuxForm),
  selectedIntegrationRdpForm: createFormGroupState(SELECTED_INTEGRATION_RDP_FORM_ID, initialSelectedIntegrationRdpForm),
  selectedIntegrationCsvForm: createFormGroupState(SELECTED_INTEGRATION_CSV_FORM_ID, initialSelectedIntegrationCsvForm),
  selectedIntegrationEbsForm: createFormGroupState(SELECTED_INTEGRATION_EBS_FORM_ID, initialSelectedIntegrationEbsForm),
  selectedIntegrationRestApiForm: createFormGroupState(SELECTED_INTEGRATION_REST_API_FORM_ID, initialSelectedIntegrationRestApiForm),
  integrationTogglesForms: createFormGroupState(INTEGRATION_TOGGLES_FORM_ID, initialIntegrationTogglesForms),
  integrationLoader: true,
  validationCalled: false,
  envType: null,
  perPage: 25,
  page: 0,
  totalItemsCount: 0,
  orderBy: null,
  orderDirection: null,
  query: null,
  settings: null,
  // settings
  hrSourceForm: createFormGroupState(HR_SOURCE_FORM_ID, initialHrSourceForm),
  leaverRuleForm: createFormGroupState(LEAVER_RULE_FORM_ID, initialLeaverRuleForm),
  // hrSettings
  joinerRulesBody: null,
  offboardingApprovalStrategy: null,
  onboardingApprovalStrategy: null,
  transferApprovalStrategy: null,
  //
  metadata: null,
  selectedIntegrationId: null,
  targets: null,
  targetsLookup: null,
  targetEntitlementTypes: null,
  additionalPropertyObjectTypes: null,
  allIdentitiesAndWorkgroups: null,
  areBlackWhiteListsSupported: null,
  isBlackWhiteListPropertiesVisible: null,
  isCompiling: false,
  isConnectionTesting: false,
  // Leaver
  isLeaverCompiling: false,
  compileLeaverRuleStatus: null,
  compileLeaverRuleMsg: null,
  isCorrelationCompiling: false,
  compileCorrelationRuleStatus: null,
  compileCorrelationRuleMsg: null,
  isCustomizationCompiling: false,
  compileCustomizationRuleStatus: null,
  compileCustomizationRuleMsg: null,
  isJoinerCompiling: false,
  compileJoinerRuleStatus: null,
  compileJoinerRuleMsg: null,
  // Mover Rule
  isMoverCompiling: false,
  compileMoverRuleStatus: false,
  compileMoverRuleMsg: null,
  // Reinstatemen
  isReinstatementCompiling: false,
  compileReinstatementRuleStatus: false,
  compileReinstatementRuleMsg: null,
  // IdentityAttributes
  isIdentityAttributesCompiling: false,
  compileIdentityAttributesRuleStatus: false,
  compileIdentityAttributesRuleMsg: null,
  // Termination Rule
  isTerminationCompiling: false,
  compileTerminationRuleStatus: false,
  compileTerminationRuleMsg: null,
  // restApiGetIntegrationDataRuleSignature
  restApiCompileGetMetaDataRuleStatus: false,
  restApiCompileGetMetaDataRuleMsg: null,
  isRestApiCompileGetMetadata: false,
  // restApiGetIntegrationDataRuleSignature
  restApiGetIntegrationDataRuleStatus: false,
  restApiGetIntegrationDataRuleMsg: null,
  isRestApiGetIntegration: false,
  // restApiCreateAccountRuleSignature
  restApiCreateAccountRuleStatus: false,
  restApiCreateAccountRuleMsg: null,
  isRestApiCreateAccountRule: false,
  // restApiDeleteAccountRuleSignature
  restApiDeleteAccountRuleStatus: false,
  restApiDeleteAccountRuleMsg: null,
  isRestApiDeleteAccountRule: false,
  // restApiLockAccountRuleSignature
  restApiLockAccountRuleStatus: false,
  restApiLockAccountRuleMsg: null,
  isRestApiLockAccountRule: false,
  // restApiUnlockAccountRuleSignature
  restApiUnlockAccountRuleStatus: false,
  restApiUnlockAccountRuleMsg: null,
  isRestApiUnlockAccountRule: false,
  // restApiUpdateAccountCredentialsSignature
  restApiUpdateAccountCredentialsRuleStatus: false,
  restApiUpdateAccountCredentialsRuleMsg: null,
  isRestUpdateAccountCredentialsRule: false,
  // restApiUpdateAccountCredentialsSignature
  restApiUpdateAccountAdditionalPropertiesRuleStatus: false,
  restApiUpdateAccountAdditionalPropertiesRuleMsg: null,
  isRestUpdateAccountAdditionalPropertiesRule: false,
  // restApiUpdateAccountCredentialsSignature
  restApiUpdateAccountEntitlementsDeltaRuleStatus: false,
  restApiUpdateAccountEntitlementsDeltaRuleMsg: null,
  isRestUpdateAccountEntitlementsDeltaRule: false,
  // restApiGetActiveLoginsSignature
  restApiGetActiveLoginsRuleStatus: false,
  restApiGetActiveLoginsRuleMsg: null,
  isRestGetActiveLoginsRule: false,
  // restApiCompileGetBlacklistedLoginAttemptsSignature
  restApiGetBlacklistedLoginAttemptsRuleStatus: false,
  restApiGetBlacklistedLoginAttemptsRuleMsg: null,
  isRestGetBlacklistedLoginAttemptsRule: false,
  // restApiCompileGetBlackListSignature
  restApiGetBlackListRuleStatus: false,
  restApiGetBlackListRuleMsg: null,
  isRestGetBlackListRule: false,
  // restApiCompileSetBlackListSignature
  restApiSetBlackListRuleStatus: false,
  restApiSetBlackListRuleMsg: null,
  isRestSetBlackListRule: false,
  // restApiCompileGetCustomAuthHeaderSignature
  restApiGetCustomAuthHeaderRuleStatus: false,
  restApiGetCustomAuthHeaderRuleMsg: null,
  isRestGetCustomAuthHeaderRule: false,
  // csvCompileGetMetadataMappingSignature
  csvCompileGetMetadataMappingRuleStatus: false,
  csvCompileGetMetadataMappingRuleMsg: null,
  isCsvCompileGetMetadataMappingRule: false,
  // csvCompileGetIntegrationDataMappingSignature
  csvCompileGetIntegrationDataMappingRuleStatus: false,
  csvCompileGetIntegrationDataMappingRuleMsg: null,
  isCsvCompileGetIntegrationDataMappingRule: false,

};


export const integrationStateReducer = createReducer(
  initialState,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state, action) => {
    /**
     * Include Validation BEGIN
     */
    state = validateIntegration(state, action);
    const hrSourceForm = validateHrSource(formGroupReducer(state.hrSourceForm, action));

    if (hrSourceForm !== state.hrSourceForm) {
      state = {...state, hrSourceForm};
    }

    /**
     * Include Validation END
     */
    let newName: string;
    if (action.controlId === `${SELECTED_INTEGRATION_FORM_ID}.alternateName`) {
      newName = getIntegrationName(state.selectedIntegration.value.integrationType,
        state.selectedIntegration.value.description,
        action.value as string);

    }
    if (action.controlId === `${SELECTED_INTEGRATION_FORM_ID}.description`) {
      newName = getIntegrationName(state.selectedIntegration.value.integrationType,
        action.value as string,
        state.selectedIntegration.value.alternateName);
    }
    if (newName) {
      return {
        ...state,
        selectedIntegration: {
          ...state.selectedIntegration,
          value: {
            ...state.selectedIntegration.value,
            name: newName
          },
          controls: {
            ...state.selectedIntegration.controls,
            name: setValue(state.selectedIntegration.controls.name, newName)
          }
        }
      };
    }
    return state;

  }),
  on(
    IntegrationActions.resetToInitialState,
    (state) => ({
      ...initialState,
      integrationLoader: state.integrationLoader
    })
  ),
  on(
    IntegrationActions.resetIntegrations,
    (state, {}) => ({
      ...state,
      integrations: initialState.integrations,
    })
  ),
  on(
    IntegrationActions.setIntegrations,
    (state, {integrations}) => ({
      ...state,
      integrations
    })
  ),
  on(
    IntegrationActions.setTargetEntitlementTypes,
    (state, {targetEntitlementTypes}) => ({
      ...state,
      targetEntitlementTypes
    })
  ),
  on(
    IntegrationActions.setSelectedIntegration,
    (state, {selectedIntegration}) => {

      /**
       * Define toggles
       */
      let peopleSoftLogoutIntegration = state.integrationTogglesForms.value.peopleSoftLogoutIntegration;
      if (selectedIntegration.integrationType === IntegrationTypes.Peoplesoft) {
        peopleSoftLogoutIntegration = !!(selectedIntegration.peoplesoft.referers.length || selectedIntegration.peoplesoft.logoutUrl);
      }
      let mssqlAuth = state.integrationTogglesForms.value.mssqlAuth;
      if (selectedIntegration.integrationType === IntegrationTypes.Mssql) {
        mssqlAuth = selectedIntegration.mssql.user === null && selectedIntegration.mssql.password === null ? AuthType.Windows : AuthType.SQL;
      }
      let linuxPwdOrPk = state.integrationTogglesForms.value.linuxPwdOrPk;
      if (selectedIntegration.integrationType === IntegrationTypes.Linux) {
        linuxPwdOrPk = selectedIntegration.linux.password === null
        && selectedIntegration.linux.privateKey !== null ? PwdOrPK.pk : PwdOrPK.pwd;
      }
      return {
        ...state,
        integrationTogglesForms: setValue(state.integrationTogglesForms, {
          linuxPwdOrPk,
          mssqlAuth,
          peopleSoftLogoutIntegration
        }),
        selectedIntegration: setValue(state.selectedIntegration, {
          id: selectedIntegration.id,
          integrationType: selectedIntegration.integrationType,
          environmentType: selectedIntegration.environmentType,
          name: selectedIntegration.name,
          description: selectedIntegration.description,
          alternateName: selectedIntegration.alternateName,
          validationErrors: box(selectedIntegration.validationErrors),
          tags: box(selectedIntegration.tags)
        }),
        selectedIntegrationAWSForm: selectedIntegration.aws ? setValue(state.selectedIntegrationAWSForm, selectedIntegration.aws) : setValue(state.selectedIntegrationAWSForm, initialSelectedIntegrationAWSForm),
        selectedIntegrationAzureAdForm: selectedIntegration.azureAd ? setValue(state.selectedIntegrationAzureAdForm, selectedIntegration.azureAd) : setValue(state.selectedIntegrationAzureAdForm, initialSelectedIntegrationAzureForm),
        selectedIntegrationGoogleForm: selectedIntegration.google ? setValue(state.selectedIntegrationGoogleForm, selectedIntegration.google) : setValue(state.selectedIntegrationGoogleForm, initialSelectedIntegrationGoogleForm),
        selectedIntegrationOracleForm: selectedIntegration.oracle ? setValue(state.selectedIntegrationOracleForm, selectedIntegration.oracle) : setValue(state.selectedIntegrationOracleForm, initialSelectedIntegrationOracleForm),
        selectedIntegrationMssqlForm: selectedIntegration.mssql ? setValue(state.selectedIntegrationMssqlForm, selectedIntegration.mssql) : setValue(state.selectedIntegrationMssqlForm, initialSelectedIntegrationMssqlForm),
        selectedIntegrationPeoplesoftForm: selectedIntegration.peoplesoft ? setValue(state.selectedIntegrationPeoplesoftForm, selectedIntegration.peoplesoft) : setValue(state.selectedIntegrationPeoplesoftForm, initialSelectedIntegrationPeoplesoftForm),
        selectedIntegrationLinuxForm: selectedIntegration.linux ? setValue(state.selectedIntegrationLinuxForm, selectedIntegration.linux) : setValue(state.selectedIntegrationLinuxForm, initialSelectedIntegrationLinuxForm),
        selectedIntegrationRdpForm: selectedIntegration.rdp ? setValue(state.selectedIntegrationRdpForm, selectedIntegration.rdp) : setValue(state.selectedIntegrationRdpForm, initialSelectedIntegrationRdpForm),
        selectedIntegrationCsvForm: selectedIntegration.csv ? setValue(state.selectedIntegrationCsvForm, selectedIntegration.csv) : setValue(state.selectedIntegrationCsvForm, initialSelectedIntegrationCsvForm),
        selectedIntegrationEbsForm: selectedIntegration.ebs ? setValue(state.selectedIntegrationEbsForm, selectedIntegration.ebs) : setValue(state.selectedIntegrationEbsForm, initialSelectedIntegrationEbsForm),
        selectedIntegrationRestApiForm: selectedIntegration.restApi ? setValue(state.selectedIntegrationRestApiForm, selectedIntegration.restApi) : setValue(state.selectedIntegrationRestApiForm, initialSelectedIntegrationRestApiForm),
      };

    }
  ),
  on(
    IntegrationActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
      ...state,
      totalItemsCount
    })
  ),
  on(
    IntegrationActions.nextPage,
    (state, {perPage, page}) => ({
      ...state,
      perPage,
      page
    })
  ),
  on(
    IntegrationActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    IntegrationActions.search,
    (state, {query}) => ({
      ...state,
      query
    })
  ),
  on(
    IntegrationActions.setSettings,
    (state, {settings}) => {
      return {
        ...state,
        settings,
        hrSourceForm: setValue(state.hrSourceForm, {
          joinerRuleBody: settings.hrSourceSettings?.joinerRuleBody,
          moverRuleBody: settings.hrSourceSettings?.moverRuleBody,
          leaverRuleBody: settings.hrSourceSettings?.leaverRuleBody,
          reinstatementRuleBody: settings.hrSourceSettings?.reinstatementRuleBody,
          identityAttributesMappingRuleBody: settings.hrSourceSettings?.identityAttributesMappingRuleBody,
          offboardingApprovalStrategy: settings.hrSourceSettings?.offboardingApprovalStrategy,
          onboardingApprovalStrategy: settings.hrSourceSettings?.onboardingApprovalStrategy,
          transferApprovalStrategy: settings.hrSourceSettings?.transferApprovalStrategy,
          hrSourceEnabled: (settings.hrSourceSettings !== null && settings.hrSourceSettings?.hrSourceEnabled)
        }),
        leaverRuleForm: setValue(state.leaverRuleForm, {terminationRuleBody: settings.terminationRuleBody})
      };
    }
  ),
  on(
    IntegrationActions.disableHRSource,
    (state) => ({
      ...state,
      hrSourceForm: setValue(initialHrSourceForm)(state.hrSourceForm)
    })
  ),
  on(
    IntegrationActions.saveSettings,
    (state) => ({
      ...state,
      settings: {
        ...state.settings,
        hrSourceSettings: state.hrSourceForm.value
      }
    })
  ),
  on(
    IntegrationActions.saveHRSource,
    (state) => ({
      ...state,
      settings: {
        ...state.settings,
        hrSourceSettings: state.hrSourceForm.value
      }
    })
  ),
  on(
    IntegrationActions.saveTerminationRule,
    (state) => ({
      ...state,
      settings: {
        ...state.settings,
        terminationRuleBody: state.leaverRuleForm.value.terminationRuleBody
      }
    })
  ),
  on(
    IntegrationActions.setMetadata,
    (state, {metadata}) => ({
      ...state,
      metadata,
      isConfigLoaded: true
    })
  ),
  on(
    IntegrationActions.updateNetworkLocation,
    (state, {networkLocation}) => ({
      ...state,
      selectedNetworkLocation: networkLocation
    })
  ),
  on(
    IntegrationActions.setSelectedIntegrationID,
    (state, {selectedIntegrationId}) => ({
      ...state,
      selectedIntegrationId,
    })
  ),
  on(
    IntegrationActions.setTargets,
    (state, {targets}) => ({
      ...state,
      targets,
      targetsLookup: targetLookup(targets)
    })
  ),
  on(
    IntegrationActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
      ...state,
      orderBy,
      orderDirection
    })
  ),
  on(
    IntegrationActions.setAdditionalPropertyObjectTypes,
    (state, {additionalPropertyObjectTypes}) => ({
      ...state,
      additionalPropertyObjectTypes
    })
  ),
  on(
    IntegrationActions.setEnvType,
    (state, {envType}) => ({
      ...state,
      envType
    })
  ),
  on(
    IntegrationActions.setAllIdentitiesAndWorkgroups,
    (state, {allIdentitiesAndWorkgroups}) => ({
      ...state,
      allIdentitiesAndWorkgroups
    })
  ),
  on(
    IntegrationActions.setAreBlackListSupported,
    (state, {areBlackWhiteListsSupported}) => ({
      ...state,
      areBlackWhiteListsSupported
    })
  ),
  on(
    IntegrationActions.setBlackListProp,
    (state, {isBlackWhiteListPropertiesVisible}) => ({
      ...state,
      isBlackWhiteListPropertiesVisible
    })
  ),
  on(
    IntegrationActions.startTerminationRuleCompilation,
    (state, {compiling}) => ({
      ...state,
      isTerminationCompiling: compiling
    })
  ),
  on(
    IntegrationActions.startCorrelationCompilation,
    (state, {compiling}) => ({
      ...state,
      isCorrelationCompiling: compiling
    })
  ),
  on(
    IntegrationActions.startCustomizationCompilation,
    (state, {compiling}) => ({
      ...state,
      isCustomizationCompiling: compiling
    })
  ),
  on(
    IntegrationActions.startJoinerCompilation,
    (state, {compiling}) => ({
      ...state,
      isJoinerCompiling: compiling
    })
  ),

  on(
    IntegrationActions.startMoverCompilation,
    (state, {compiling}) => ({
      ...state,
      isMoverCompiling: compiling
    })
  ),
  on(
    IntegrationActions.startLeaverCompilation,
    (state, {compiling}) => ({
      ...state,
      isLeaverCompiling: compiling
    })
  ),
  on(
    IntegrationActions.startReinstatementRuleCompilation,
    (state, {compiling}) => ({
      ...state,
      isReinstatementCompiling: compiling
    })
  ),
  on(
    IntegrationActions.startIdentityAttributesRuleCompilation,
    (state, {compiling}) => ({
      ...state,
      isIdentityAttributesCompiling: compiling
    })
  ),
  on(
    IntegrationActions.setIsConnectionTesting,
    (state, {isConnectionTesting}) => ({
      ...state,
      isConnectionTesting
    })
  ),
  on(
    IntegrationActions.compileLeaverRuleSuccess,
    (state) => ({
      ...state,
      compileLeaverRuleStatus: true,
      compileLeaverRuleMsg: toastMessages.integrationLeaverCompileSuccess,
      isLeaverCompiling: false
    })
  ),
  on(
    IntegrationActions.compileLeaverRuleError,
    (state, {message}) => ({
      ...state,
      compileLeaverRuleStatus: false,
      compileLeaverRuleMsg: message,
      isLeaverCompiling: false
    })
  ),

  on(
    IntegrationActions.compileTerminationSuccess,
    (state) => ({
      ...state,
      compileTerminationRuleStatus: true,
      compileTerminationRuleMsg: toastMessages.integrationTerminationCompileSuccess,
      isTerminationCompiling: false
    })
  ),
  on(
    IntegrationActions.compileTerminationRuleError,
    (state, {message}) => ({
      ...state,
      compileTerminationRuleStatus: false,
      compileTerminationRuleMsg: message,
      isTerminationCompiling: false
    })
  ),
  on(
    IntegrationActions.compileCorrelationRuleSuccess,
    (state) => ({
      ...state,
      compileCorrelationRuleStatus: true,
      compileCorrelationRuleMsg: toastMessages.integrationCorrelationCompileSuccess,
      isCorrelationCompiling: false
    })
  ),
  on(
    IntegrationActions.compileCorrelationRuleError,
    (state, {message}) => ({
      ...state,
      compileCorrelationRuleStatus: false,
      compileCorrelationRuleMsg: message,
      isCorrelationCompiling: false
    })
  ),

  /**
   * Rest Api Integration
   */
  on(
    IntegrationActions.restApiCompileGetMetaDataRule,
    (state) => ({
      ...state,
      isRestApiCompileGetMetadata: true
    })
  ),
  on(
    IntegrationActions.restApiCompileGetMetaDataRuleSuccess,
    (state) => ({
      ...state,
      restApiCompileGetMetaDataRuleStatus: true,
      restApiCompileGetMetaDataRuleMsg: toastMessages.restApiCompileGetMetaDataRuleMsgSuccess,
      isRestApiCompileGetMetadata: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetMetaDataRuleError,
    (state, {message}) => ({
      ...state,
      restApiCompileGetMetaDataRuleStatus: false,
      restApiCompileGetMetaDataRuleMsg: message,
      isRestApiCompileGetMetadata: false
    })
  ),

  on(
    IntegrationActions.restApiCompileGetIntegrationDataRule,
    (state) => ({
      ...state,
      isRestApiGetIntegration: true
    })
  ),
  on(
    IntegrationActions.restApiCompileGetIntegrationDataRuleSuccess,
    (state) => ({
      ...state,
      restApiGetIntegrationDataRuleStatus: true,
      restApiGetIntegrationDataRuleMsg: toastMessages.restApiCompileGetIntegrationDataRuleMsgSuccess,
      isRestApiGetIntegration: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetIntegrationDataRuleError,
    (state, {message}) => ({
      ...state,
      restApiGetIntegrationDataRuleStatus: false,
      restApiGetIntegrationDataRuleMsg: message,
      isRestApiGetIntegration: false
    })
  ),

  on(
    IntegrationActions.restApiCompileCreateAccountRule,
    (state) => ({
      ...state,
      isRestApiCreateAccountRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileCreateAccountRuleSuccess,
    (state) => ({
      ...state,
      restApiCreateAccountRuleStatus: true,
      restApiCreateAccountRuleMsg: toastMessages.restApiCompileCreateAccountRuleMsgSuccess,
      isRestApiCreateAccountRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileCreateAccountRuleError,
    (state, {message}) => ({
      ...state,
      restApiCreateAccountRuleStatus: false,
      restApiCreateAccountRuleMsg: message,
      isRestApiCreateAccountRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileDeleteAccountRule,
    (state) => ({
      ...state,
      isRestApiDeleteAccountRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileDeleteAccountRuleSuccess,
    (state) => ({
      ...state,
      restApiDeleteAccountRuleStatus: true,
      restApiDeleteAccountRuleMsg: toastMessages.restApiCompileDeleteAccountRuleMsgSuccess,
      isRestApiDeleteAccountRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileDeleteAccountRuleError,
    (state, {message}) => ({
      ...state,
      restApiDeleteAccountRuleStatus: false,
      restApiDeleteAccountRuleMsg: message,
      isRestApiDeleteAccountRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileLockAccountRule,
    (state) => ({
      ...state,
      isRestApiLockAccountRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileLockAccountRuleSuccess,
    (state) => ({
      ...state,
      restApiLockAccountRuleStatus: true,
      restApiLockAccountRuleMsg: toastMessages.restApiLockAccountRuleMsgSuccess,
      isRestApiLockAccountRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileLockAccountRuleError,
    (state, {message}) => ({
      ...state,
      restApiLockAccountRuleStatus: false,
      restApiLockAccountRuleMsg: message,
      isRestApiLockAccountRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileUnlockAccountRule,
    (state) => ({
      ...state,
      isRestApiUnlockAccountRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileUnlockAccountRuleSuccess,
    (state) => ({
      ...state,
      restApiUnlockAccountRuleStatus: true,
      restApiUnlockAccountRuleMsg: toastMessages.restApiLockAccountRuleMsgSuccess,
      isRestApiUnlockAccountRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileUnlockAccountRuleError,
    (state, {message}) => ({
      ...state,
      restApiUnlockAccountRuleStatus: false,
      restApiUnlockAccountRuleMsg: message,
      isRestApiUnlockAccountRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileUpdateAccountCredentialRule,
    (state) => ({
      ...state,
      isRestUpdateAccountCredentialsRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountCredentialRuleSuccess,
    (state) => ({
      ...state,
      restApiUpdateAccountCredentialsRuleStatus: true,
      restApiUpdateAccountCredentialsRuleMsg: toastMessages.restApiUpdateAccountCredentialMsgSuccess,
      isRestUpdateAccountCredentialsRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountCredentialRuleError,
    (state, {message}) => ({
      ...state,
      restApiUpdateAccountCredentialsRuleStatus: false,
      restApiUpdateAccountCredentialsRuleMsg: message,
      isRestUpdateAccountCredentialsRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileUpdateAccountAdditionalPropertiesRule,
    (state) => ({
      ...state,
      isRestUpdateAccountAdditionalPropertiesRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountAdditionalPropertiesRuleSuccess,
    (state) => ({
      ...state,
      restApiUpdateAccountAdditionalPropertiesRuleStatus: true,
      restApiUpdateAccountAdditionalPropertiesRuleMsg: toastMessages.restApiUpdateAccountAdditionalPropertiesMsgSuccess,
      isRestUpdateAccountAdditionalPropertiesRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountAdditionalPropertiesRuleError,
    (state, {message}) => ({
      ...state,
      restApiUpdateAccountAdditionalPropertiesRuleStatus: false,
      restApiUpdateAccountAdditionalPropertiesRuleMsg: message,
      isRestUpdateAccountAdditionalPropertiesRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountEntitlementsDeltaRule,
    (state) => ({
      ...state,
      isRestUpdateAccountEntitlementsDeltaRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountEntitlementsDeltaRuleSuccess,
    (state) => ({
      ...state,
      restApiUpdateAccountEntitlementsDeltaRuleStatus: true,
      restApiUpdateAccountEntitlementsDeltaRuleMsg: toastMessages.restApiUpdateAccountEntitlementsDeltaMsgSuccess,
      isRestUpdateAccountEntitlementsDeltaRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountEntitlementsDeltaRuleError,
    (state, {message}) => ({
      ...state,
      restApiUpdateAccountEntitlementsDeltaRuleStatus: false,
      restApiUpdateAccountEntitlementsDeltaRuleMsg: message,
      isRestUpdateAccountEntitlementsDeltaRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileUpdateAccountEntitlementsDeltaRule,
    (state) => ({
      ...state,
      isRestUpdateAccountEntitlementsDeltaRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountEntitlementsDeltaRuleSuccess,
    (state) => ({
      ...state,
      restApiUpdateAccountEntitlementsDeltaRuleStatus: true,
      restApiUpdateAccountEntitlementsDeltaRuleMsg: toastMessages.restApiUpdateAccountEntitlementsDeltaMsgSuccess,
      isRestUpdateAccountEntitlementsDeltaRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileUpdateAccountEntitlementsDeltaRuleError,
    (state, {message}) => ({
      ...state,
      restApiUpdateAccountEntitlementsDeltaRuleStatus: false,
      restApiUpdateAccountEntitlementsDeltaRuleMsg: message,
      isRestUpdateAccountEntitlementsDeltaRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileGetActiveLoginsRule,
    (state) => ({
      ...state,
      isRestGetActiveLoginsRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileGetActiveLoginsRuleSuccess,
    (state) => ({
      ...state,
      restApiGetActiveLoginsRuleStatus: true,
      restApiGetActiveLoginsRuleMsg: toastMessages.restApiGetActiveLoginsRuleMsgSuccess,
      isRestGetActiveLoginsRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetActiveLoginsRuleError,
    (state, {message}) => ({
      ...state,
      restApiGetActiveLoginsRuleStatus: false,
      restApiGetActiveLoginsRuleMsg: message,
      isRestGetActiveLoginsRule: false
    })
  ),

  on(
    IntegrationActions.restApiCompileGetBlacklistedLoginAttemptsRule,
    (state) => ({
      ...state,
      isRestGetBlacklistedLoginAttemptsRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileGetBlacklistedLoginAttemptsRuleSuccess,
    (state) => ({
      ...state,
      restApiGetBlacklistedLoginAttemptsRuleStatus: true,
      restApiGetBlacklistedLoginAttemptsRuleMsg: toastMessages.restApiGetBlacklistedLoginAttemptsRuleMsgSuccess,
      isRestGetBlacklistedLoginAttemptsRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetBlacklistedLoginAttemptsRuleError,
    (state, {message}) => ({
      ...state,
      restApiGetBlacklistedLoginAttemptsRuleStatus: false,
      restApiGetBlacklistedLoginAttemptsRuleMsg: message,
      isRestGetBlacklistedLoginAttemptsRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetBlackListRule,
    (state) => ({
      ...state,
      isRestGetBlackListRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileGetBlackListRuleSuccess,
    (state) => ({
      ...state,
      restApiGetBlackListRuleStatus: true,
      restApiGetBlackListRuleMsg: toastMessages.restApiGetBlackListRuleMsgSuccess,
      isRestGetBlackListRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetBlackListRuleError,
    (state, {message}) => ({
      ...state,
      restApiGetBlackListRuleStatus: false,
      restApiGetBlackListRuleMsg: message,
      isRestGetBlackListRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileSetBlackListRule,
    (state) => ({
      ...state,
      isRestSetBlackListRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileSetBlackListRuleSuccess,
    (state) => ({
      ...state,
      restApiSetBlackListRuleStatus: true,
      restApiSetBlackListRuleMsg: toastMessages.restApiSetBlackListRuleMsgSuccess,
      isRestSetBlackListRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileSetBlackListRuleError,
    (state, {message}) => ({
      ...state,
      restApiSetBlackListRuleStatus: false,
      restApiSetBlackListRuleMsg: message,
      isRestSetBlackListRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetCustomAuthHeaderRule,
    (state) => ({
      ...state,
      isRestGetCustomAuthHeaderRule: true
    })
  ),
  on(
    IntegrationActions.restApiCompileGetCustomAuthHeaderRuleSuccess,
    (state) => ({
      ...state,
      restApiGetCustomAuthHeaderRuleStatus: true,
      restApiGetCustomAuthHeaderRuleMsg: toastMessages.restApiGetCustomAuthHeaderRuleMsgSuccess,
      isRestGetCustomAuthHeaderRule: false
    })
  ),
  on(
    IntegrationActions.restApiCompileGetCustomAuthHeaderRuleError,
    (state, {message}) => ({
      ...state,
      restApiGetCustomAuthHeaderRuleStatus: false,
      restApiGetCustomAuthHeaderRuleMsg: message,
      isRestGetCustomAuthHeaderRule: false
    })
  ),
  /**
   * Rest Api END
   */
  /**
   * CSV Start
   */
  on(
    IntegrationActions.csvCompileGetMetadataMappingRule,
    (state) => ({
      ...state,
      isCsvCompileGetMetadataMappingRule: true
    })
  ),
  on(
    IntegrationActions.csvCompileGetMetadataMappingRuleSuccess,
    (state) => ({
      ...state,
      csvCompileGetMetadataMappingRuleStatus: true,
      csvCompileGetMetadataMappingRuleMsg: toastMessages.csvGetMetadataMappingRuleMsgSuccess,
      isCsvCompileGetMetadataMappingRule: false
    })
  ),
  on(
    IntegrationActions.csvCompileGetMetadataMappingRuleError,
    (state, {message}) => ({
      ...state,
      csvCompileGetMetadataMappingRuleStatus: false,
      csvCompileGetMetadataMappingRuleMsg: message,
      isCsvCompileGetMetadataMappingRule: false
    })
  ),

  on(
    IntegrationActions.csvCompileGetIntegrationDataMappingRule,
    (state) => ({
      ...state,
      isCsvCompileGetIntegrationDataMappingRule: true
    })
  ),
  on(
    IntegrationActions.csvCompileGetIntegrationDataMappingRuleSuccess,
    (state) => ({
      ...state,
      csvCompileGetIntegrationDataMappingRuleStatus: true,
      csvCompileGetIntegrationDataMappingRuleMsg: toastMessages.csvGetIntegrationDataMappingRuleMsgSuccess,
      isCsvCompileGetIntegrationDataMappingRule: false
    })
  ),
  on(
    IntegrationActions.csvCompileGetIntegrationDataMappingRuleError,
    (state, {message}) => ({
      ...state,
      csvCompileGetIntegrationDataMappingRuleStatus: false,
      csvCompileGetIntegrationDataMappingRuleMsg: message,
      isCsvCompileGetIntegrationDataMappingRule: false
    })
  ),
  /**
   * CSV END
   */
  on(
    IntegrationActions.addHttpUrl,
    (state) => {
      const array = state.selectedIntegrationCsvForm.controls.httpUrls;
      return {
        ...state,
        selectedIntegrationCsvForm: {
          ...state.selectedIntegrationCsvForm,
          controls: {
            ...state.selectedIntegrationCsvForm.controls,
            httpUrls: addArrayControl(array, '')
          }
        }
      };
    }
  ),
  on(
    IntegrationActions.addReferer,
    (state) => {
      const array = state.selectedIntegrationPeoplesoftForm.controls.referers;
      return {
        ...state,
        selectedIntegrationPeoplesoftForm: {
          ...state.selectedIntegrationPeoplesoftForm,
          controls: {
            ...state.selectedIntegrationPeoplesoftForm.controls,
            referers: addArrayControl(array, '')
          }
        }
      };
    }
  ),

  on(
    IntegrationActions.rmHttpUrl,
    (state, {index}) => {
      const array = state.selectedIntegrationCsvForm.controls.httpUrls;
      const arrayWithControl = removeArrayControl(array, index);
      return {
        ...state,
        selectedIntegrationCsvForm: {
          ...state.selectedIntegrationCsvForm,
          controls: {
            ...state.selectedIntegrationCsvForm.controls,
            httpUrls: arrayWithControl
          },
          value: {
            ...state.selectedIntegrationCsvForm.value,
            httpUrls: arrayWithControl.value
          }
        }
      };
    }
  ), on(
    IntegrationActions.rmReferer,
    (state, {index}) => {
      const array = state.selectedIntegrationPeoplesoftForm.controls.referers;
      const arrayWithControl = removeArrayControl(array, index);
      return {
        ...state,
        selectedIntegrationPeoplesoftForm: {
          ...state.selectedIntegrationPeoplesoftForm,
          controls: {
            ...state.selectedIntegrationPeoplesoftForm.controls,
            referers: arrayWithControl
          },
          value: {
            ...state.selectedIntegrationPeoplesoftForm.value,
            referers: arrayWithControl.value
          }
        }
      };
    }
  ),
  on(
    IntegrationActions.compileCustomizationRuleSuccess,
    (state) => ({
      ...state,
      compileCustomizationRuleStatus: true,
      compileCustomizationRuleMsg: toastMessages.integrationCustomizationCompileSuccess,
      isCustomizationCompiling: false
    })
  ),
  on(
    IntegrationActions.compileCustomizationRuleError,
    (state, {message}) => ({
      ...state,
      compileCustomizationRuleStatus: false,
      compileCustomizationRuleMsg: message,
      isCustomizationCompiling: false
    })
  ),
  on(
    IntegrationActions.compileJoinerRuleSuccess,
    (state,) => ({
      ...state,
      compileJoinerRuleStatus: true,
      compileJoinerRuleMsg: toastMessages.integrationJoinerCompileSuccess,
      isJoinerCompiling: false
    })
  ),
  on(
    IntegrationActions.compileJoinerRuleError,
    (state, {message}) => ({
      ...state,
      compileJoinerRuleStatus: false,
      compileJoinerRuleMsg: message,
      isJoinerCompiling: false
    })
  ),
  on(
    IntegrationActions.compileMoverRuleSuccess,
    (state) => ({
      ...state,
      isMoverCompiling: false,
      compileMoverRuleStatus: true,
      compileMoverRuleMsg: toastMessages.integrationMoverCompileSuccess,
    })
  ),
  on(
    IntegrationActions.compileMoverRuleError,
    (state, {message}) => ({
      ...state,
      compileMoverRuleStatus: false,
      compileMoverRuleMsg: message,
      isMoverCompiling: false
    })
  ),
  on(
    IntegrationActions.compileReinstatementRuleSuccess,
    (state) => ({
      ...state,
      isReinstatementCompiling: false,
      compileReinstatementRuleStatus: true,
      compileReinstatementRuleMsg: toastMessages.integrationReinstatementCompileSuccess,
    })
  ),
  on(
    IntegrationActions.compileReinstatementRuleError,
    (state, {message}) => ({
      ...state,
      compileReinstatementRuleStatus: false,
      compileReinstatementRuleMsg: message,
      isReinstatementCompiling: false
    })
  ),
  on(
    IntegrationActions.compileIdentityAttributesRuleSuccess,
    (state) => ({
      ...state,
      isIdentityAttributesCompiling: false,
      compileIdentityAttributesRuleStatus: true,
      compileIdentityAttributesRuleMsg: toastMessages.integrationIdentityAttributesCompileSuccess,
    })
  ),
  on(
    IntegrationActions.compileIdentityAttributesRuleError,
    (state, {message}) => ({
      ...state,
      compileIdentityAttributesRuleStatus: false,
      compileIdentityAttributesRuleMsg: message,
      isIdentityAttributesCompiling: false
    })
  ),
  on(
    IntegrationActions.testIntegrationConnection,
    (state) => ({
      ...state,
      isConnectionTesting: true,
    })
  ),
  on(
    IntegrationActions.testIntegrationConnectionSuccess,
    (state) => ({
      ...state,
      isConnectionTesting: false,
    })
  ),
  on(
    IntegrationActions.testIntegrationConnectionError,
    (state) => ({
      ...state,
      isConnectionTesting: false,
    })
  ),
  /**
   * Refactored
   */
  on(
    IntegrationActions.initIntegration,
    (state, {integrationType}) => ({
      ...state,
      selectedIntegration: setValue(state.selectedIntegration, {
        ...initialSelectedIntegrationForm,
        integrationType
      }),
    })
  ),
  on(
    IntegrationActions.initAWSIntegration,
    (state) => ({
      ...state,
      selectedIntegrationAWSForm: setValue(state.selectedIntegrationAWSForm, initialSelectedIntegrationAWSForm),
    })
  ),
  on(
    IntegrationActions.initAzureAdIntegration,
    (state) => ({
      ...state,
      selectedIntegrationAzureAdForm: setValue(state.selectedIntegrationAzureAdForm, initialSelectedIntegrationAzureForm),
    })
  ),
  on(
    IntegrationActions.initGoogleIntegration,
    (state) => ({
      ...state,
      selectedIntegrationGoogleForm: setValue(state.selectedIntegrationGoogleForm, initialSelectedIntegrationGoogleForm),
    })
  ),
  on(
    IntegrationActions.initOracleIntegration,
    (state) => ({
      ...state,
      selectedIntegrationOracleForm: setValue(state.selectedIntegrationOracleForm, initialSelectedIntegrationOracleForm),
    })
  ),
  on(
    IntegrationActions.initMssqlIntegration,
    (state) => ({
      ...state,
      selectedIntegrationMssqlForm: setValue(state.selectedIntegrationMssqlForm, initialSelectedIntegrationMssqlForm),
    })
  ),
  on(
    IntegrationActions.initPeoplesoftIntegration,
    (state) => ({
      ...state,
      selectedIntegrationPeoplesoftForm: setValue(state.selectedIntegrationPeoplesoftForm, initialSelectedIntegrationPeoplesoftForm),
    })
  ),
  on(
    IntegrationActions.initPeoplesoftIntegration,
    (state) => ({
      ...state,
      selectedIntegrationLinuxForm: setValue(state.selectedIntegrationLinuxForm, initialSelectedIntegrationLinuxForm),
    })
  ),
  on(
    IntegrationActions.initRdpIntegration,
    (state) => ({
      ...state,
      selectedIntegrationRdpForm: setValue(state.selectedIntegrationRdpForm, initialSelectedIntegrationRdpForm),
    })
  ),
  on(
    IntegrationActions.initCsvIntegration,
    (state) => {
      if (!state.selectedIntegrationCsvForm?.isDirty) {
        return {
          ...state,
          selectedIntegrationCsvForm: setValue(state.selectedIntegrationCsvForm, initialSelectedIntegrationCsvForm),
        };
      } else {
        return {
          ...state,
        };
      }

    }
  ),
  on(
    IntegrationActions.initEbsIntegration,
    (state) => ({
      ...state,
      selectedIntegrationEbsForm: setValue(state.selectedIntegrationEbsForm, initialSelectedIntegrationEbsForm),
    })
  ),
  on(
    IntegrationActions.initRestApiIntegration,
    (state) => {
      if (!state.selectedIntegrationRestApiForm?.isDirty) {
        return {
          ...state,
          selectedIntegrationRestApiForm: setValue(state.selectedIntegrationRestApiForm, initialSelectedIntegrationRestApiForm),
        };
      } else {
        return {
          ...state,
        };
      }
    }
  ),
  on(
    IntegrationActions.validateIntegration,
    (state, action) => ({
      ...validateIntegration(state, action),
      validationCalled: true
    })
  ),
  on(
    IntegrationActions.integrationLoader,
    (state, {loader}) => ({
      ...state,
      integrationLoader: loader
    })
  ),
  on(
    IntegrationActions.resetValidationCalled,
    (state) => ({
      ...state,
      validationCalled: initialState.validationCalled
    })
  )
);


const targetLookup = (targets: Target[]) => {
  const res = {};
  targets.map(item => {
    res[item.id] = item.name;
  });
  return res;
};


const validateIntegration = (state, action: Action) => ({
  ...state,
  selectedIntegration: validateBodyIntegration(state.selectedIntegration, action),
  selectedIntegrationAWSForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Aws ? validateAwsIntegration(state.selectedIntegrationAWSForm, action) : setValue(state.selectedIntegrationAWSForm, initialSelectedIntegrationAWSForm),
  selectedIntegrationAzureAdForm: state.selectedIntegration.value.integrationType === IntegrationTypes.AzureAd ? validateAzureAdIntegration(state.selectedIntegrationAzureAdForm, action) : setValue(state.selectedIntegrationAzureAdForm, initialSelectedIntegrationAzureForm),
  selectedIntegrationGoogleForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Google ? validateGoogleIntegration(state.selectedIntegrationGoogleForm, action) : setValue(state.selectedIntegrationGoogleForm, initialSelectedIntegrationGoogleForm),
  selectedIntegrationOracleForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Oracle ? validateOracleIntegration(state.selectedIntegrationOracleForm, action) : setValue(state.selectedIntegrationOracleForm, initialSelectedIntegrationOracleForm),
  selectedIntegrationMssqlForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Mssql ? validateMssqlIntegration(state.selectedIntegrationMssqlForm, action) : setValue(state.selectedIntegrationMssqlForm, initialSelectedIntegrationMssqlForm),
  selectedIntegrationPeoplesoftForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Peoplesoft ? validatePeoplesoftIntegration(state.selectedIntegrationPeoplesoftForm, action) : setValue(state.selectedIntegrationPeoplesoftForm, initialSelectedIntegrationPeoplesoftForm),
  selectedIntegrationLinuxForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Linux ? validateLinuxIntegration(state.selectedIntegrationLinuxForm, action) : setValue(state.selectedIntegrationLinuxForm, initialSelectedIntegrationLinuxForm),
  selectedIntegrationRdpForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Rdp ? validateRdpIntegration(state.selectedIntegrationRdpForm, action) : setValue(state.selectedIntegrationRdpForm, initialSelectedIntegrationRdpForm),
  selectedIntegrationCsvForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Csv ? validateCsvIntegration(state.selectedIntegrationCsvForm, action) : setValue(state.selectedIntegrationCsvForm, initialSelectedIntegrationCsvForm),
  selectedIntegrationEbsForm: state.selectedIntegration.value.integrationType === IntegrationTypes.Ebs ? validateEbsIntegration(state.selectedIntegrationEbsForm, action) : setValue(state.selectedIntegrationEbsForm, initialSelectedIntegrationEbsForm),
  selectedIntegrationRestApiForm: state.selectedIntegration.value.integrationType === IntegrationTypes.RestApi ? validateRestApiIntegration(state.selectedIntegrationRestApiForm, action) : setValue(state.selectedIntegrationRestApiForm, initialSelectedIntegrationRestApiForm),
});
