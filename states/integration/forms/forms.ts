import { IntegrationModel, IntegrationTogglesForm } from '@models/integration.model';
import { EnvironmentTypes } from '@const/environment-types.const';
import { AWSModel } from '../../../../pages/identity-automation/pages/integration/models/aws.model';
import { AzureAdModel } from '../../../../pages/identity-automation/pages/integration/models/azureAd.model';
import { GoogleModel } from '../../../../pages/identity-automation/pages/integration/models/google.model';
import { OracleModel } from '../../../../pages/identity-automation/pages/integration/models/oracle.model';
import { MssqlModel } from '../../../../pages/identity-automation/pages/integration/models/mssql.model';
import { PeoplesoftModel } from '../../../../pages/identity-automation/pages/integration/models/peoplesoft.model';
import { LinuxModel } from '../../../../pages/identity-automation/pages/integration/models/linux.model';
import { RdpModel } from '../../../../pages/identity-automation/pages/integration/models/rdp.model';
import { CsvModel } from '../../../../pages/identity-automation/pages/integration/models/csv.model';
import { AuthSchemaType, NetworkLocation } from '@enums/integrations';
import { EbsModel } from '../../../../pages/identity-automation/pages/integration/models/ebs.model';
import { RestApiModel } from '../../../../pages/identity-automation/pages/integration/models/rest-api.model';
import { box } from 'ngrx-forms';
import { AuthType, PwdOrPK } from '../../../../pages/identity-automation/pages/integration/models/integration.model';
import { HrSourceSettings, LeaverRuleForm } from '../../../../pages/identity-automation/pages/integration/models/settings.model';

export const HR_SOURCE_FORM_ID = 'HR SOURCE FORM';
export const LEAVER_RULE_FORM_ID = 'LEAVER RULE FORM';
export const SELECTED_INTEGRATION_FORM_ID = 'SELECTED INTEGRATION FORM ID';
export const SELECTED_INTEGRATION_AWS_FORM_ID = 'SELECTED INTEGRATION AWS FORM ID';
export const SELECTED_INTEGRATION_AZURE_FORM_ID = 'SELECTED INTEGRATION AZURE FORM ID';
export const SELECTED_INTEGRATION_GOOGLE_FORM_ID = 'SELECTED INTEGRATION GOOGLE FORM ID';
export const SELECTED_INTEGRATION_ORACLE_FORM_ID = 'SELECTED INTEGRATION ORACLE FORM ID';
export const SELECTED_INTEGRATION_MSSQL_FORM_ID = 'SELECTED INTEGRATION MSSQL FORM ID';
export const SELECTED_INTEGRATION_PEOPLESOFT_FORM_ID = 'SELECTED INTEGRATION PEOPLESOFT FORM ID';
export const SELECTED_INTEGRATION_LINUX_FORM_ID = 'SELECTED INTEGRATION LINUX FORM ID';
export const SELECTED_INTEGRATION_RDP_FORM_ID = 'SELECTED INTEGRATION RDP FORM ID';
export const SELECTED_INTEGRATION_CSV_FORM_ID = 'SELECTED INTEGRATION CSV FORM ID';
export const SELECTED_INTEGRATION_EBS_FORM_ID = 'SELECTED INTEGRATION EBS FORM ID';
export const SELECTED_INTEGRATION_REST_API_FORM_ID = 'SELECTED INTEGRATION REST API FORM ID';
export const INTEGRATION_TOGGLES_FORM_ID = 'LINUX PWD OR PK FORM ID';


export const initialSelectedIntegrationForm: IntegrationModel = {
  id: 0,
  name: 'New Integration',
  alternateName: null,
  description: null,
  tags: box([]),
  environmentType: EnvironmentTypes.Na,
  integrationType: null,
  validationErrors: null
};

export const initialSelectedIntegrationAWSForm: AWSModel = {
  accessKey: null,
  secretAccessKey: null,
  loginUrl: null
};

export const initialSelectedIntegrationAzureForm: AzureAdModel = {
  clientId: null,
  clientSecret: null,
  tenantId: null,
  loginUrl: null
};

export const initialSelectedIntegrationGoogleForm: GoogleModel = {
  privateKey: null,
  clientEmail: null,
  domain: null,
  adminEmail: null,
  loginUrl: null
};

export const initialSelectedIntegrationOracleForm: OracleModel = {
  address: null,
  port: null,
  serviceName: null,
  user: null,
  password: null,
};

export const initialSelectedIntegrationMssqlForm: MssqlModel = {
  address: null,
  instanceName: null,
  user: null,
  password: null
};

export const initialSelectedIntegrationPeoplesoftForm: PeoplesoftModel = {
  hostName: null,
  port: null,
  serviceName: null,
  user: null,
  password: null,
  address: null,
  psTablesPrefixOptional: null,
  templateUserId: null,
  logoutUrl: null,
  referers: [],
};

export const initialSelectedIntegrationLinuxForm: LinuxModel = {
  user: null,
  password: null,
  privateKey: null,
  address: null,
  osType: null
};

export const initialSelectedIntegrationRdpForm: RdpModel = {
  user: null,
  password: null,
  address: null,
};

export const initialSelectedIntegrationCsvForm: CsvModel = {
  ftpLocation: null,
  getMetadataRuleBody: null,
  password: null,
  user: null,
  serverFolder: null,
  networkShare: null,
  httpUrls: [],
  getIntegrationDataRuleBody: null,
  encoding: 'utf-8',
  csvHeaders: false,
  csvQuoter: null,
  csvDelimiter: null,
  integrationId: 0,
  networkLocationType: NetworkLocation.noLocation
};

export const initialSelectedIntegrationEbsForm: EbsModel = {
  hostName: null,
  port: null,
  serviceName: null,
  user: null,
  password: null,
  address: null
};

export const initialSelectedIntegrationRestApiForm: RestApiModel = {
  baseAddress: null,
  authType: AuthSchemaType.noAuth,
  // AuthSchemaType Basic auth
  user: null,
  password: null,
  // AuthSchemaType Bearer
  bearerToken: null,
  // AuthSchemaType Api Key Token Auth
  customHeaderName: null,
  customHeaderValue: null,
  // AuthSchemaType OAuth2
  authority: null,
  clientId: null,
  clientSecret: null,
  scope: null,
  getCustomAuthHeaderRuleBody: null,

  getMetadataRuleBody: null,
  getIntegrationDataRuleBody: null,
  createAccountRuleBody: null,
  deleteAccountDataRuleBody: null,
  lockAccountRuleBody: null,
  unlockAccountRuleBody: null,
  updateAccountCredentialsRuleBody: null,
  updateAccountAdditionalPropertiesRuleBody: null,
  updateAccountEntitlementsDeltaRuleBody: null,
  getActiveLoginsRuleBody: null,
  getBlacklistedLoginAttemptsRuleBody: null,
  getBlackListRuleBody: null,
  setBlackListRuleBody: null
};


export const initialIntegrationTogglesForms: IntegrationTogglesForm = {
  linuxPwdOrPk: PwdOrPK.pwd,
  mssqlAuth: AuthType.Windows,
  peopleSoftLogoutIntegration: false
};

export const initialHrSourceForm: HrSourceSettings = {
  joinerRuleBody: null,
  moverRuleBody: null,
  leaverRuleBody: null,
  reinstatementRuleBody: null,
  identityAttributesMappingRuleBody: null,
  offboardingApprovalStrategy: null,
  onboardingApprovalStrategy: null,
  transferApprovalStrategy: null,
  hrSourceEnabled: false
};

export const initialLeaverRuleForm: LeaverRuleForm = {
  terminationRuleBody: null
};
