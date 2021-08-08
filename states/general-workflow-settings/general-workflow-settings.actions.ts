import { createAction, props } from '@ngrx/store';
import { GeneralWorkflowSetting } from '../../../pages/identity-automation/pages/integration/models/settings.model';

export const resetToInitialState = createAction(
  '[General Workflow Settings] Reset To Initial State'
);

export const setSettings = createAction(
  '[General Workflow Settings] Set Settings',
  props<{ settings: GeneralWorkflowSetting }>()
);

export const sendGeneralWorkflowSettings = createAction(
  '[General Workflow Settings] Send General Workflow Settings To Server',
  props<{ generalWorkflowSetting: GeneralWorkflowSetting }>()
);

export const getGeneralWorkflowSettings = createAction(
  '[General Workflow Settings] Get General Workflow Settings From Server',
);

export const setAllIdentitiesAndWorkgroups = createAction(
  '[General Workflow Settings] Set allIdentitiesAndWorkgroups',
  props<{ allIdentitiesAndWorkgroups: { allIdentities: any[]; allWorkgroups: any[] } }>()
);

export const setRootOwnerIdName = createAction(
  '[General Workflow Settings] Set Root Owner Id Name'
);

export const compileLeaverRuleBody = createAction(
    '[General Workflow Settings] Compile Leaver Rule Body',
    props<{ ruleBody: string }>()

);
