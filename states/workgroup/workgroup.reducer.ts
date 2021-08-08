import { createReducer, on } from '@ngrx/store';
import * as WorkgroupActions from '../workgroup/workgroup.actions';
import { Workgroup } from '../../models/workgroup.model';


export interface WorkgroupState {
  workgroups: Workgroup[];
  selectedWorkgroup: Workgroup;
  perPage: number;
  page: number;
  orderBy: string;
  orderDirection: string;
  totalItemsCount: number;
  query: string;
  isRefreshing: boolean;
  isLoading: boolean;
  isCreate: boolean;
  isSaving: boolean;
}

export const initialState: WorkgroupState = {
  workgroups: null,
  selectedWorkgroup: null,
  perPage: 10,
  page: 0,
  orderBy: null,
  orderDirection: null,
  totalItemsCount: 0,
  query: null,
  isRefreshing: false,
  isLoading: false,
  isCreate: false,
  isSaving: false
};

export const workgroupStateReducer = createReducer(
  initialState,
  on(
    WorkgroupActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ), on(
    WorkgroupActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    WorkgroupActions.resetWorkgroups,
    (state, {}) => ({
      ...state,
      workgroups: initialState.workgroups,
    })
  ),
  on(
    WorkgroupActions.setIsCreateStatus,
    (state, {isCreate}) => ({
      ...state,
      isCreate,
      selectedWorkgroup: initialState.selectedWorkgroup
    })
  ),
  on(
    WorkgroupActions.nextPage,
    (state, {perPage, page}) => ({
        ...state,
        perPage,
        page
      })
  ),
  on(
    WorkgroupActions.setWorkgroups,
    (state, {workgroups}) => ({
        ...state,
        workgroups
      })
  ), on(
    WorkgroupActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
        ...state,
        totalItemsCount
      })
  ),
  on(
    WorkgroupActions.toggleRefresh,
    (state, {isRefreshing}) => ({
        ...state,
        isRefreshing
      })
  ),

  on(
    WorkgroupActions.toggleLoading,
    (state, {isLoading}) => ({
        ...state,
        isLoading
      })
  ),
  on(
    WorkgroupActions.orderByField,
    (state, {orderBy, orderDirection}) => ({
        ...state,
        orderBy,
        orderDirection
      })
  ),
  on(
    WorkgroupActions.search,
    (state, {query}) => ({
        ...state,
        query
      })
  ),
  on(
    WorkgroupActions.setWorkgroup,
    (state, {workgroup}) => ({
        ...state,
        selectedWorkgroup: workgroup
      })
  ),
  on(
    WorkgroupActions.setIsSaving,
    (state, {isSaving}) => ({
        ...state,
        isSaving
      })
  ),
  on(
    WorkgroupActions.resetSelectedWorkgroup,
    (state) => ({
        ...state,
        selectedIdentity: initialState.selectedWorkgroup
      })
  )
);
