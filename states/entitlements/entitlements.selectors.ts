import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { EntitlementState } from './entitlements.reducer';
import { IntegrationState } from '../integration/integration.reducer';


export const selectEntitlement = (state: AppState) => state.entitlementsState;

export const selectIntegrationId = (state: AppState) => state.integrationState.selectedIntegrationId;
export const selectIntegration = (state: AppState) => state.integrationState.selectedIntegration;
export const selectTargetLookup = (state: AppState) => state.integrationState.targetsLookup;
export const selectAdditionalPropertyObjectTypes = (state: AppState) => state.integrationState.additionalPropertyObjectTypes;
export const entitlementsSubTabsTargetId = (state: AppState) => state.entitlementsState.entitlementsSubTabsTargetId;
export const entitlementType = (state: AppState) => state.entitlementsState.entitlementType;
export const generalWorkflowSettings = (state: AppState) => state.generalWorkflowSettings.settings;
export const integrationSettings = (state: AppState) => state.integrationState.settings;
export const integrationState = (state: AppState) => state.integrationState;
export const selectEntitlementsProperties = (state: AppState) => state.accountPropertiesState.entitlementProperties;
export const selectAdditionalPropertiesObjects = (state: AppState) => state.accountPropertiesState.additionalPropertyObjectProperties;

export const selectTotalItemsCount = createSelector(selectEntitlement, ({totalItemsCount}: EntitlementState) => totalItemsCount);
export const selectPage = createSelector(selectEntitlement, ({page}: EntitlementState) => page);
export const selectPerPage = createSelector(selectEntitlement, ({perPage}: EntitlementState) => perPage);

export const selectEntitlementType = createSelector(selectEntitlement, ({entitlementType}: EntitlementState) => entitlementType);
export const selectEntitlementTab = createSelector(selectEntitlement, ({entitlementTab}: EntitlementState) => entitlementTab);

export const selectIdentityWorkgroupsDictionary = createSelector(selectEntitlement, ({identityWorkgroupsDictionary}: EntitlementState) => identityWorkgroupsDictionary);
export const selectEntitlements = createSelector(selectEntitlement, ({entitlements}: EntitlementState) => entitlements);
export const selectEntitlementsSubTabsTargetId = createSelector(selectEntitlement, ({entitlementsSubTabsTargetId}: EntitlementState) => entitlementsSubTabsTargetId);
export const selectIntegrationType = createSelector(selectEntitlement, ({integrationType}: EntitlementState) => integrationType);
export const selectImplicitEntitlements = createSelector(selectEntitlement, ({implicitEntitlements}: EntitlementState) => implicitEntitlements);

export const selectTargets = createSelector(selectEntitlement, ({targets}: EntitlementState) => targets);
export const selectCountOfTargets = createSelector(selectEntitlement, ({countOfTargets}: EntitlementState) => countOfTargets);

export const selectEntitlementSubTabsWithTargets = createSelector(selectEntitlement, ({entitlementSubTabsWithTargets}: EntitlementState) => entitlementSubTabsWithTargets);
export const selectEntitlementSubTabs = createSelector(selectEntitlement, ({entitlementSubTabs}: EntitlementState) => entitlementSubTabs);
export const selectTargetsArray = createSelector(selectEntitlement, ({targetsArray}: EntitlementState) => targetsArray);


export const selectIsBlackListSupported = createSelector(integrationState, ({areBlackWhiteListsSupported}: IntegrationState) => areBlackWhiteListsSupported);
export const selectIsBlackWhiteListPropertiesVisible = createSelector(integrationState, ({isBlackWhiteListPropertiesVisible}: IntegrationState) => isBlackWhiteListPropertiesVisible);


export const selectEntitlementTypeIfParamsReady = createSelector(
    entitlementsSubTabsTargetId,
    entitlementType, selectIntegration, generalWorkflowSettings,
    selectEntitlementTab,
    (
        entitlementsSubTabsTargetId,
        entitlementType,
        selectIntegration,
        workflowSettings,
        entitlementTab) => {
        if (entitlementsSubTabsTargetId
            && entitlementType
            && selectIntegration?.value
            && entitlementTab) {
            return {
                entitlementType,
                generalWorkflowSettings
            };
        }
    });


export const selectParamsForInheritValues = createSelector(selectIntegrationType,
    integrationSettings, generalWorkflowSettings, entitlementsSubTabsTargetId,
    selectIdentityWorkgroupsDictionary, entitlementType,
    (
        selectIntegrationType,
        settings,
        generalWorkflowSettings,
        entitlementsSubTabsTargetId,
        identityWorkgroupsDictionary,
        entitlementType
    ) => {
        if (selectIntegrationType
            && settings
            && generalWorkflowSettings
            && entitlementsSubTabsTargetId
            && identityWorkgroupsDictionary
            && entitlementType) {
            return {
                identityWorkgroupsDictionary,
                envType: selectIntegrationType,
                settings,
                generalWorkflowSettings,
                targetId: entitlementsSubTabsTargetId[entitlementType]
            };
        }
    });


export const selectTargetsEntitlements = createSelector(selectTargets,
    selectEntitlements,
    (
        targets,
        entitlements) => {
        if (targets
            && entitlements) {
            return {
                targets,
                entitlements
            };
        }
    });


export const selectWhiteAndBlackProperties = createSelector(
    /* For Entitlements */
    selectIsBlackWhiteListPropertiesVisible,
    selectIsBlackListSupported,
    (selectIsBlackWhiteListPropertiesVisible, selectIsBlackListSupported) => {
        if ((selectIsBlackListSupported !== null) && (selectIsBlackWhiteListPropertiesVisible !== null)) {
            return {
                selectIsBlackWhiteListPropertiesVisible,
                selectIsBlackListSupported
            };
        }
    });

export const selectSubTabsForIntegrationsPage = createSelector(
    /* For Entitlements */
    selectEntitlementSubTabsWithTargets,
    selectEntitlementSubTabs,
    selectTargetsArray,
    selectTargetLookup,
    /*AdditionalProperty Objects*/
    selectAdditionalPropertyObjectTypes,
    /*Account Properties*/
    selectEntitlementsProperties,
    selectAdditionalPropertiesObjects,
    //blackWhiteList
    (
        subTabsWithTargets,
        subTabsWithOutTargets,
        targetsArray,
        targetLookup,
        additionalPropertyObjects,
        entitlementProperties,
        additionalPropertiesObjects,
        selectWhiteAndBlackProperties,
    ) => {
        if (
            subTabsWithTargets
            && subTabsWithOutTargets
            && targetsArray
            && targetLookup
            && additionalPropertyObjects
            && entitlementProperties
            && additionalPropertiesObjects

        ) {
            return {
                subTabsWithTargets,
                subTabsWithOutTargets,
                targetsArray,
                targetLookup,
                additionalPropertyObjects,
                entitlementProperties,
                additionalPropertiesObjects,
            };
        }
    });



