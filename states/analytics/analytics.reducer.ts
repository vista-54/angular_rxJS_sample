import { createReducer, on } from '@ngrx/store';
import * as AnalyticsActions from '@states/analytics/analytics.actions';
import { AnalyticsFilter, AnalyticsMetadata, Configuration, IdConfiguration, LogItem } from '@models/analytics.model';
import { ChartType, DefaultView } from '@enums/analytics';
import { DataGridData, DataGridOutput } from '@models/data-grid-data.model';
import { ChartData } from '@models/chart-data.model';
import { ProductModel } from '../../../pages/identity-automation/pages/integration/models/product.model';
import { createFormArrayState, FormArrayState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction } from 'ngrx-forms';
import { SELECTED_INTEGRATION_FORM_ID } from '@states/integration/forms/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { newArray } from '@angular/compiler/src/util';

const FILTERS_ARRAY_FORM_ID = 'FILTER FORM';

const MOCK_DATA: IdConfiguration[] = [
  {
    id: 0,
    analyticsConfiguration: {
      name: 'All data',
      description: 'New configuration',
      defaultView: DefaultView.Grid,
      chartType: ChartType.Bar,
      filters: [],
      globalFilter: null,
      dimension1: null,
      dimension1Top: null,
      dimension1OrderingDirection: null,
      dimension1IncludeRest: null,
      dimension2: null,
      dimension2Top: null,
      dimension2OrderingDirection: null,
      measuringColumn: null,
      dimension2IncludeRest: null,
      aggregationType: null,
      environmentTypes: null,
      columnNames: []
    }

  },
];


export declare interface AnalyticsState {
  items: IdConfiguration[];
  perPage: number;
  page: number;
  totalItemsCount: number;
  metadata: AnalyticsMetadata;
  colNamesLookup: { [key: string]: string[] };
  colNamesColTypeLookup: { [key: string]: string[] };
  selectedConfiguration: Configuration;
  query: string;
  selectedConfigurationId: number;
  isEdited: boolean;
  gridData: DataGridData;
  isCloneMode: boolean;
  viewModeDefaultView: DefaultView;
  chartData: ChartData;
  gridOutputParams: DataGridOutput;
  isConfigurationValid: boolean;
  validationErrorText: string;
  uniquenessIdLookup: any;
  gridSkip: number;
  gridPerPage: number;
  columnNameDisplayNameLookup: any;
  columnNameColumnTypeLookup: any;
  cloneConfigurationId: string;
  isViolationCloned: boolean;
  gridError: boolean;
  filters: FormArrayState<AnalyticsFilter>;
}

export const initialState: AnalyticsState = {
  items: null,
  perPage: 10,
  page: 0,
  totalItemsCount: 0,
  metadata: null,
  colNamesLookup: null,
  colNamesColTypeLookup: null,
  selectedConfiguration: null,
  query: null,
  selectedConfigurationId: null,
  isEdited: false,
  gridData: null,
  isCloneMode: false,
  viewModeDefaultView: DefaultView.Grid,
  chartData: null,
  gridOutputParams: null,
  isConfigurationValid: true,
  validationErrorText: null,
  uniquenessIdLookup: null,
  gridSkip: 0,
  gridPerPage: 25, // default
  columnNameDisplayNameLookup: null,
  columnNameColumnTypeLookup: null,
  cloneConfigurationId: null,
  isViolationCloned: false,
  gridError: false,
  filters: createFormArrayState(FILTERS_ARRAY_FORM_ID, []),
};

