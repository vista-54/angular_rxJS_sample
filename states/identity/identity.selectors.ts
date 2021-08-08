import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { IdentityState } from './identity.reducer';

export const selectAllWorkgroups = (state: AppState) => state.identityState.allWorkgroups;
export const selectIdentityWorkgroupsIds = (state: AppState) => state.identityState.identityWorkgroupsIds;

export const selectIdentity = (state: AppState) => state.identityState;

export const selectIdentities = createSelector(selectIdentity, ({identities}: IdentityState) => identities);
export const selectTotalItemsCount = createSelector(selectIdentity, ({totalItemsCount}: IdentityState) => totalItemsCount);
export const selectPage = createSelector(selectIdentity, ({page}: IdentityState) => page);
export const selectPerPage = createSelector(selectIdentity, ({perPage}: IdentityState) => perPage);
export const selectSelectedIdentity = createSelector(selectIdentity, ({selectedIdentity}: IdentityState) => selectedIdentity);
export const selectSelectedIdentityId = createSelector(selectIdentity, ({selectedIdentityId}: IdentityState) => selectedIdentityId);
export const selectIsRefreshing = createSelector(selectIdentity, ({isRefreshing}: IdentityState) => isRefreshing);
export const selectIsLoading = createSelector(selectIdentity, ({isLoading}: IdentityState) => isLoading);
export const selectMyAccess = createSelector(selectIdentity, ({myAccess}: IdentityState) => myAccess);
export const selectIdentityData = createSelector(selectIdentity, ({selectedIdentityData}: IdentityState) => selectedIdentityData);


export const selectAllWorkgroupsConfig = createSelector(selectAllWorkgroups, selectIdentityWorkgroupsIds,
    (
        allIdentitiesAndWorkgroups,
        identityWorkgroupsIds,
    ) => {
        if (allIdentitiesAndWorkgroups && identityWorkgroupsIds) {
            return {
                allIdentitiesAndWorkgroups,
                identityWorkgroupsIds,
            };
        }
    });
