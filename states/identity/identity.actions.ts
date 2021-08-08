import { createAction, props } from '@ngrx/store';
import { IdentitiesApiResponse, Identity, IdentityApiResponse, NameId, SourceIntegration } from '@models/identity.model';

export const resetToInitialState = createAction(
    '[Identity] Reset To Initial State'
);

export const resetIdentities = createAction(
    '[Identity] Reset To Empty Array'
);
export const resetPagination = createAction(
    '[Identity] Reset Identities Pagination'
);

export const getIdentities = createAction(
    '[Identity] Get Identities From Server'
);

export const setIdentities = createAction(
    '[Identity] Set Identities',
    props<{ identities: Identity[]; managerIdentities: NameId[]; sourceIntegrations: SourceIntegration[]; users: NameId[] }>()
);

export const setTotalItemsCount = createAction(
    '[Identity] Set Total Items Count',
    props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
    '[Identity] Next Page',
    props<{ perPage; page }>()
);

export const toggleRefresh = createAction(
    '[Identity] toggle Refresh',
    props<{ isRefreshing: boolean }>()
);
export const toggleLoading = createAction(
    '[Identity] toggle Loading',
    props<{ isLoading: boolean }>()
);

export const orderByField = createAction(
    '[Identity] Order By',
    props<{ orderBy; orderDirection }>()
);

export const search = createAction(
    '[Identity] Search Workflows',
    props<{ query }>()
);

export const getIdentity = createAction(
    '[Identity] Is Selected',
    props<{ id: number }>()
);

export const resetSelectedIdentity = createAction(
    '[Identity] Reset Identity'
);

export const setIdentity = createAction(
    '[Identity] Set Identity',
    props<{ identity: Identity; managerIdentity: NameId; sourceIntegration: SourceIntegration; localUser: NameId }>()
);

export const getWorkgroups = createAction(
    '[Identity] Get Workgroups'
);

export const resetWorkgroups = createAction(
  '[Identity] Reset Workgroups'
);

export const setWorkgroups = createAction(
    '[Identity] Set Workgroups',
    props<{ allWorkgroups: NameId[]; identityWorkgroupsIds: number[] }>()
);

export const saveWorkgroups = createAction(
    '[Identity] Save Workgroups On The Server',
    props<{ ids: number[] }>()
);

export const setMyAccess = createAction(
    '[Identity] Set My Access Value',
    props<{ myAccess: boolean }>()
);

export const setSelectedIdentityId = createAction(
    '[Identity] Set Selected Identity Id',
    props<{ selectedIdentityId: number }>()
);

export const getMe = createAction(
    '[Identity] Get Identity Of My User',
);

export const setStatus = createAction(
  '[Identity] Set Status',
  props<{ status: string }>()
);
