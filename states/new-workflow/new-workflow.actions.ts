import { createAction, props } from '@ngrx/store';
import { AccountType } from 'src/app/models/account-type.model';
import { IdentityHeader } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/identity.model';
import { AccountHeader } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/owned-account.model';
import { RequestedItem, RequestedItemData } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/requested-item.model';
import { RoleOwner, OwnerInfo, RoleType, RoleBrief } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/role.model';
import { SelectedTargetAccountOption, TargetAccountOptions } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/target-account.model';
import { NewWorkflowType } from '../../models/new-workflow.model';

export const getItemsOptions = createAction(
  '[Requested Item Autocomplete] Get Items Options',
  props<{ searchTerm: string }>()
);

export const setItemsOptions = createAction(
  '[Requested Item Autocomplete] Set Items Options',
  props<{ requestedItems: RequestedItem[]; requestedItemsLeft?: number }>()
);

export const clearItemsOptions = createAction(
  '[Requested Item Autocomplete] Clear Items Options'
);

export const getSubItemsOptions = createAction(
  '[Requested Item Autocomplete] Get SubItems Options',
  props<{ searchTerm: string; index: number }>()
);

export const setSelectedRequestedItems = createAction(
  '[Requested Item Autocomplete] Set Selected Items',
  props<{ selectedItems: RequestedItem[] }>()
);

export const setSelectedRequestedItemsData = createAction(
  '[Requested Item Autocomplete] Set Selected Items Data',
  props<{ selectedItems: RequestedItemData[] }>()
);

export const getAllBeneficiaryOptions = createAction(
  '[Beneficiary] Get All Beneficiary Options'
);

export const setAllBeneficiaryOptions = createAction(
  '[Beneficiary] Set All Beneficiary Options',
  props<{ beneficiaries: IdentityHeader[] }>()
);

export const getBeneficiaryOptions = createAction(
  '[Beneficiary Autocomplete] Get Beneficiary Options',
);

export const setSearchTerm = createAction(
  '[Beneficiary Autocomplete] Set Query Term',
  props<{ searchTerm: string }>()
);

export const setBeneficiaryOptions = createAction(
  '[Beneficiary Autocomplete] Set Beneficiary Options',
  props<{ beneficiaries: IdentityHeader[] }>()
);

export const setBeneficiary = createAction(
  '[Beneficiary Autocomplete] Set Beneficiary',
  props<{ beneficiary: IdentityHeader }>()
);

export const clearBeneficiaryOptions = createAction(
  '[Beneficiary Autocomplete] Clear Beneficiary Options'
);

export const getServerTime = createAction(
  '[Access Time] Get Server Time'
);

export const setServerTime = createAction(
  '[Access Time] Set Server Time',
  props<{ serverTime: string }>()
);

export const setStartTimeDelay = createAction(
  '[Access Time] Set Start Time Delay',
  props<{ delay: number }>()
);

export const setFinishTimeDelay = createAction(
  '[Access Time] Set Finish Time Delay',
  props<{ delay: number }>()
);

export const setStartTime = createAction(
  '[Access Time] Set Start Time',
  props<{ time: string }>()
);

export const setFinishTime = createAction(
  '[Access Time] Set Finish Time',
  props<{ time: string }>()
);

export const setTicket = createAction(
  '[New Workflow] Set Ticket',
  props<{ ticket: number }>()
);

export const setTicketDescription = createAction(
  '[New Workflow] Set Ticket Description',
  props<{ ticketDescription: string }>()
);

export const setRequesterComment = createAction(
  '[New Workflow] Set Requester Comment',
  props<{ requesterComment: string }>()
);

export const createTemporaryAccessRequest = createAction(
  '[New Workflow] Create Temporary Access Request',
);

export const getTargetAccountsOptions = createAction(
  '[New Workflow] Get Target Account Options'
);

export const preprocessTargetAccountsOptions = createAction(
  '[New Workflow] Preprocess Target Account Options',
  props<{ targetAccountOptions: TargetAccountOptions[] }>()
);

