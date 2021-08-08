import { Action, createReducer, on } from '@ngrx/store';
import { IdentityHeader } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/identity.model';
import {
  RequestedItem,
  RequestedItemData
} from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/requested-item.model';
import * as NewWorkflowActions from './new-workflow.actions';
import { DateTime } from 'luxon';
import {
  SelectedTargetAccountOption,
  TargetAccountOptions
} from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/target-account.model';
import { AccountHeader } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/owned-account.model';
import {
  RoleOwner,
  OwnerInfo,
  RoleType,
  RoleBrief
} from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/role.model';
import * as deepEqual from 'fast-deep-equal';

// Refactor later into multiple stores!!!
export interface NewWorkflowState {
  // Requested Items
  requestedItems: RequestedItem[];
  requestedItemsLeft: number;
  selectedItems: RequestedItemData[];
  // Beneficiary
  allBeneficiaries: IdentityHeader[];
  requestedBeneficiaries: IdentityHeader[];
  beneficiary: IdentityHeader;
  searchTerm: string;
  // Access Time Component
  serverTime: DateTime;
  startTime: DateTime;
  finishTime: DateTime;
  startTimeDelay: number;
  finishTimeDelay: number;
  startTimeReadonly: boolean;
  finishTimeReadonly: boolean;
  // Additional fields
  ticket: number;
  ticketDescription: string;
  requesterComment: string;
  // Validation messages
  errorMessage: string;
  successMessage: string;
  exception: string;
  // Permanent Access Request specific
  targetAccountOptions: TargetAccountOptions[];
  selectedTargetAccountOptions: SelectedTargetAccountOption[];
  // Privileged
  ownedPrivilegedAccountsToUnlock: AccountHeader[];
  foundOwnedPrivilegedAccountTargets: string[];
  foundOwnedPrivilegedAccounts: AccountHeader[];
  selectedOwnedPrivilegedAccountId: string;
  selectedOwnedPrivilegedAccountName: string;
  selectedPrivilegedAccountTarget: string;
  // Role
  allRoles: RoleBrief[];
  requestedRoles: RoleBrief[];
  selectedRole: RoleBrief;
  isRequestable: boolean;
  isAutoApproved: boolean;
  selectedRoleType: RoleType;
  selectedRoleName: string;
  selectedRoleDescription: string;
  // Role Creation
  // Role Update
  serverSelectedItems: RequestedItemData[];
  // Owner Input
  rootOwner: RoleOwner;
  allRequestedOwners: RoleOwner[];
  requestedOwners: RoleOwner[];
  selectedOwner: OwnerInfo;
  // Assigment Rule Input
  assignmentRuleBody: string;
  assignmentRuleSignature: string;
  // Metadata
  isActive: boolean;
}

export const initialState: NewWorkflowState = {
  requestedItems: [],
  requestedItemsLeft: 0,
  selectedItems: [],
  allBeneficiaries: [],
  requestedBeneficiaries: [],
  beneficiary: null,
  searchTerm: '',
  serverTime: DateTime.utc(),
  startTime: DateTime.utc(),
  finishTime: DateTime.utc().plus({hours: 1}),
  startTimeDelay: 0,
  finishTimeDelay: 1,
  startTimeReadonly: true,
  finishTimeReadonly: true,
  ticket: null,
  ticketDescription: '',
  requesterComment: '',
  errorMessage: '',
  successMessage: '',
  exception: '',
  targetAccountOptions: [],
  selectedTargetAccountOptions: [],
  ownedPrivilegedAccountsToUnlock: [],
  foundOwnedPrivilegedAccountTargets: [],
  foundOwnedPrivilegedAccounts: [],
  selectedOwnedPrivilegedAccountId: '',
  selectedOwnedPrivilegedAccountName: '',
  selectedPrivilegedAccountTarget: null,
  allRoles: [],
  requestedRoles: [],
  selectedRole: null,
  selectedRoleType: null,
  selectedRoleName: '',
  selectedRoleDescription: '',
  isRequestable: false,
  isAutoApproved: false,
  rootOwner: {id: null, type: null, name: 'Inherited (Undefined)', inherited: true},
  allRequestedOwners: [],
  requestedOwners: [],
  selectedOwner: null,
  serverSelectedItems: [],
  assignmentRuleBody: null,
  assignmentRuleSignature: '',
  isActive: false,
};

