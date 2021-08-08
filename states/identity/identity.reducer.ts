import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from '../identity/identity.actions';
import { IdentitiesApiResponse, Identity, IdentityApiResponse, NameId } from '@models/identity.model';


export interface IdentityState {
    identities: Identity[];
    selectedIdentity: Identity;
    selectedIdentityData: IdentityApiResponse;
    perPage: number;
    page: number;
    orderBy: string;
    orderDirection: string;
    totalItemsCount: number;
    query: string;
    isRefreshing: boolean;
    isLoading: boolean;
    allWorkgroups: NameId[];
    identityWorkgroupsIds: number[];
    myAccess: boolean;
    selectedIdentityId: number;
    status: string;
}

export const initialState: IdentityState = {
    identities: null,
    selectedIdentity: null,
    selectedIdentityData: null,
    perPage: 25,
    page: 0,
    orderBy: null,
    orderDirection: null,
    totalItemsCount: 0,
    query: null,
    isRefreshing: false,
    isLoading: false,
    allWorkgroups: [],
    identityWorkgroupsIds: [],
    myAccess: false,
    selectedIdentityId: null,
    status: 'all'
};

export const identityStateReducer = createReducer(
    initialState,
    on(
        IdentityActions.resetToInitialState,
        () => ({
            ...initialState
        })
    ),
    on(
        IdentityActions.resetPagination,
        (state, {}) => ({
            ...state,
            page: initialState.page,
        })
    ),
    on(
        IdentityActions.resetIdentities,
        (state, {}) => ({
            ...state,
            identities: initialState.identities,
        })
    ),
    on(
        IdentityActions.nextPage,
        (state, {perPage, page}) => ({
            ...state,
            perPage,
            page
        })
    ),
    on(
        IdentityActions.setIdentities,
        (state, {identities}) => ({
            ...state,
            identities
        })
    ), on(
        IdentityActions.setTotalItemsCount,
        (state, {totalItemsCount}) => ({
            ...state,
            totalItemsCount
        })
    ),
    on(
        IdentityActions.toggleRefresh,
        (state, {isRefreshing}) => ({
            ...state,
            isRefreshing
        })
    ),

    on(
        IdentityActions.toggleLoading,
        (state, {isLoading}) => ({
            ...state,
            isLoading
        })
    ),
    on(
        IdentityActions.orderByField,
        (state, {orderBy, orderDirection}) => ({
            ...state,
            orderBy,
            orderDirection
        })
    ),
    on(
        IdentityActions.search,
        (state, {query}) => ({
            ...state,
            query
        })
    ),
    on(
        IdentityActions.setIdentity,
        (state, {identity, localUser, managerIdentity, sourceIntegration}) => ({
            ...state,
            selectedIdentity: identity,
            selectedIdentityData: {identity, localUser, managerIdentity, sourceIntegration}
        })
    ),
    on(
        IdentityActions.setMyAccess,
        (state, {myAccess}) => ({
            ...state,
            myAccess
        })
    ),
    on(
        IdentityActions.resetSelectedIdentity,
        (state) => ({
            ...state,
            selectedIdentity: initialState.selectedIdentity
        })
    ),
    on(
        IdentityActions.setWorkgroups,
        (state, {allWorkgroups, identityWorkgroupsIds}) => ({
            ...state,
            allWorkgroups,
            identityWorkgroupsIds
        })
    ),
    on(
      IdentityActions.resetWorkgroups,
      (state) => ({
          ...state,
          allWorkgroups: initialState.allWorkgroups,
          identityWorkgroupsIds: initialState.identityWorkgroupsIds
      })
    ),
    on(
        IdentityActions.setSelectedIdentityId,
        (state, {selectedIdentityId}) => ({
            ...state,
            selectedIdentityId
        })
    ),
    on(
      IdentityActions.setStatus,
      (state, {status}) => ({
          ...state,
          status
      })
  ),
);
