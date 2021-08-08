import { MetaData, Target } from '../../pages/identity-automation/pages/integration/models/account.model';
import { TargetEntitlementTypes } from './entitlement.model';
import { Settings } from '../../pages/identity-automation/pages/integration/models/settings.model';
import { AllIdentitiesAndWorkgroups } from './integration.model';

export declare interface IntegrationAccount {
  additionalProperties: {};
  credentialsExpireOn: string;
  id: string;
  isLocked: boolean;
  name: string;
  ssoId: string;
  supportsCredentials: boolean;
  targetId: string;
}

export declare interface IntegrationAccountApiResponse {
  allIdentitiesAndWorkgroups: { allIdentities: any[]; allWorkgroups: any[] };
  integrationData: IntegrationData;
  totalItemsCount: number;
}

export declare interface IntegrationData {
  data: Data;
  metadata: MetaData;
  settings: Settings;
}

export declare interface Data {
  accounts: IntegrationAccount[];
  accountsEntitlements: {};
  additionalPropertyObjects: [];
  areBlackWhiteListsSupported: false;
  isBlackListSupported: boolean;
  implicitEntitlements: null;
  targets: Target[];
}

export declare interface IntegrationApiConfigResponse {
  additionalPropertyObjectTypes: any[];
  allIdentitiesAndWorkgroups: AllIdentitiesAndWorkgroups;
  integrationData: IntegrationData;
  targetEntitlementTypes: TargetEntitlementTypes[];
  integrationType: string;
}