export const newWorkflowStateReducer = createReducer(
  initialState,
  on(
    NewWorkflowActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    NewWorkflowActions.setSelectedRequestedItems,
    (state, {selectedItems}) => ({
      ...state,
      selectedItems: requestedItemsSelectMany(selectedItems)
    })
  ),
  on(
    NewWorkflowActions.setSelectedRequestedItemsData,
    (state, {selectedItems}) => ({
      ...state,
      selectedItems
    })
  ),
  on(
    NewWorkflowActions.setItemsOptions,
    (state, {requestedItems, requestedItemsLeft}) => ({
      ...state,
      requestedItems,
      requestedItemsLeft
    })
  ),
  on(
    NewWorkflowActions.clearItemsOptions,
    (state) => ({
      ...state,
      requestedItems: initialState.requestedItems,
      requestedItemsLeft: initialState.requestedItemsLeft,
    })
  ),
  on(
    NewWorkflowActions.setAllBeneficiaryOptions,
    (state, {beneficiaries}) => ({
      ...state,
      allBeneficiaries: beneficiaries
    })
  ),
  on(
    NewWorkflowActions.setSearchTerm,
    (state, {searchTerm}) => ({
      ...state,
      searchTerm
    })
  ),
  on(
    NewWorkflowActions.setBeneficiaryOptions,
    (state, {beneficiaries}) => ({
      ...state,
      requestedBeneficiaries: beneficiaries
    })
  ),
  on(
    NewWorkflowActions.clearBeneficiaryOptions,
    (state) => ({
      ...state,
      requestedBeneficiaries: initialState.requestedBeneficiaries
    })
  ),
  on(
    NewWorkflowActions.setBeneficiary,
    (state, {beneficiary}) => ({
      ...state,
      beneficiary
    })
  ),
  on(
    NewWorkflowActions.setServerTime,
    (state, {serverTime}) => {
      const newState = {...state, serverTime: DateTime.fromISO(serverTime)};
      return calculateTimeState(newState);
    }
  ),
  on(
    NewWorkflowActions.setStartTimeDelay,
    (state, {delay}) => {
      const newState = {...state, startTimeDelay: delay};
      return calculateTimeState(newState);
    }
  ),
  on(
    NewWorkflowActions.setFinishTimeDelay,
    (state, {delay}) => {
      const newState = {...state, finishTimeDelay: delay};
      return calculateTimeState(newState);
    }
  ),
  on(
    NewWorkflowActions.setStartTime,
    (state, {time}) => {
      const newState = {...state, startTime: DateTime.fromISO(time)};
      return calculateTimeState(newState);
    }
  ),
  on(
    NewWorkflowActions.setFinishTime,
    (state, {time}) => {
      const newState = {...state, finishTime: DateTime.fromISO(time)};
      return calculateTimeState(newState);
    }
  ),
  on(
    NewWorkflowActions.setTicket,
    (state, {ticket}) => ({
      ...state,
      ticket
    })
  ),
  on(
    NewWorkflowActions.setTicketDescription,
    (state, {ticketDescription}) => ({
      ...state,
      ticketDescription
    })
  ),
  on(
    NewWorkflowActions.setRequesterComment,
    (state, {requesterComment}) => ({
      ...state,
      requesterComment
    })
  ),
  on(
    NewWorkflowActions.setTargetAccountsOptions,
    (state, {targetAccountOptions}) => ({
        ...state,
        targetAccountOptions
      })
  ),
  on(
    NewWorkflowActions.clearTargetAccountsOptions,
    (state) => ({
      ...state,
      targetAccountOptions: initialState.targetAccountOptions
    })
  ),
  on(
    NewWorkflowActions.setSelectedTargetAccountId,
    (state, {targetId, selectedAccountId}) => {
      const {selectedTargetAccountOptions} = state;

      const newTargetAccountOptions: SelectedTargetAccountOption[] = [];

      selectedTargetAccountOptions.filter(x => x.targetId !== targetId).forEach(x => newTargetAccountOptions.push(x));
      newTargetAccountOptions.push({targetId, selectedAccountId});

      return {...state, selectedTargetAccountOptions: newTargetAccountOptions};
    }
  ),
  on(
    NewWorkflowActions.setSelectedTargetAccountOptions,
    (state, {selectedTargetAccountOptions}) => ({
      ...state,
      selectedTargetAccountOptions
    })
  ),
  on(
    NewWorkflowActions.requestCreated,
    (state, {message}) => ({
      ...state,
      successMessage: message,
      errorMessage: initialState.errorMessage,
    })
  ),
  on(
    NewWorkflowActions.requestFailed,
    (state, {message, exception}) => ({
      ...state,
      successMessage: initialState.successMessage,
      errorMessage: message,
      exception
    })
  ),
  on(
    NewWorkflowActions.setOwnedPrivilegedAccounts,
    (state, {ownedPrivilegedAccounts}) => ({
        ...state,
        ownedPrivilegedAccountsToUnlock: ownedPrivilegedAccounts
      })
  ),
  on(
    NewWorkflowActions.clearOwnedPrivilegedAccountsToUnlock,
    (state) => ({
      ...state,
      ownedPrivilegedAccountsToUnlock: initialState.ownedPrivilegedAccountsToUnlock,
      foundOwnedPrivilegedAccounts: initialState.foundOwnedPrivilegedAccounts,
      foundOwnedPrivilegedAccountTargets: initialState.foundOwnedPrivilegedAccountTargets
    })
  ),
  on(
    NewWorkflowActions.setFoundOwnedPrivilegedAccounts,
    (state, {foundOwnedPrivilegedAccounts}) => ({
      ...state,
      foundOwnedPrivilegedAccounts
    })
  ),
  on(
    NewWorkflowActions.setFoundOwnedPrivilegedAccountTargets,
    (state, {foundOwnedPrivilegedAccountTargets}) => ({
      ...state,
      foundOwnedPrivilegedAccountTargets: [...new Set(foundOwnedPrivilegedAccountTargets)]
    })
  ),
  on(
    NewWorkflowActions.clearFoundOwnedPrivilegedAccountTargets,
    (state) => ({
      ...state,
      foundOwnedPrivilegedAccountTargets: initialState.foundOwnedPrivilegedAccountTargets,
      foundOwnedPrivilegedAccounts: initialState.foundOwnedPrivilegedAccounts,
    })
  ),
  on(
    NewWorkflowActions.clearFoundOwnedPrivilegedAccounts,
    (state) => ({
      ...state,
      foundOwnedPrivilegedAccounts: initialState.foundOwnedPrivilegedAccounts
    })
  ),
  on(
    NewWorkflowActions.setSelectedOwnedPrivilegedAccoundId,
    (state, {selectedOwnedPrivilegedAccountId}) => ({
      ...state,
      selectedOwnedPrivilegedAccountId
    })
  ),
  on(
    NewWorkflowActions.setSelectedPrivilegedAccountTarget,
    (state, {selectedPrivilegedAccountTarget}) => ({
      ...state,
      selectedPrivilegedAccountTarget
    })
  ),
  on(
    NewWorkflowActions.setSelectedOwnedPrivilegedAccount,
    (state, {selectedOwnedAccount}) => ({
      ...state,
      selectedOwnedPrivilegedAccountId: selectedOwnedAccount?.id ?? initialState.selectedOwnedPrivilegedAccountId,
      selectedPrivilegedAccountTarget: selectedOwnedAccount?.targetName ?? initialState.selectedPrivilegedAccountTarget,
      selectedOwnedPrivilegedAccountName: selectedOwnedAccount?.name ?? initialState.selectedOwnedPrivilegedAccountName,
    })
  ),
  on(
    NewWorkflowActions.setSelectedRoleType,
    (state, {selectedRoleType}) => ({
      ...state,
      selectedRoleType
    })
  ),
  on(
    NewWorkflowActions.setRoleName,
    (state, {selectedRoleName}) => ({
      ...state,
      selectedRoleName
    })
  ),
  on(
    NewWorkflowActions.setRoleDescription,
    (state, {selectedRoleDescription}) => ({
      ...state,
      selectedRoleDescription
    })
  ),
  on(
    NewWorkflowActions.setIsRequestable,
    (state, {isRequestable}) => ({
      ...state,
      isRequestable
    })
  ),
  on(
    NewWorkflowActions.setIsAutoApproved,
    (state, {isAutoApproved}) => ({
      ...state,
      isAutoApproved
    })
  ),
  on(
    NewWorkflowActions.clearRoleOptions,
    (state) => ({
      ...state,
      requestedRoles: initialState.requestedRoles
    })
  ),
  on(
    NewWorkflowActions.setAllRoleOptions,
    (state, {roles}) => ({
      ...state,
      allRoles: roles,
    })
  ),
  on(
    NewWorkflowActions.setRoleOptions,
    (state, {requestedRoles}) => ({
      ...state,
      requestedRoles
    })
  ),
  on(
    NewWorkflowActions.setSelectedRole,
    (state, {selectedRole}) => ({
      ...state,
      selectedRole,
      isRequestable: selectedRole ? selectedRole.isRequestable : initialState.isRequestable,
      isAutoApproved: selectedRole ? selectedRole.isAutoApproved : initialState.isAutoApproved,
      selectedRoleName: selectedRole?.name ? selectedRole.name : initialState.selectedRoleName,
      selectedRoleDescription: selectedRole?.description ? selectedRole.description : initialState.selectedRoleDescription,
      selectedRoleType: selectedRole?.type ? RoleType[selectedRole.type] : initialState.selectedRoleType,
      selectedOwner: selectedRole?.owner ? selectedRole.owner : getSelecetedOwnerInitialValue(),
      assignmentRuleBody: selectedRole?.assignmentRuleBody ? selectedRole.assignmentRuleBody : initialState.assignmentRuleBody,
    })
  ),
  on(
    NewWorkflowActions.setSelectedOwner,
    (state, {selectedOwner}) => {
      if (selectedOwner) {
        return {...state, selectedOwner};
      } else {
        return {
          ...state,
          selectedOwner: getSelecetedOwnerInitialValue()
        };
      }
    }
  ),
  on(
    NewWorkflowActions.setSelectedOwnerToRoot,
    (state) => ({
      ...state,
      selectedOwner: getSelecetedOwnerInitialValue()
    })
  ),
  on(
    NewWorkflowActions.clearOwnerOptions,
    (state) => ({
      ...state,
      requestedOwners: initialState.requestedOwners
    })
  ),
  on(
    NewWorkflowActions.setOwnerOptions,
    (state, {requestedOwners}) => ({
      ...state,
      requestedOwners
    })
  ),
  on(
    NewWorkflowActions.setRootOwner,
    (state, {rootOwner}) => ({
      ...state,
      rootOwner
    })
  ),
  on(
    NewWorkflowActions.setAllOwnerOptions,
    (state, {allRequestedOwners}) => ({
      ...state,
      allRequestedOwners
    })
  ),
  on(
    NewWorkflowActions.setSelectedItemsData,
    (state, {serverSelectedItems}) => ({
      ...state,
      serverSelectedItems
    })
  ),
  on(
    NewWorkflowActions.setAssignmentRuleBody,
    (state, {assignmentRuleBody}) => ({
      ...state,
      assignmentRuleBody
    })
  ),
  on(
    NewWorkflowActions.setIsActiveNewWorkflow,
    (state, {isActive}) => ({
      ...state,
      isActive
    })
  )
);


