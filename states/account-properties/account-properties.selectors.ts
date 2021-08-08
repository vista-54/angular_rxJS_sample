import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { AccountPropertiesState } from './account-properties.reducer';

export const selectProperty = (state: AppState) => state.accountPropertiesState;

export const selectPaginatedItems = createSelector(selectProperty, ({paginatedItems}: AccountPropertiesState) => paginatedItems);
export const selectTotalCountItems = createSelector(selectProperty, ({totalItemsCount}: AccountPropertiesState) => totalItemsCount);
export const selectPerPage = createSelector(selectProperty, ({perPage}: AccountPropertiesState) => perPage);
export const selectPage = createSelector(selectProperty, ({page}: AccountPropertiesState) => page);
export const selectEntitlementsProperties = createSelector(selectProperty, ({entitlementProperties}: AccountPropertiesState) => entitlementProperties);
export const selectAdditionalPropertiesObjects = createSelector(selectProperty, ({additionalPropertyObjectProperties}: AccountPropertiesState) => additionalPropertyObjectProperties);


export const selectProperties = createSelector(selectEntitlementsProperties,
  selectAdditionalPropertiesObjects,
  (
    entitlementsProperties,
    additionalProperties) => {
    if (entitlementsProperties
      && additionalProperties) {
      return {
        entitlementsProperties,
        additionalProperties
      };
    }
  });
