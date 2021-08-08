import { Identity } from '@models/identity.model';
import { Workflow } from '../../pages/identity-automation/pages/workflow/workflow.model';
import { Role } from './role.model';
import { ProductModel } from '../../pages/identity-automation/pages/integration/models/product.model';
import { Configuration } from '@models/analytics.model';
import { IntegrationModel } from '@models/integration.model';

export declare interface MenuTitleSetup {
    subTab?: string;
    selectedIdentity?: Identity;
    selectedWorkflow?: Workflow;
    selectedRole?: Role;
    selectedIntegration?: IntegrationModel;
    selectedConfiguration?: Configuration;
}