const calculateTimeState: (state: NewWorkflowState) => NewWorkflowState = (state: NewWorkflowState) => {
  const {serverTime, startTimeDelay, finishTimeDelay} = state;

  let {startTime, finishTime } = state;
  let startTimeReadonly: boolean;
  let finishTimeReadonly: boolean;

  if (startTimeDelay !== -1) {
    startTime = serverTime.plus({minutes: startTimeDelay});
    startTimeReadonly = true;
  } else {
    startTimeReadonly = false;
  }

  if (finishTimeDelay !== -1) {
    finishTime = startTime.plus({hours: finishTimeDelay});
    finishTimeReadonly = true;
  } else {
    finishTimeReadonly = false;
  }

  return {
    ...state,
    serverTime,
    startTime,
    finishTime,
    startTimeDelay,
    finishTimeDelay,
    startTimeReadonly,
    finishTimeReadonly
  };
};

const requestedItemsSelectMany: (selectedItems: any) => any = function(selectedItems: any) {
  const newSelectedItemsData = [];

  if (selectedItems) {
    selectedItems.forEach(({item, requestedSubItems}: { item: RequestedItem; requestedSubItems: RequestedItem[] }) => {
      if (item && item.type) {
        const requestedItemData: RequestedItemData = {item, requestedSubItems: []};

        requestedSubItems.forEach((subItem: RequestedItem) => {
          if (subItem && subItem.type) {
            requestedItemData.requestedSubItems.push(subItem);
          }
        });

        newSelectedItemsData.push(requestedItemData);
      }
    });
  }

  return newSelectedItemsData;
};

const getSelecetedOwnerInitialValue: () => OwnerInfo = () =>
  ({id: initialState.rootOwner.id, type: initialState.rootOwner.type});
