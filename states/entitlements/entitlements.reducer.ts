import { createReducer, on } from '@ngrx/store';
import * as EntitlementsActions from '../entitlements/entitlements.actions';
import {
    EntitlementsSubTabsTargetId,
    EntitlementSubTabsWithTargets,
    Target,
    TargetEntitlementTypes
} from '@models/entitlement.model';
import { AllIdentitiesAndWorkgroups } from '@models/general-workflow-settings.model';
import { IntegrationTypes } from '@const/environment-types.const';

export interface EntitlementState {
    targetId: string;
    entitlementType: IntegrationTypes;
    entitlementTab: string;
    perPage: number;
    page: number;
    totalItemsCount: number;
    orderBy: string;
    orderDirection: string;
    query: string;
    entitlements: any[];
    entitlementSubTabs: string[];
    entitlementSubTabsWithTargets: EntitlementSubTabsWithTargets[];
    entitlementsSubTabsTargetId: EntitlementsSubTabsTargetId;
    identityWorkgroupsDictionary: AllIdentitiesAndWorkgroups;
    integrationType: string;
    implicitEntitlements: any;
    targets: Target[];
    targetsArray: string[];
    countOfTargets: number;
}

export const initialState: EntitlementState = {
    targetId: null,
    entitlementType: null,
    entitlementTab: null,
    perPage: 10,
    page: 0,
    totalItemsCount: 0,
    orderBy: null,
    orderDirection: null,
    query: null,
    entitlements: null,
    entitlementSubTabs: null,
    entitlementSubTabsWithTargets: null,
    entitlementsSubTabsTargetId: null,
    identityWorkgroupsDictionary: null,
    integrationType: null,
    implicitEntitlements: null,
    targets: null,
    targetsArray: null,
    countOfTargets: null
};

export const entitlementsStateReducer = createReducer(
    initialState,
    on(
        EntitlementsActions.resetToInitialState,
        () => ({
            ...initialState
        })
    ),
    on(
        EntitlementsActions.setSelectedTargetId,
        (state, {targetId}) => ({
            ...state,
            targetId
        })
    ),
    on(
        EntitlementsActions.setSelectedEntitlementType,
        (state, {entitlementType}) => ({
            ...state,
            entitlementType
        })
    ), on(
        EntitlementsActions.setSelectedEntitlementTab,
        (state, {entitlementTab}) => ({
            ...state,
            entitlementTab
        })
    ),
    on(
        EntitlementsActions.setEntitlements,
        (state, {entitlements}) => {
            return {
                ...state,
                entitlements
            };
        }
    ),
    on(
        EntitlementsActions.setEntitlementsSubTabs,
        (state, {targetEntitlementTypes}) => {

            return {
                ...state,
                entitlementSubTabs: getEntitlementsSubTabs(targetEntitlementTypes).tabs,
                entitlementSubTabsWithTargets: getEntitlementsSubTabs(targetEntitlementTypes).tabsWithTargets,
                entitlementsSubTabsTargetId: getEntitlementsSubTabsTargetIdCollections(targetEntitlementTypes),
                countOfTargets: targetEntitlementTypes.length,
                targetsArray: getTargetsArray(targetEntitlementTypes)
            };
        }
    ),
    on(
        EntitlementsActions.setIdentityWorkgroupsDictionary,
        (state, {identityWorkgroupsDictionary}) => ({
            ...state,
            identityWorkgroupsDictionary
        })
    ), on(
        EntitlementsActions.setTargets,
        (state, {targets}) => ({
            ...state,
            targets
        })
    ),
    on(
        EntitlementsActions.setIntegrationType,
        (state, {integrationType}) => ({
            ...state,
            integrationType
        })
    ),
    on(
        EntitlementsActions.setImplicitEntitlements,
        (state, {implicitEntitlements}) => ({
            ...state,
            implicitEntitlements
        })
    ),
    on(
        EntitlementsActions.nextPage,
        (state, {perPage, page}) => ({
            ...state,
            perPage,
            page
        })
    ),
    on(
        EntitlementsActions.resetPagination,
        (state, {}) => ({
            ...state,
            page: initialState.page,
        })
    ),
    on(
        EntitlementsActions.search,
        (state, {query}) => ({
            ...state,
            query
        })
    ),
    on(
        EntitlementsActions.orderByField,
        (state, {orderBy, orderDirection}) => ({
            ...state,
            orderBy,
            orderDirection
        })
    ),
    on(
        EntitlementsActions.resetItems,
        (state, {}) => ({
            ...state,
            entitlements: initialState.entitlements,
        })
    ),
    on(
        EntitlementsActions.setTotalItemsCount,
        (state, {totalItemsCount}) => ({
            ...state,
            totalItemsCount
        })
    )
);


function getEntitlementsSubTabs(targetEntitlementTypes: TargetEntitlementTypes[]) {
    let tabs = [];
    const tabsWithTargets = [];
    targetEntitlementTypes.map(item => {
        // item.entitlementTypes.map(type=>{
        //   tabs.push(`${item.targetId} ${type}`)
        // })
        tabsWithTargets.push({targetName: item.targetId, entitlementSubTab: item.entitlementTypes});
        tabs = tabs.concat(item.entitlementTypes);
    });
    return {tabs, tabsWithTargets};
}

function getTargetsArray(targetEntitlementTypes: TargetEntitlementTypes[]) {
    return targetEntitlementTypes.map(item => item.targetId);
}

function getEntitlementsSubTabsTargetIdCollections(targetEntitlementTypes: TargetEntitlementTypes[]) {
    const collection = {};
    targetEntitlementTypes.map(item => {
        item.entitlementTypes.map(_i => {
            collection[_i] = item.targetId;
        });
    });
    return collection;
}

