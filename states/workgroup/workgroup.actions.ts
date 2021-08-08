import { createAction, props } from '@ngrx/store';
import { Workgroup, WorkgroupSaveApiRequest, WorkgroupUpdateApiRequest } from '@models/workgroup.model';
import { NameId } from '@models/identity.model';

export const resetToInitialState = createAction(
  '[Workgroup] Reset To Initial State'
);

export const resetWorkgroups = createAction(
  '[Workgroup] Reset To Empty Array'
);
export const resetPagination = createAction(
  '[Workgroup] Reset Identities Pagination'
);

export const getWorkgroups = createAction(
  '[Workgroup] Get Workgroups From Server'
);

export const setWorkgroups = createAction(
  '[Workgroup] Set Workgroups',
  props<{ workgroups: Workgroup[] }>()
);

export const setTotalItemsCount = createAction(
  '[Workgroup] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Workgroup] Next Page',
  props<{ perPage; page }>()
);

export const toggleRefresh = createAction(
  '[Workgroup] toggle Refresh',
  props<{ isRefreshing: boolean }>()
);
export const toggleLoading = createAction(
  '[Workgroup] toggle Loading',
  props<{ isLoading: boolean }>()
);

export const orderByField = createAction(
  '[Workgroup] Order By',
  props<{ orderBy; orderDirection }>()
);

export const search = createAction(
  '[Workgroup] Search Workgroups',
  props<{ query }>()
);

export const getWorkgroup = createAction(
  '[Workgroup] Is Selected',
  props<{ id: number }>()
);

export const getAllIdentities = createAction(
  '[Workgroup Create] Get All Identities',
);

export const passAllIdentities = createAction(
  '[Workgroup Create] Pass All Identities',
  props<{ allIdentities: NameId[] }>()
);

export const resetSelectedWorkgroup = createAction(
  '[Workgroup] Reset Workgroup'
);

export const setWorkgroup = createAction(
  '[Workgroup] Set Workgroup',
  props<{ workgroup: Workgroup; workgroupIdentities: number[]; allIdentities: NameId[] }>()
);

export const setIsCreateStatus = createAction(
  '[Workgroup] Set Is Create Status',
  props<{ isCreate: boolean }>()
);

export const setIsSaving = createAction(
  '[Workgroup] Set Is Saving Status',
  props<{ isSaving: boolean }>()
);

export const createWorkgroup = createAction(
  '[Workgroup] Save Workgroup On Server',
  props<{ workgroup: WorkgroupSaveApiRequest }>()
);

export const createdSuccessWorkgroup = createAction(
  '[Workgroup] Workgroup Successfully Saved on the Server',
  props<{ id: number }>()
);

export const updateWorkgroup = createAction(
  '[Workgroup] Update Workgroup On Server',
  props<{ workgroup: WorkgroupUpdateApiRequest }>()
);