export const setTargetAccountsOptions = createAction(
  '[New Workflow] Set Target Account Options Values',
  props<{ targetAccountOptions: TargetAccountOptions[] }>()
);

export const clearTargetAccountsOptions = createAction(
  '[New Workflow] Clear Target Account Options'
);

export const setSelectedTargetAccountId = createAction(
  '[New Workflow] Set Selected Target Account Id',
  props<{ targetId: string; selectedAccountId: string }>()
);

export const setSelectedTargetAccountOptions = createAction(
  '[New Workflow] Set Selected Target Account Options',
  props<{ selectedTargetAccountOptions: SelectedTargetAccountOption[] }>()
);

export const createPermanentAccessRequest = createAction(
  '[New Workflow] Create Permanent Access Request'
);

export const resetToInitialState = createAction(
  '[New Workflow] Reset To Initial State'
);

export const createPrivilegedUnlockRequest = createAction(
  '[New Workflow] Create Privileged Unlock Request'
);

export const createFirecallUnlockRequest = createAction(
  '[New Workflow] Create Firecall Unlock Request'
);

export const requestCreated = createAction(
  '[New Workflow] Request Created',
  props<{ workflowId?: number; message?: string }>()
);

export const requestFailed = createAction(
  '[New Workflow] Request Failed',
  props<{ message: string; exception?: string }>()
);

export const getOwnedPrivilegedAccountsToUnlock = createAction(
  '[New Workflow] Get Owned Privileged Accounts To Unlock',
  props<{ beneficiary: IdentityHeader; accountType: AccountType }>()
);

export const searchOwnedPrivilegedAccountTargets = createAction(
  '[New Workflow] Search Owned Privileged Account Targets',
  props<{ searchTerm: string }>()
);

export const searchOwnedPrivilegedAccounts = createAction(
  '[New Workflow] Search Owned Privileged Accounts',
  props<{ searchTerm: string }>()
);

export const setFoundOwnedPrivilegedAccounts = createAction(
  '[New Workflow] Set Found Owned Privileged Accounts',
  props<{ foundOwnedPrivilegedAccounts: AccountHeader[] }>()
);

export const setFoundOwnedPrivilegedAccountTargets = createAction(
  '[New Workflow] Set Found Owned Privileged Account Targets',
  props<{ foundOwnedPrivilegedAccountTargets: string[] }>()
);

export const setOwnedPrivilegedAccounts = createAction(
  '[New Workflow] Set Owned Privileged Accounts To Unlock',
  props<{ ownedPrivilegedAccounts: AccountHeader[] }>()
);

export const clearOwnedPrivilegedAccountsToUnlock = createAction(
  '[New Workflow] Clear Owned Privileged Accounts To Unlock'
);

export const clearFoundOwnedPrivilegedAccounts = createAction(
  '[New Workflow] Clear Found Owned Privileged Accounts'
);

export const clearFoundOwnedPrivilegedAccountTargets = createAction(
  '[New Workflow] Clear Found Owned Privileged Account Targets'
);

export const setSelectedOwnedPrivilegedAccoundId = createAction(
  '[New Workflow] Set Selected Owned Privileged Accound Id',
  props<{ selectedOwnedPrivilegedAccountId: string }>()
);

export const setSelectedPrivilegedAccountTarget = createAction(
  '[New Workflow] Set Selected Privileged Accound Target',
  props<{ selectedPrivilegedAccountTarget: string }>()
);

export const setSelectedOwnedPrivilegedAccount = createAction(
  '[New Workflow] Set Selected Owned Privileged Account',
  props<{ selectedOwnedAccount: AccountHeader }>()
);


export const getAllOwnerOptions = createAction(
  '[Owner Input] Get All Owner Options',
  props<{ rootOwner: OwnerInfo; allIdentities: IdentityHeader[]; allWorkgroups: IdentityHeader[] }>()
);

export const setAllOwnerOptions = createAction(
  '[Owner Input] Set All Owner Options',
  props<{ allRequestedOwners: RoleOwner[] }>()
);

