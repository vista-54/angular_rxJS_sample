/* eslint-disable @typescript-eslint/dot-notation */
import { NgModule } from '@angular/core';
import { reducers } from './app.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NewWorkflowEffects } from '@effects/new-workflow.effects';
import { WorkflowEffects } from '@effects/workflow.effects';
import { HistoryItemsEffect } from '@effects/history-items.effect';
import { AccountPropertiesEffects } from '@effects/account-properties.effects';
import { SharedEffects } from '@effects/shared.effects';
import { IdentityEffects } from '@effects/identity.effects';
import { TargetAccountsEffects } from '@effects/target-accounts.effects';
import { AssignedAccessEffects } from '@effects/assigned-access.effects';
import { WorkgroupEffects } from '@effects/workgroup.effects';
import { RoleEffects } from '@effects/role.effects';
import { RoleEntitlementEffect } from '@effects/role-entitlement.effect';
import { IncludedItRolesEffect } from '@effects/included-it-roles.effect';
import { IntegrationEffects } from '@effects/integration.effects';
import { AccountsEffects } from '@effects/accounts.effects';
import { GeneralWorkflowSettingsEffects } from '@effects/general-workflow-settings.effects';
import { EntitlementsEffects } from '@effects/entitlements.effects';
import { AccountAttributesEffect } from '@effects/account-attributes.effect';
import { GeneralMetadataEffects } from '@effects/general-metadata.effects';
import { AnalyticsEffects } from '@effects/analytics.effects';
import { DashboardEffects } from '@effects/dashboard.effects';
import { AuthEffects } from '@effects/auth.effects';
import { ViolationsEffects } from '@effects/violations.effects';
import { extModules } from './build-specifics';
import { metaReducers } from './app.meta-reducers';


@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {metaReducers}),
        extModules,
        EffectsModule.forRoot([
            NewWorkflowEffects,
            WorkflowEffects,
            HistoryItemsEffect,
            AccountPropertiesEffects,
            SharedEffects,
            IdentityEffects,
            TargetAccountsEffects,
            AssignedAccessEffects,
            WorkgroupEffects,
            RoleEffects,
            RoleEntitlementEffect,
            IncludedItRolesEffect,
            IntegrationEffects,
            AccountsEffects,
            GeneralWorkflowSettingsEffects,
            EntitlementsEffects,
            AccountAttributesEffect,
            GeneralMetadataEffects,
            DashboardEffects,
            AnalyticsEffects,
            AuthEffects,
            ViolationsEffects
        ])
    ]
})
export class AppStoreModule {
}
