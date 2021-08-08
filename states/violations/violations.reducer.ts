import { AnalyticsMetadata, Configuration, IdViolationConfiguration, ViolationSettings } from '@models/analytics.model';
import { createReducer, on } from '@ngrx/store';
import * as ViolationsActions from '@states/violations/violations.actions';
import { DataGridData } from '@models/data-grid-data.model';
import { ChartData } from '@models/chart-data.model';
import {
    addArrayControl,
    createFormGroupState,
    FormGroupState,
    onNgrxForms, removeArrayControl,
} from 'ngrx-forms';


const FORM_ID = 'VIOLATION SETTINGS FORM';

const violationSettingsFormState = createFormGroupState<ViolationSettings>(FORM_ID, {
    allowedWorkingHoursStart: null,
    allowedWorkingHoursFinish: null,
    timeZoneOffset: null,
    allowedNormalLogins: null,
    ipRanges: [],
});

export declare interface ViolationsState {
    items: IdViolationConfiguration[];
    perPage: number;
    page: number;
    totalItemsCount: number;
    metadata: AnalyticsMetadata;
    selectedConfiguration: Configuration;
    query: string;
    selectedConfigurationId: string;
    gridData: DataGridData;
    chartData: ChartData;
    gridSkip: number;
    gridPerPage: number;
    violationSettingsForm: FormGroupState<ViolationSettings>;
    isViolationSettingsLoaded: boolean;
}

export const initialState: ViolationsState = {
    items: null,
    perPage: 10,
    page: 0,
    totalItemsCount: 0,
    metadata: null,
    selectedConfiguration: null,
    query: null,
    selectedConfigurationId: null,
    gridData: null,
    chartData: null,
    gridSkip: 0,
    gridPerPage: 25, //default
    violationSettingsForm: violationSettingsFormState,
    isViolationSettingsLoaded: false

};

export const violationsStateReducer = createReducer(
    initialState,
    onNgrxForms(),
    on(
        ViolationsActions.getItems,
        () => ({
            ...initialState
        })
    ),
    on(
        ViolationsActions.setItems,
        (state, {configurations}) => ({
            ...state,
            items: configurations
        })
    ),
    on(
        ViolationsActions.setTotalItemsCount,
        (state, {totalItemsCount}) => ({
            ...state,
            totalItemsCount
        })
    ), on(
        ViolationsActions.setSelectedConfigurationId,
        (state, {selectedConfigurationId}) => ({
            ...state,
            selectedConfigurationId
        })
    ),
    on(
        ViolationsActions.search,
        (state, {query}) => ({
            ...state,
            query
        })
    ),
    on(
        ViolationsActions.addIpRange,
        (state, {range}) => {
            const array = state.violationSettingsForm.controls.ipRanges;
            const arrayWithControl = addArrayControl(range)(array);

            return {
                ...state,
                violationSettingsForm: {
                    ...state.violationSettingsForm,
                    controls: {
                        ...state.violationSettingsForm.controls,
                        ipRanges: arrayWithControl
                    }
                }
            };
        }
    ),

    on(
        ViolationsActions.rmIpRange,
        (state, {index}) => {
            const array = state.violationSettingsForm.controls.ipRanges;
            const arrayWithControl = removeArrayControl(index)(array);
            const arrayValues = [...state.violationSettingsForm.value.ipRanges];
            arrayValues.splice(index, 1);
            return {
                ...state,
                violationSettingsForm: {
                    ...state.violationSettingsForm,
                    controls: {
                        ...state.violationSettingsForm.controls,
                        ipRanges: arrayWithControl
                    },
                    value: {
                        ...state.violationSettingsForm.value,
                        ipRanges: arrayValues
                    }
                }
            };
        }
    ),
    on(
        ViolationsActions.getMetadataSuccess,
        (state, {metadata}) => ({
            ...state,
            metadata
        })
    ),
    on(
        ViolationsActions.resetItems,
        (state,) => ({
            ...state,
            items: initialState.items
        })
    ),
    on(
        ViolationsActions.resetPagination,
        (state) => ({
            ...state,
            page: initialState.page,
        })
    ),
    on(
        ViolationsActions.setSelectedConfiguration,
        (state, {configuration}) => ({
            ...state,
            selectedConfiguration: Object.assign({}, state.selectedConfiguration, configuration)
        })
    ),
    on(
        ViolationsActions.resetSelectedConfiguration,
        (state,) => ({
            ...state,
            selectedConfiguration: initialState.selectedConfiguration
        })
    ),
    on(
        ViolationsActions.nextPage,
        (state, {perPage, page}) => ({
            ...state,
            perPage,
            page
        })
    ),
    on(
        ViolationsActions.getChartByViolationIdSuccess,
        (state, {chartData}) => ({
            ...state,
            chartData,
        })
    ),
    on(
        ViolationsActions.getGridByViolationIdSuccess,
        (state, {gridData}) => ({
            ...state,
            gridData,
        })
    ),
    on(
        ViolationsActions.resetCharGridData,
        (state,) => ({
            ...state,
            chartData: initialState.chartData,
            gridData: initialState.gridData
        })
    ),
    on(
        ViolationsActions.setGridOutputsParams,
        (state, {perPage, skip}) => ({
            ...state,
            gridPerPage: perPage,
            gridSkip: skip
        })
    ),
    on(
        ViolationsActions.resetIsViolationLoaded,
        (state,) => ({
            ...state,
            isViolationSettingsLoaded: initialState.isViolationSettingsLoaded,
        })
    ),
    on(
        ViolationsActions.getViolationSettingsSuccess,
        (state, {violationSettings}) => ({
            ...state,
            violationSettingsForm: createFormGroupState(FORM_ID, violationSettings),
            isViolationSettingsLoaded: true
        })
    ),
);