export const getOwnerOptions = createAction(
  '[Owner Input] Get Owner Options',
  props<{ searchTerm: string }>()
);

export const setOwnerOptions = createAction(
  '[Owner Input] Set Owner Options',
  props<{ requestedOwners: RoleOwner[] }>()
);

export const setSelectedOwner = createAction(
  '[Owner Input] Set Selected Owner',
  props<{ selectedOwner: OwnerInfo }>()
);

export const setSelectedOwnerToRoot = createAction(
  '[Owner Input] Set Selected Owner To Root'
);

export const clearOwnerOptions = createAction(
  '[Owner Input] Clear Owner Options'
);

export const setRootOwner = createAction(
  '[Owner Input] Set Root Owner',
  props<{ rootOwner: RoleOwner }>()
);

export const getRoleUpdateData = createAction(
  '[Role] Get Role Update Data'
);

export const getRoleCreationData = createAction(
  '[Role] Get Role Creation Data'
);

export const getRoleDeletionData = createAction(
  '[Role] Get Role Deletion Data'
);

export const setIsRequestable = createAction(
  '[Role] Set Is Requestable',
  props<{ isRequestable: boolean }>()
);

export const setIsAutoApproved = createAction(
  '[Role] Set Is Auto Approved',
  props<{ isAutoApproved: boolean }>()
);

export const setSelectedRoleType = createAction(
  '[Role] Set Selected Role Type',
  props<{ selectedRoleType: RoleType }>()
);

export const setRoleName = createAction(
  '[Role] Set Role Name',
  props<{ selectedRoleName: string }>()
);

export const setRoleDescription = createAction(
  '[Role] Set Role Description',
  props<{ selectedRoleDescription: string }>()
);

export const createRole = createAction(
  '[Role Creation] Create Role',
);

export const getRoleOptions = createAction(
  '[Role Input] Get Role Options',
  props<{ searchTerm: string }>()
);

export const setAllRoleOptions = createAction(
  '[Role Input] Set All Role Options',
  props<{ roles: RoleBrief[] }>()
);

export const setRoleOptions = createAction(
  '[Role Input] Set Role Options',
  props<{ requestedRoles: RoleBrief[] }>()
);

export const clearRoleOptions = createAction(
  '[Role Input] Clear Role Options'
);

export const setSelectedRole = createAction(
  '[Role Input] Set Selected Role',
  props<{ selectedRole: RoleBrief }>()
);

export const deleteRole = createAction(
  '[Role Deletion] Delete Role',
);

export const updateRole = createAction(
  '[Role Update] Update Role',
);

export const getSelectedItemsData = createAction(
  '[Role Update] Get Selected Items Data',
  props<{ roleId: number }>()
);

export const setSelectedItemsData = createAction(
  '[Role Update] Set Selected Items Data',
  props<{ serverSelectedItems: RequestedItemData[] }>()
);

export const setAssignmentRuleBody = createAction(
  '[Assigment Rule] Set Assigment Rule Body',
  props<{ assignmentRuleBody: string }>()
);

export const getWorkflowById = createAction(
  '[Assigment Rule] Get Workflow By Id',
  props<{
    id: number;
    wfType: NewWorkflowType;
  }>()
);

export const returnSelectedAccounts = createAction(
  '[Assigment Rule] Return Selected Accounts',
  props<{
    selectedAccounts: SelectedTargetAccountOption[];
  }>()
);

export const loadPrivilegedUnlockRequestData = createAction(
  '[New Workflow] Load Privileged Unlock Request Data',
  props<{ workflowId: number }>()
);

export const loadFirecallUnlockRequestData = createAction(
  '[New Workflow] Load Firecall Unlock Request Data',
  props<{ workflowId: number }>()
);

export const loadPermanentAccessRequestData = createAction(
  '[New Workflow] Load Permanent Access Request Data',
  props<{ workflowId: number }>()
);

export const setIsActiveNewWorkflow = createAction(
  '[New Workflow] Set Is Active New Workflow',
  props<{ isActive: boolean }>()
);
