import { ActionReducerMap } from '@ngrx/store';
import { newWorkflowStateReducer, NewWorkflowState } from '@states/new-workflow/new-workflow.reducer';
import { IdentityState, identityStateReducer } from '@states/identity/identity.reducer';
import { WorkflowState, workflowStateReducer } from '@states/workflow/workflow.reducer';
import { HistoryItemsState, historyItemStateReducer } from '@states/history-items/history-items.reducer';
import {
    accountPropertyStateReducer,
    AccountPropertiesState
} from '@states/account-properties/account-properties.reducer';
import { sharedReducer, SharedState } from '@states/shared/shared.reducer';
import { TargetAccountsState, targetAccountsStateReducer } from '@states/target-accounts/target-accounts.reducer';
import { AssignedAccessState, AssignedAccessStateReducer } from '@states/assigned-access/assigned-access.reducer';
import { WorkgroupState, workgroupStateReducer } from '@states/workgroup/workgroup.reducer';
import { RoleState, roleStateReducer } from '@states/role/role.reducer';
import {
    RoleEntitlementsState,
    roleEntitlementStateReducer
} from '@states/role-entitlements/role-entitlements.reducer';
import { GeneralMetadataState, generalMetadataStateReducer } from '@states/general-metadata/general-metadata.reducer';
import { IncludedItRoleState, includedItRolesStateReducer } from '@states/included-it-roles/included-it-roles.reducer';
import { IntegrationState, integrationStateReducer } from '@states/integration/integration.reducer';
import {
    IntegrationAccountsState,
    integrationAccountsStateReducer
} from '@states/integration-accounts/integration-accounts.reducer';
import {
    GeneralWorkflowSettingsState,
    generalWorkflowSettingsStateReducer
} from '@states/general-workflow-settings/general-workflow-settings.reducer';

import { entitlementsStateReducer, EntitlementState } from '@states/entitlements/entitlements.reducer';

import {
    AccountAttributesState,
    accountAttributesStateReducer
} from '@states/account-attributes/account-attributes.reducer';
import { DashboardState, dashboardStateReducer } from '@states/dashboard/dashboard.reducer';
import { MenuState, menuStateReducer } from '@states/menu/menu.reducer';
import { AnalyticsState, analyticStateReducer } from '@states/analytics/analytics.reducer';
import { AuthState, authStateReducer } from '@states/auth/auth.reducer';
import { ViolationsState, violationsStateReducer } from '@states/violations/violations.reducer';


export interface AppState {
    sharedState: SharedState;
    newWorkflowState: NewWorkflowState;
    accountPropertiesState: AccountPropertiesState;
    workflowState: WorkflowState;
    historyItemsState: HistoryItemsState;
    identityState: IdentityState;
    targetAccountsState: TargetAccountsState;
    assignedAccessState: AssignedAccessState;
    workgroupState: WorkgroupState;
    roleState: RoleState;
    roleEntitlements: RoleEntitlementsState;
    generalMetadataState: GeneralMetadataState;
    includedItRoles: IncludedItRoleState;
    integrationState: IntegrationState;
    integrationAccountsState: IntegrationAccountsState;
    generalWorkflowSettings: GeneralWorkflowSettingsState;
    menuState: MenuState;
    entitlementsState: EntitlementState;
    accountAttributesState: AccountAttributesState;
    authState: AuthState;
    dashboardState: DashboardState;
    analyticsState: AnalyticsState;
    violationsState: ViolationsState;

}

export const reducers: ActionReducerMap<any> = {
    sharedState: sharedReducer,
    newWorkflowState: newWorkflowStateReducer,
    accountPropertiesState: accountPropertyStateReducer,
    workflowState: workflowStateReducer,
    historyItemsState: historyItemStateReducer,
    identityState: identityStateReducer,
    targetAccountsState: targetAccountsStateReducer,
    assignedAccessState: AssignedAccessStateReducer,
    workgroupState: workgroupStateReducer,
    roleState: roleStateReducer,
    roleEntitlements: roleEntitlementStateReducer,
    generalMetadataState: generalMetadataStateReducer,
    includedItRoles: includedItRolesStateReducer,
    integrationState: integrationStateReducer,
    integrationAccountsState: integrationAccountsStateReducer,
    generalWorkflowSettings: generalWorkflowSettingsStateReducer,
    entitlementsState: entitlementsStateReducer,
    accountAttributesState: accountAttributesStateReducer,
    dashboardState: dashboardStateReducer,
    menuState: menuStateReducer,
    analyticsState: analyticStateReducer,
    authState: authStateReducer,
    violationsState: violationsStateReducer,
};
