import { createAction, props } from '@ngrx/store';
import { GeneralMetaData } from '../../../models/generalMetaData.model';
import { Identity } from '@models/identity.model';
import { Workflow } from '../../../pages/identity-automation/pages/workflow/workflow.model';
import { Role } from '@models/role.model';
import { ProductModel } from '../../../pages/identity-automation/pages/integration/models/product.model';
import { MetaData } from '../../../pages/identity-automation/pages/integration/models/account.model';
import { Configuration } from '@models/analytics.model';
import { IntegrationTypes } from '@const/environment-types.const';
import { IntegrationModel } from '@models/integration.model';

export const resetToInitialState = createAction(
    '[MENU] Reset To Initial State'
);

export const setLevel1 = createAction(
    '[MENU] Set Level1',
    props<{ generalMetadata: GeneralMetaData }>()
);

export const setLevel2 = createAction(
    '[MENU] Set Level2',
    props<{ level2: any[] }>()
);

export const resetLevel3 = createAction(
    '[MENU] Reset Level3',
);

export const setLevel3Loading = createAction(
    '[MENU] Set Level3 Loading',
    props<{ loading: boolean }>()
);


export const setLevel3Integration = createAction(
    '[MENU] Set Level3 Integration',
    props<{
        entitlementSubTabsWithTargets: any;
        entitlementSubTabs: any;
        targetsArray: any[];
        targetsLookup: any;
        additionalPropertyObjects: any;
        entitlementProperties: any;
        additionalPropertyObjectProperties: any;
        metadata: MetaData;
        selectedIntegration: IntegrationModel;
    }>()
);

export const setMenu2LevelTitle = createAction(
    '[MENU] Set Level2 Title',
    props<{ level2Title: string }>()
);

export const setActiveLevel1 = createAction(
    '[MENU] Set Active Menu Level 1',
    props<{ active: string }>()
);

export const setActiveLevel2 = createAction(
    '[MENU] Set Active Menu Level 2',
    props<{ active: string }>()
);

export const setActiveLevel3Tab = createAction(
    '[MENU] Set Active Menu Level 3 Tab',
    props<{ active: string }>()
);

export const setLevel3CreateIntegration = createAction(
    '[MENU] Set setLevel3CreateIntegration',
    props<{ integrationType: IntegrationTypes }>()
);

export const setLevel3MyAccess = createAction(
    '[MENU] Set setLevel3MyAccess',
);

export const setLevel3Workflows = createAction(
    '[MENU] Set WORKFLOWS',
);

export const setLevel3Roles = createAction(
    '[MENU] Set Level3 ROLES',
);

export const setLevel3CompanyAdminWorkflow = createAction(
    '[MENU] Set Level3 Company admin Workflow',
);

export const setLevel3IdentityIntelligence = createAction(
    '[MENU] Set Level3 Identity Intelligence',
);

export const setActiveLevel3Sub = createAction(
    '[MENU] Set Active Menu Level 3 Sub',
    props<{ active: string }>()
);

export const setIdentityTitle = createAction(
    '[HEADER] Set Identity Title',
    props<{ selectedIdentity: Identity }>()
);

export const setWorkflowTitle = createAction(
    '[HEADER] Set Workflow Title',
    props<{ selectedWorkflow: Workflow }>()
);

export const setRoleTitle = createAction(
    '[HEADER] Set Role Title',
    props<{ selectedRole: Role }>()
);

export const setIntegrationTitle = createAction(
    '[HEADER] Set Integration Title',
    props<{ selectedIntegration: IntegrationModel }>()
);

export const setConfigurationTitle = createAction(
    '[HEADER] Set Configuration Title',
    props<{ selectedConfiguration: Configuration }>()
);


export const setTitle = createAction(
    '[HEADER] Set  Title',
    props<{ title: string }>()
);

export const load3LevelIntegrationMenuIfDetailsSuccess = createAction(
    '[HEADER] Load 3Level Integration Menu Detail Success',
    props<{ integrationType: IntegrationTypes }>()
);