export const analyticStateReducer = createReducer(
  initialState,
  onNgrxForms(),
  onNgrxFormsAction(SetValueAction, (state, action) => {
    if (action.controlId.indexOf(FILTERS_ARRAY_FORM_ID) !== -1) {
      const indexOfElement = parseInt(action.controlId.split('.')[1]);
      const newArr = state.filters.value;
      newArr[indexOfElement] = {...newArr[indexOfElement], filterType: '', value: ''};
      state = {...state, filters: setValue(state.filters, [...newArr])};
    }
    return state;
  }),
  on(
    AnalyticsActions.resetToInitialState,
    () => ({
      ...initialState
    })
  ),
  on(
    AnalyticsActions.resetToInitialStateWithoutMetadata,
    (state) => ({
      ...initialState,
      metadata: state.metadata,
      colNamesLookup: state.colNamesLookup,
      colNamesColTypeLookup: state.colNamesColTypeLookup,
      uniquenessIdLookup: state.uniquenessIdLookup,
      columnNameDisplayNameLookup: state.columnNameDisplayNameLookup,
      columnNameColumnTypeLookup: state.columnNameColumnTypeLookup
    })
  ),
  on(
    AnalyticsActions.resetToInitialStateWithoutCloneMode,
    (state) => ({
      ...initialState,
      metadata: state.metadata,
      isCloneMode: state.isCloneMode,
      selectedConfiguration: state.selectedConfiguration,
      uniquenessIdLookup: state.uniquenessIdLookup,
      columnNameDisplayNameLookup: state.columnNameDisplayNameLookup,
      columnNameColumnTypeLookup: state.columnNameColumnTypeLookup,
      cloneConfigurationId: state.cloneConfigurationId,
      isViolationCloned: state.isViolationCloned
    })
  ),
  on(
    AnalyticsActions.setItems,
    (state, {configurations}) => {
      const items = MOCK_DATA.concat(configurations ? configurations : []);
      return {
        ...state,
        items
      };
    }
  ),
  on(
    AnalyticsActions.setTotalItemsCount,
    (state, {totalItemsCount}) => ({
      ...state,
      totalItemsCount
    })
  ),
  on(
    AnalyticsActions.setSelectedConfigurationId,
    (state, {selectedConfigurationId}) => ({
      ...state,
      selectedConfigurationId
    })
  ),
  on(
    AnalyticsActions.setIsEdited,
    (state, {isEdited}) => ({
      ...state,
      isEdited
    })
  ),
  on(
    AnalyticsActions.search,
    (state, {query}) => ({
      ...state,
      query
    })
  ),
  on(
    AnalyticsActions.getMetadataSuccess,
    (state, {metadata}) => {
      const dimensionSelector = metadata.logItems.filter(item => item.isDimension).sort(sortAlphabeticalByField);
      const sortedLogItems = ProductModel.deepCopy(metadata.logItems).sort(sortAlphabeticalByField);
      const transformedLogItems = transformLogItems(sortedLogItems);
      const md = {...metadata, logItems: transformedLogItems};
      const colNamesLookup = {};
      const colNamesColTypeLookup = {};
      md.logItems.map(item => {
        colNamesLookup[item.columnName] = item.supportedFilterTypes;
        colNamesColTypeLookup[item.columnName] = item.columnType;
      });

      return {
        ...state,
        metadata: md,
        colNamesLookup,
        colNamesColTypeLookup,
        uniquenessIdLookup: makeUniquenessIdLookup(dimensionSelector),
        columnNameDisplayNameLookup: makeColumnNameDisplayNameLookup(metadata.logItems),
        columnNameColumnTypeLookup: makeColumnNameColumnTypeLookup(metadata.logItems)
      };
    }
  ),
  on(
    AnalyticsActions.resetItems,
    (state) => ({
      ...state,
      items: initialState.items
    })
  ),
  on(
    AnalyticsActions.resetPagination,
    (state, {}) => ({
      ...state,
      page: initialState.page,
    })
  ),
  on(
    AnalyticsActions.setSelectedConfiguration,
    (state, {configuration}) => {
      return {
        ...state,
        selectedConfiguration: Object.assign({}, state.selectedConfiguration, configuration),
        filters: setValue(state.filters, configuration.filters)
        // viewModeDefaultView: configuration.defaultView
      };
    }
  ),
  on(
    AnalyticsActions.resetSelectedConfiguration,
    (state,) => ({
      ...state,
      selectedConfiguration: initialState.selectedConfiguration,
      selectedConfigurationId: initialState.selectedConfigurationId
    })
  ),
  on(
    AnalyticsActions.nextPage,
    (state, {perPage, page}) => ({
      ...state,
      perPage,
      page
    })
  ),
  on(
    AnalyticsActions.getGridSuccess,
    (state, {gridData}) => ({
      ...state,
      gridData,
      gridError: false,
    })
  ),
  on(
    AnalyticsActions.setCloneMode,
    (state, {isCloneMode}) => ({
      ...state,
      isCloneMode
    })
  ),
  on(
    AnalyticsActions.setIsViolationCloned,
    (state, {isViolation}) => ({
      ...state,
      isViolationCloned: isViolation
    })
  ),
  on(
    AnalyticsActions.cloneConfiguration,
    (state, {id}) => ({
      ...state,
      cloneConfigurationId: id.toString(),
      isViolationCloned: false
    })
  ),
  on(
    AnalyticsActions.setCloneId,
    (state, {cloneId}) => ({
      ...state,
      cloneConfigurationId: cloneId
    })
  ),
  on(
    AnalyticsActions.setViewModeDefaultView,
    (state, {viewModeDefaultView}) => ({
      ...state,
      viewModeDefaultView,
    })
  ),
  on(
    AnalyticsActions.getChartSuccess,
    (state, {chartData}) => ({
      ...state,
      chartData
    })
  ),
  on(
    AnalyticsActions.setGridChartDataToInitial,
    (state,) => ({
      ...state,
      gridData: initialState.gridData,
      chartData: initialState.chartData
    })
  ),
  on(
    AnalyticsActions.setGridOutputsParams,
    (state, {perPage, skip}) => ({
      ...state,
      gridPerPage: perPage ? perPage : state.gridPerPage,
      gridSkip: skip
    })
  ),
  on(
    AnalyticsActions.setConfigurationIsValid,
    (state, {isValid, msg}) => ({
      ...state,
      isConfigurationValid: isValid,
      validationErrorText: msg
    })
  ),
  on(
    AnalyticsActions.updateOrderingConfiguration,
    (state, {orderingColumn, orderingDirection}) => ({
      ...state,
      selectedConfiguration: {...state.selectedConfiguration, orderingDirection, orderingColumn},
    })
  ),
  on(
    AnalyticsActions.getGridError,
    (state) => ({
      ...state,
      gridError: true,
    })
  ),
  on(
    AnalyticsActions.selectFilterCol,
    (state) => {
      return {
        ...state,
        gridError: true,
      };
    }
  )
);

const makeUniquenessIdLookup = (dimensionSelector: LogItem[]) => {
  const uniquenessIdLookup = {};
  dimensionSelector.forEach(item => {
    uniquenessIdLookup[item.columnName] = item.uniquenessId;
  });
  return uniquenessIdLookup;
};

const makeColumnNameDisplayNameLookup = (logItems: LogItem[]) => {
  const lookup = {};
  logItems.forEach(item => {
    lookup[item.columnName] = item.displayName;
  });
  return lookup;
};

const makeColumnNameColumnTypeLookup = (logItems: LogItem[]) => {
  const lookup = {};
  logItems.forEach(item => {
    lookup[item.columnName] = item.columnType;
  });
  return lookup;
};

const sortAlphabeticalByField = (a: LogItem, b: LogItem) => {
  if (a.displayName > b.displayName) {
    return 1;
  } else if (a.displayName < b.displayName) {
    return -1;
  }
  return 0;
};


const transformLogItems = (logItems: LogItem[]): LogItem[] => {
  logItems.forEach(item => item.supportedFilterTypes = item.supportedFilterTypes.sort(sortAlphabetical));
  return logItems;
};

const sortAlphabetical = (a: string, b: string) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
};


