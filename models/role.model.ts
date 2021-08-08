import { PaginationParams } from 'src/app/models/pagination.model';
import { SortParams } from '../../pages/identity-automation/pages/integration/models/integration.model';
import { NameId } from './identity.model';

export declare interface Role {
  id: number;
  name: string;
  status: string;
  owner: { id: number; type: string };
  isRequestable: boolean;
  isAutoApproved: boolean;
  entitlementIds: { integrationId: number; entitlementId: string }[];
  itRoleIds: number[];
  type: RoleType;
  assignmentRuleBody: string;
  description: string;
  ownerIdentity: { id: number; name: string };
}

export declare interface RolesApiResponse {
  roles: Role[];
  identityOwners: { name: string; id: number }[];
  workgroupOwners: { name: string; id: number }[];
  totalItemsCount: number;
}

export enum RoleType {
  it = 'IT',
  birthright = 'Birthright'
}

export declare interface RoleApiResponse {
  role: Role;
  assignmentRuleCompilationError: string;
}

export enum RoleEntitlementMode {
  targetAccount,
  role
}

export declare interface RoleEntitlement {
  id: string;
  targetId: string;
  integrationId: number;
  entitlementName: string;
  targetName: string;
  integrationName: string;
  targetType: string;
  integrationType: string;
  entitlementType: string;
}

export declare interface RoleEntitlementsApiResponse {
  entitlements: RoleEntitlement[];
  totalItemsCount: number;
  accountEntitlements?: RoleEntitlement[];
}

export declare interface RoleEntitlementsRequestParams {
  roleId: number;
  pagination: PaginationParams;
  ordering: SortParams;
  query: string;
}


export declare interface IncludedItRolesApiResponse {
  roles: NameId[];
  totalItemsCount: number;
}
