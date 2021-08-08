import { GeneralWorkflowSetting } from '../../../pages/identity-automation/pages/integration/models/settings.model';
import { createReducer, on } from '@ngrx/store';
import * as GeneralWorkflowSettingsActions from '../general-workflow-settings/general-workflow-settings.actions';

export interface identityIdName {
  id: number;
  name: string;
  status?: string;
}

export interface GeneralWorkflowSettingsState {
  allIdentitiesAndWorkgroups: { allIdentities: identityIdName[]; allWorkgroups: identityIdName[] };
  settings: GeneralWorkflowSetting;
  rootOwnerIdName: identityIdName;
}

export const initialState: GeneralWorkflowSettingsState = {
  allIdentitiesAndWorkgroups: null,
  settings: null,
  rootOwnerIdName: {id: null, name: 'Inherit (undefined)',}
};

export const generalWorkflowSettingsStateReducer = createReducer(
  initialState,
  on(
    GeneralWorkflowSettingsActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    GeneralWorkflowSettingsActions.setSettings,
    (state, {settings}) => ({
      ...state,
      settings,
    })
  ),
  on(
    GeneralWorkflowSettingsActions.setAllIdentitiesAndWorkgroups,
    (state, {allIdentitiesAndWorkgroups}) => ({
      ...state,
      allIdentitiesAndWorkgroups,
    })
  ),
  on(
    GeneralWorkflowSettingsActions.setRootOwnerIdName,
    (state) => {
      let { rootOwnerIdName } = initialState;

      const rootOwner = state.settings?.rootOwner;
      const allIdentities = state.allIdentitiesAndWorkgroups?.allIdentities;
      const allWorkgroups = state.allIdentitiesAndWorkgroups?.allWorkgroups;

      if (rootOwner && allIdentities && allWorkgroups) {
        if (rootOwner.type === 'Identity') {
          const owner = allIdentities.find(x => x.id === rootOwner.id);
          rootOwnerIdName = {...owner, name: `Inherit (${owner?.name})`};
        } else if (rootOwner.type === 'Workgroup') {
          const owner = allWorkgroups.find(x => x.id === rootOwner.id);
          rootOwnerIdName = {...owner, name: `Inherit (${owner?.name})`};
        }
      }
      return {
        ...state,
        rootOwnerIdName
      };
    }
  )
);
