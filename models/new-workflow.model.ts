import { IdentityHeader } from '../../pages/identity-automation/pages/workflow/new-workflow/models/identity.model';
import { RequestedItem, RequestedItemData } from '../../pages/identity-automation/pages/workflow/new-workflow/models/requested-item.model';

export enum NewWorkflowType {
  PermanentAccessRequest,
  PrivilegedUnlockRequest,
  TemporaryAccessRequest
}

export declare interface WorkflowByIdResponse {
  beneficiary: IdentityHeader;
  requestedItems: RequestedItemData[];
}
