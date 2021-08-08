export declare interface Identity {
  id: number;
  name: string;
  userId: string;
  additionalProperties: any;
  type: string;
  status: string;
  email: string;
  hrSourceIntegrationId: number;
  managerIdentityId: number;
  hrSourceAccountId: string;
  startDate: string;
  endDate: string;
}

export declare interface NameId {
  name: string;
  id: number;
}

export declare interface SourceIntegration extends NameId {
  environmentType?: string;
  environmentName?: string;
  integrationType: string;
}

export declare interface IdentitiesApiResponse {
  identities: Identity[];
  managerIdentities: NameId[];
  sourceIntegrations: SourceIntegration[];
  users: NameId[];
  totalItemsCount: number;
}

export declare interface IdentityApiResponse {
  identity: Identity;
  managerIdentity: NameId;
  sourceIntegration: SourceIntegration;
  localUser: NameId;
}

export declare interface WorkgroupsApiResponse {
  identityWorkgroupsIds: number[];
  allWorkgroups: NameId[];
}
