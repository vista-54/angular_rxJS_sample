import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { AccountAttributesState } from './account-attributes.reducer';

export const selectAccountAttributes = (state: AppState) => state.accountAttributesState;
export const selectIntegration = (state: AppState) => state.integrationState.selectedIntegration;
export const selectedAdditionalPropertyObjectType = (state: AppState) => state.accountAttributesState.additionalPropertyObjectType;

export const selectItems = createSelector(selectAccountAttributes, ({items}: AccountAttributesState) => items);
// export const selectedAdditionalPropertyObjectType = createSelector(selectAccountAttributes, ({additionalPropertyObjectType}: AccountAttributesState) => additionalPropertyObjectType);
export const selectTotalItemsCount = createSelector(selectAccountAttributes, ({totalItemsCount}: AccountAttributesState) => totalItemsCount);
export const selectPage = createSelector(selectAccountAttributes, ({page}: AccountAttributesState) => page);
export const selectPerPage = createSelector(selectAccountAttributes, ({perPage}: AccountAttributesState) => perPage);


export const selectItemsIfParamsReady = createSelector(selectedAdditionalPropertyObjectType, selectIntegration,
    (
        type,
        integration) => {
        if (type && integration.value.id !== null) {
            return {type};
        }
    });
