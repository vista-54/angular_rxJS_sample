import { EnvironmentTypes, IntegrationTypes } from '@const/environment-types.const';
import { CredentialsType } from '@enums/credentials-type';
import { PaginationParams } from 'src/app/models/pagination.model';
import { SortParams } from '../../pages/identity-automation/pages/integration/models/integration.model';

export declare interface TargetAccountResponse {
  accounts: any[];
  totalItemsCount: number;
}

declare interface ConnectionDetails {
  type: CredentialsType;
  value: string;
  name: string;
}

declare interface Credentials {
  password: string;
  privateKey: string;
}

export declare interface TargetAccount {
  integrationId: number;
  integrationName: string;
  targetId: string;
  targetName: string;
  integrationType: IntegrationTypes;
  environmentType: EnvironmentTypes;
  targetType: string;
  accountId: string;
  name: string;
  isLocked: boolean;
  credentialsExpireOn: string;
  credentials: Credentials;
  isDirectlyOwned: boolean;
  connectionDetails: ConnectionDetails[];
}

export declare interface TargetAccountEntitlementsRequestParams {
  targetAccount: TargetAccountEntitlementsRequest;
  ordering: SortParams;
  pagination: PaginationParams;
  query: string;
}

export declare interface TargetAccountEntitlementsRequest {
  integrationId: number;
  targetId: string;
  accountId: string;
}
