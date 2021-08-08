import { GeneralWorkflowSetting } from '../../pages/identity-automation/pages/integration/models/settings.model';
import { XhrStatus } from '@enums/xhr-status';

export declare interface AllIdentitiesAndWorkgroups {
    allIdentities: any[];
    allWorkgroups: any[];
}

export declare interface GeneralWorkflowSettingsApiResponse {
    allIdentitiesAndWorkgroups: AllIdentitiesAndWorkgroups;
    settings: GeneralWorkflowSetting;
    xhrStatus: XhrStatus
}
