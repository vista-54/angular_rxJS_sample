import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { of, pipe } from 'rxjs';
import { catchError, exhaustMap, filter, map, mergeMap, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { AccountType } from 'src/app/models/account-type.model';
import { Dictionary } from 'src/app/models/dictionary.model';
import { Identity } from '@models/identity.model';
import { FirecallUnlockRequestData } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/firecall-unlock-request-data.model';
import {
    IdentitiesWithOwner,
    IdentityHeader
} from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/identity.model';
import { AccountHeader } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/owned-account.model';
import { PermanentAccessRequestData } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/permanent-accesss-request-data.model';
import { PrivilegedUnlockRequestData } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/privileged-unlock-request-data.model';
import {
    RequestedItem,
    RequestedItemData
} from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/requested-item.model';
import {
    RoleBrief,
    RolesUpdateData,
    RoleType
} from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/role.model';
import { TargetAccountOptions } from 'src/app/pages/identity-automation/pages/workflow/new-workflow/models/target-account.model';
import { ApiService } from 'src/app/services/api.service';
import { SearchService } from 'src/app/services/search.service';
import * as NewWorkflowActions from 'src/app/store/states/new-workflow/new-workflow.actions';
import * as SharedActions from 'src/app/store/states/shared/shared.actions';
import { AppState } from '../app.state';
import { NewWorkflowType } from '@models/new-workflow.model';
import { deepEqual } from 'src/app/helpers/common.helpers';

@Injectable()
export class NewWorkflowEffects {

    public getItemsOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getItemsOptions),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([{searchTerm}, {selectedItems}]) =>
                this.apiService.getRequestedItemsOptions(searchTerm, selectedItems)
                    .pipe(
                        map((result: RequestedItem[]) => NewWorkflowActions.setItemsOptions({requestedItems: result})),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public getSubItemsOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getSubItemsOptions),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([{searchTerm, index}, {selectedItems}]) =>
                this.apiService.getRequestedSubItemsOptions(searchTerm, index, selectedItems)
                    .pipe(
                        map(({requestedItems, requestedItemsLeft}: { requestedItems: RequestedItem[]; requestedItemsLeft: number }) => NewWorkflowActions.setItemsOptions({requestedItems, requestedItemsLeft})),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public getAllBeneficiaryOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getAllBeneficiaryOptions),
            switchMap(() =>
                this.apiService.getAllBeneficiaries()
                    .pipe(
                        switchMap((result: IdentityHeader[]) => [
                                NewWorkflowActions.setAllBeneficiaryOptions({beneficiaries: result}),
                                NewWorkflowActions.getBeneficiaryOptions()
                            ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );


    public getBeneficiaryOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getBeneficiaryOptions),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([, {allBeneficiaries, searchTerm}]) => {
                const beneficiaries = this.searchService.search(searchTerm, allBeneficiaries,
                    (item: Identity) => item.name + ' ' + item.type);
                return of(NewWorkflowActions.setBeneficiaryOptions({beneficiaries}));
            })
        )
    );

    public getServerTime$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getServerTime),
            exhaustMap(() =>
                this.apiService.getServerTime()
                    .pipe(
                        map((result: string) => NewWorkflowActions.setServerTime({serverTime: result})),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public createTemporaryAccessRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.createTemporaryAccessRequest),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {startTime, finishTime, ticket, beneficiary, selectedItems, ticketDescription, requesterComment}]) => {
                    const validationFailedActions: TypedAction<any>[] = [];
                    if (!beneficiary) {
                        validationFailedActions.unshift(SharedActions.showMessage({error: this.beneficiaryRequriedMessage}));
                    }

                    if (!ticket) {
                        validationFailedActions.unshift(SharedActions.showMessage({error: this.ticketRequiredMessage}));
                    } else if (!this.ticketIsValid(ticket)) {
                        validationFailedActions.unshift(SharedActions.showMessage({error: this.ticketValidationMessage}));
                    }

                    if (validationFailedActions?.length) {
                        return validationFailedActions;
                    }

                    return this.apiService.createTemporaryAccessRequest(
                        startTime?.toISO(), finishTime?.toISO(), ticket, beneficiary?.id, selectedItems, ticketDescription, requesterComment
                    )
                        .pipe(this.processStandartXhrResult());
                }
            ),
            share()
        )
    );

    public getTargetAccountsOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getTargetAccountsOptions),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([, {selectedItems, beneficiary}]) => {
                if (beneficiary?.id && selectedItems && selectedItems.length > 0) {
                    return this.apiService.getTargetAccountsOptions(beneficiary.id, selectedItems)
                        .pipe(
                            map((result: TargetAccountOptions[]) => NewWorkflowActions.preprocessTargetAccountsOptions({targetAccountOptions: result})),
                            catchError(() => of(SharedActions.doNothing()))
                        );
                } else {
                    return of(NewWorkflowActions.clearTargetAccountsOptions());
                }
            })
        )
    );

    public createPermanentAccessRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.createPermanentAccessRequest),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {beneficiary, selectedItems, requesterComment, selectedTargetAccountOptions}]) => {

                const validationFailedActions: TypedAction<any>[] = [];
                if (!beneficiary) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.beneficiaryRequriedMessage}));
                }
                if (validationFailedActions?.length) {
                    return validationFailedActions;
                }

                const selectedTargetAccountData: Dictionary<string> = {};
                for (const selectedTargetAccountOption in selectedTargetAccountOptions) {
                    if (selectedTargetAccountOptions.hasOwnProperty(selectedTargetAccountOption)) {
                        selectedTargetAccountData[selectedTargetAccountOptions[selectedTargetAccountOption].targetId] = selectedTargetAccountOptions[selectedTargetAccountOption].selectedAccountId;
                    }
                }
                return this.apiService.createPermanentccessRequest(
                    beneficiary?.id, selectedItems, requesterComment, selectedTargetAccountData
                )
                    .pipe(this.processStandartXhrResult());
            }),
            share()
        )
    );

    public getOwnedPrivilegedAccountsToUnlock$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getOwnedPrivilegedAccountsToUnlock),
            switchMap(({beneficiary, accountType}) => {
                if (beneficiary?.id) {
                    switch (accountType) {
                        case AccountType.PersonalPrivileged: {
                            return this.apiService.getOwnedPrivilegedAccountsToUnlock(beneficiary.id)
                                .pipe(
                                    switchMap((result: AccountHeader[]) => [
                                            NewWorkflowActions.setOwnedPrivilegedAccounts({ownedPrivilegedAccounts: result}),
                                            NewWorkflowActions.searchOwnedPrivilegedAccountTargets({searchTerm: null}),
                                            NewWorkflowActions.searchOwnedPrivilegedAccounts({searchTerm: null}),
                                        ]),
                                    catchError(() => of(NewWorkflowActions.clearOwnedPrivilegedAccountsToUnlock()))
                                );
                        }
                        case AccountType.PrivilegedService: {
                            return this.apiService.getOwnedPrivilegedServiceAccountsToUnlock(beneficiary.id)
                                .pipe(
                                    switchMap((result: AccountHeader[]) => [
                                            NewWorkflowActions.setOwnedPrivilegedAccounts({ownedPrivilegedAccounts: result}),
                                            NewWorkflowActions.searchOwnedPrivilegedAccountTargets({searchTerm: null}),
                                            NewWorkflowActions.searchOwnedPrivilegedAccounts({searchTerm: null})
                                        ]),
                                    catchError(() => of(NewWorkflowActions.clearOwnedPrivilegedAccountsToUnlock()))
                                );
                        }
                        default: {
                            return of(NewWorkflowActions.clearOwnedPrivilegedAccountsToUnlock());
                        }
                    }
                } else {
                    return of(NewWorkflowActions.clearOwnedPrivilegedAccountsToUnlock());
                }
            })
        )
    );

    public searchOwnedPrivilegedAccounts$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.searchOwnedPrivilegedAccounts),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([{searchTerm}, {ownedPrivilegedAccountsToUnlock, selectedPrivilegedAccountTarget}]) => {
                if (selectedPrivilegedAccountTarget) {
                    return of(
                        NewWorkflowActions.setFoundOwnedPrivilegedAccounts({
                            foundOwnedPrivilegedAccounts: this.searchService.search(searchTerm,
                                ownedPrivilegedAccountsToUnlock.filter(x => x.targetName === selectedPrivilegedAccountTarget),
                                (item: AccountHeader) => item.name)
                        })
                    );
                } else {
                    return of(NewWorkflowActions.clearFoundOwnedPrivilegedAccounts());
                }
            })
        )
    );

    public searchOwnedPrivilegedAccountTargets$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.searchOwnedPrivilegedAccountTargets),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([{searchTerm}, {ownedPrivilegedAccountsToUnlock}]) =>
                of(
                    NewWorkflowActions.setFoundOwnedPrivilegedAccountTargets({
                        foundOwnedPrivilegedAccountTargets: this.searchService.search(searchTerm, ownedPrivilegedAccountsToUnlock,
                            (item: AccountHeader) => item.targetName).map(x => x.targetName)
                    })
                )
            )
        )
    );

    public createPrivilegedUnlockRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.createPrivilegedUnlockRequest),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {startTime, finishTime: finishTime, ticket, beneficiary, requesterComment, selectedOwnedPrivilegedAccountId}]) => {
                const validationFailedActions: TypedAction<any>[] = [];

                if (!beneficiary) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.beneficiaryRequriedMessage}));
                }

                if (!selectedOwnedPrivilegedAccountId) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.existingAccountRequriedMessage}));
                }

                if (!ticket) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.ticketRequiredMessage}));
                } else if (!this.ticketIsValid(ticket)) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.ticketValidationMessage}));
                }

                if (validationFailedActions?.length) {
                    return validationFailedActions;
                }

                return this.apiService.createPrivilegedUnlockRequest(
                    startTime?.toISO(), finishTime?.toISO(), ticket, beneficiary?.id, requesterComment, selectedOwnedPrivilegedAccountId
                ).pipe(this.processStandartXhrResult());
            }),
            share()
        )
    );

    public createFirecallUnlockRequest$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.createFirecallUnlockRequest),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {startTime, finishTime, ticket, beneficiary, requesterComment, selectedOwnedPrivilegedAccountId}]) => {
                const validationFailedActions: TypedAction<any>[] = [];

                if (!beneficiary) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.beneficiaryRequriedMessage}));
                }

                if (!selectedOwnedPrivilegedAccountId) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.existingAccountRequriedMessage}));
                }

                if (!ticket) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.ticketRequiredMessage}));
                } else if (!this.ticketIsValid(ticket)) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.ticketValidationMessage}));
                }

                if (validationFailedActions?.length) {
                    return validationFailedActions;
                }

                return this.apiService.createFirecallUnlockRequest(
                    startTime?.toISO(), finishTime?.toISO(), ticket, beneficiary?.id, requesterComment, selectedOwnedPrivilegedAccountId
                ).pipe(this.processStandartXhrResult());
            }),
            share()
        )
    );

    public getRoleUpdateData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getRoleUpdateData),
            switchMap(() =>
                this.apiService.getRoleUpdateData()
                    .pipe(
                        switchMap(({allIdentities, allWorkgroups, rootOwner, roles}: RolesUpdateData) => [
                                NewWorkflowActions.setAllRoleOptions({roles}),
                                NewWorkflowActions.getAllOwnerOptions({rootOwner, allIdentities, allWorkgroups})
                            ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public getRoleCreationData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getRoleCreationData),
            switchMap(() =>
                this.apiService.getRoleCreationData()
                    .pipe(
                        switchMap(({allIdentities, allWorkgroups, rootOwner}: IdentitiesWithOwner) => [
                                NewWorkflowActions.getAllOwnerOptions({rootOwner, allIdentities, allWorkgroups})
                            ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public getRoleDeletionData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getRoleDeletionData),
            switchMap(() =>
                this.apiService.getRoleDeletionData()
                    .pipe(
                        switchMap((result: RoleBrief[]) => [
                                NewWorkflowActions.setAllRoleOptions({roles: result}),
                            ]),
                        catchError(() => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public getRoleOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getRoleOptions),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([{searchTerm}, {allRoles}]) =>
                of(NewWorkflowActions.setRoleOptions({
                    requestedRoles:
                        this.searchService.search(searchTerm, allRoles,
                            (item: RoleBrief) => item + ' ' + item?.name + ' ' + item?.type)
                }))
            )
        )
    );

    public getOwnerOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getOwnerOptions),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            switchMap(([{searchTerm}, {allRequestedOwners}]) =>
                of(NewWorkflowActions.setOwnerOptions({
                    requestedOwners:
                        this.searchService.search(searchTerm, allRequestedOwners,
                            (item: { name: string; targetName: string; type: string }) => item.name + ' ' + item.targetName + ' ' + item.type)
                }))
            )
        )
    );

    public getAllOwnerOptions$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getAllOwnerOptions),
            switchMap(({rootOwner, allIdentities, allWorkgroups}) => {
                const allRequestedOwners = [
                    ...allIdentities.map(({id, name}) => ({id, name, type: 'Identity', inherited: false})),
                    ...allWorkgroups.map(({id, name}) => ({id, name, type: 'Workgroup', inherited: false}))
                ];
                if (rootOwner) {
                    const {id, type} = rootOwner;
                    let name: string = null;
                    if (type.toLowerCase() === 'identity') {
                        name = allIdentities.find(x => x.id === id)?.name;
                    } else if (type.toLowerCase() === 'workgroup') {
                        name = allWorkgroups.find(x => x.id === id)?.name;
                    }
                    if (!name) {
                        name = 'Undefined';
                    }
                    const newRootOwner = {id, type, name: 'Inherited (' + name + ')', inherited: true};
                    return [
                        NewWorkflowActions.setRootOwner({rootOwner: newRootOwner}),
                        NewWorkflowActions.setAllOwnerOptions({allRequestedOwners: [newRootOwner, ...allRequestedOwners]})
                    ];
                } else {
                    return of(NewWorkflowActions.setAllOwnerOptions({allRequestedOwners}));
                }
            })
        )
    );

    public createRole$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.createRole),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {selectedRoleName, selectedRoleDescription, requesterComment, assignmentRuleBody, isAutoApproved, isRequestable, selectedOwner, selectedRoleType, selectedItems}]) => {
                // Validation
                const validationFailedActions: TypedAction<any>[] = [];
                if (!selectedRoleType) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.roleTypeRequriedMessage}));
                }
                if (!selectedRoleName) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.nameRequriedMessage}));
                }
                if (!selectedOwner) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.ownerRequriedMessage}));
                }
                if (validationFailedActions?.length) {
                    return validationFailedActions;
                }
                // Api call
                return this.apiService.createRole(
                    selectedRoleName, selectedRoleDescription, requesterComment, assignmentRuleBody, isAutoApproved, isRequestable, selectedOwner.id ? selectedOwner : null, RoleType[selectedRoleType], selectedItems
                )
                    .pipe(this.processStandartXhrResult());
            }),
            share()
        )
    );

    public getSelectedItemsData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.getSelectedItemsData),
            switchMap(({roleId}) =>
                this.apiService.getSelectedItemsData(roleId)
                    .pipe(
                        map((result: RequestedItemData[]) => NewWorkflowActions.setSelectedItemsData({serverSelectedItems: result})),
                        catchError(() =>
                            of(NewWorkflowActions.requestFailed({message: this.serverErrorMessage})) // !!!! For current implementation only, RIGHT NOW server can only return 500.
                        )
                    ),
            )
        )
    );

    public updateRole$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.updateRole),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {selectedRole, selectedRoleName, selectedRoleDescription, requesterComment, assignmentRuleBody, isAutoApproved, isRequestable, selectedOwner, selectedItems}]) => {
                // Validation
                const validationFailedActions: TypedAction<any>[] = [];
                if (!selectedRole) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.roleRequriedMessage}));
                }
                if (!selectedRoleName) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.nameRequriedMessage}));
                }
                if (!selectedOwner) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.ownerRequriedMessage}));
                }
                if (validationFailedActions?.length) {
                    return validationFailedActions;
                }
                return this.apiService.updateRole(
                    selectedRole.id, selectedRoleName, selectedRoleDescription, requesterComment, assignmentRuleBody, isAutoApproved, isRequestable, selectedOwner.id ? selectedOwner : null, selectedItems
                )
                    .pipe(this.processStandartXhrResult());
            }),
            share()
        )
    );

    public deleteRole$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.deleteRole),
            withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
            exhaustMap(([, {selectedRole, requesterComment}]) => {
                const validationFailedActions: TypedAction<any>[] = [];
                if (!selectedRole) {
                    validationFailedActions.unshift(SharedActions.showMessage({error: this.roleRequriedMessage}));
                }
                if (validationFailedActions?.length) {
                    return validationFailedActions;
                }
                return this.apiService.deleteRole(
                    selectedRole.id, requesterComment
                )
                .pipe(this.processStandartXhrResult());
            }),
            share()
        )
    );

    public loadPermanentAccessRequestData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.loadPermanentAccessRequestData),
            switchMap(({workflowId}) =>
                this.apiService.getPermanentAccessRequestDataByWorfklowId(workflowId)
                    .pipe(
                        switchMap(({beneficiary, requestedItems, accountOptions, selectedAccounts}: PermanentAccessRequestData) => ([
                            NewWorkflowActions.setBeneficiary({beneficiary}),
                            NewWorkflowActions.setSelectedItemsData({serverSelectedItems: requestedItems}),
                            NewWorkflowActions.setSelectedTargetAccountOptions({selectedTargetAccountOptions: selectedAccounts}),
                            NewWorkflowActions.returnSelectedAccounts({selectedAccounts}),
                            NewWorkflowActions.preprocessTargetAccountsOptions({targetAccountOptions: accountOptions}),
                        ]))
                    )
            ),
            share()
        )
    );

    public loadPrivilegedUnlockRequestData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.loadPrivilegedUnlockRequestData),
            switchMap(({workflowId}) =>
                this.apiService.getPrivilegedUnlockRequestDataByWorkflowId(workflowId)
                    .pipe(
                        switchMap(({ticket, requesterComment, beneficiary, selectedOwnedAccount}: PrivilegedUnlockRequestData) => ([
                            NewWorkflowActions.setBeneficiary({beneficiary}),
                            NewWorkflowActions.setTicket({ticket}),
                            NewWorkflowActions.setRequesterComment({requesterComment}),
                            NewWorkflowActions.setSelectedOwnedPrivilegedAccount({selectedOwnedAccount})
                        ]))
                    )
            ),
            share()
        )
    );

    public loadFirecallUnlockRequestData$ = createEffect(() => this.actions$
        .pipe(
            ofType(NewWorkflowActions.loadFirecallUnlockRequestData),
            switchMap(({workflowId}) =>
                this.apiService.getFirecallUnlockRequestDataByWorkflowId(workflowId)
                    .pipe(
                        switchMap(({ticket, requesterComment, beneficiary, selectedOwnedAccount}: FirecallUnlockRequestData) => ([
                            NewWorkflowActions.setBeneficiary({beneficiary}),
                            NewWorkflowActions.setTicket({ticket}),
                            NewWorkflowActions.setRequesterComment({requesterComment}),
                            NewWorkflowActions.setSelectedOwnedPrivilegedAccount({selectedOwnedAccount})
                        ]))
                    )
            ),
            share()
        )
    );


    public getWorkflowById$ = createEffect(() => this.actions$ // We should rewrite this into multiple methods. We should return specific actions based on workflow type.
        .pipe(
            ofType(NewWorkflowActions.getWorkflowById),
            switchMap(({id, wfType}) =>
                this.getWorkflowById(id, wfType)
                    .pipe(
                        switchMap(({requestedItems, beneficiary, ticket, requesterComment, selectedAccounts, accountOptions, selectedOwnedAccount}: { beneficiary: IdentityHeader; ticket: number; requesterComment: string; requestedItems: RequestedItemData[]; selectedAccounts: any[]; accountOptions: any[]; selectedOwnedAccount: { id: string } }) => [
                                NewWorkflowActions.setSelectedItemsData({serverSelectedItems: requestedItems}),
                                NewWorkflowActions.setBeneficiary({beneficiary}),
                                NewWorkflowActions.setTicket({ticket}),
                                NewWorkflowActions.setRequesterComment({requesterComment}),
                                NewWorkflowActions.returnSelectedAccounts({selectedAccounts}),
                                NewWorkflowActions.preprocessTargetAccountsOptions({targetAccountOptions: accountOptions})
                            ])
                    )
            ),
            share()
        )
    );

    public requestCreated$ = createEffect(() => this.actions$
      .pipe(
        ofType(NewWorkflowActions.requestCreated),
        map(() => NewWorkflowActions.setIsActiveNewWorkflow({isActive: false})),
        share()
      )
    );

    public preprocessTargetAccountsOptions$ = createEffect(() => this.actions$
      .pipe(
        ofType(NewWorkflowActions.preprocessTargetAccountsOptions),
        withLatestFrom(this.store$.pipe(select(state => state.newWorkflowState))),
        mergeMap(([{targetAccountOptions}, state]) => {
          const processed =  targetAccountOptions?.map(element => {
            const stateValue = state.targetAccountOptions?.find(x => x.id === element.id);
            if (stateValue && deepEqual(stateValue.options, element.options)) {
              return stateValue;
            } else {
              return element;
            }
          });
          if (processed !== null && processed !== undefined) {
            return of(NewWorkflowActions.setTargetAccountsOptions({targetAccountOptions: processed}));
          } else {
            return of(SharedActions.doNothing());
          }
        })
      )
    );

    private generalErrorMessage = 'An error occured, please try reloading the page.';
    private serverErrorMessage = 'Server error.';

    private beneficiaryRequriedMessage = 'The beneficiary is required.';
    private existingAccountRequriedMessage = 'The existing account is required.';
    private roleRequriedMessage = 'The role is required.';
    private roleTypeRequriedMessage = 'The role type must be selected.';
    private nameRequriedMessage = 'The name is required.';
    private ownerRequriedMessage = 'The owner is required.';
    private ticketRequiredMessage = 'The ticket number is required.';
    private ticketValidationMessage = 'The ticket number is invalid.';

    constructor(
      private actions$: Actions,
      private apiService: ApiService,
      private searchService: SearchService,
      private store$: Store<AppState>
    ) {
    }

    public getWorkflowById(id: number, wfType: NewWorkflowType) {
      if (wfType === NewWorkflowType.TemporaryAccessRequest) {
        return this.apiService.getTemporaryAccessRequest(id);
      } else {
        throw Error('wfType issue');
      }
    }

    private ticketIsValid(ticket: number) {
      return ticket > 0 && ticket < 2147483647 && Number.isInteger(ticket);
    }

    private processStandartXhrResult() {
        return pipe(
            map((result: any) => {
                if (result.xhrStatus !== 'Error') {
                    return NewWorkflowActions.requestCreated({workflowId: result});
                } else {
                    return NewWorkflowActions.requestFailed({message: 'Err'}); // !!!! For current implementation only, RIGHT NOW server can only return 500.
                }
            }),
            catchError(() =>
                of(NewWorkflowActions.requestFailed({message: this.serverErrorMessage})) // !!!! For current implementation only, RIGHT NOW server can only return 500.
            )
        );
    }
}
