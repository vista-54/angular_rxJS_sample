import { AllIdentitiesAndWorkgroups } from './general-workflow-settings.model';
import { GeneralWorkflowSetting, Settings } from '../../pages/identity-automation/pages/integration/models/settings.model';
import { IntegrationTypes } from '@const/environment-types.const';

export declare interface EntitlementByTargetAndTypeApiResponse {
  additionalPropertyObjects: any[];
  allIdentitiesAndWorkgroups: AllIdentitiesAndWorkgroups;
  entitlementsIds: [];
  implicitEntitlements: {};
  targets: Target[];
  totalItemsCount: number;
  integrationType: string;
}

export declare interface TargetEntitlementTypes {
  entitlementTypes: string[];
  targetId: string;
}

export declare interface EntitlementsSubTabsTargetId {
  tab: string;
  target: string;
}

export declare interface SelectParamsForInheritValues {
  envType: IntegrationTypes;
  generalWorkflowSettings: GeneralWorkflowSetting;
  identityWorkgroupsDictionary: AllIdentitiesAndWorkgroups;
  settings: Settings;
  targetId: string;
}


export declare interface Target {
  accountsEligibleForEntitlementsFromAllTargets: boolean;
  entitlements: any [];
  id: string;
  name: string;
  type: string;
}

export declare interface EntitlementSubTabsWithTargets {
  targetName: string;
  entitlementSubTab: string[];
}
