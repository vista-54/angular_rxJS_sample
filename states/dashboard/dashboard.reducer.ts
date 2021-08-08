import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from '../dashboard/dashboard.actions';
import { CustomGridsterItem } from '@const/dashboard.const';
import { AnalyticsWidgetDataName, ChartData, ChartDefaultViewData, ViolationsWidgetDataName, WidgetsChartData, WidgetsDataGridData } from '@models/chart-data.model';
import { Workflow } from 'src/app/pages/identity-automation/pages/workflow/workflow.model';
import { DashboardHistoryData } from '../../../models/dashboard-history-data.model';

export interface DashboardState {
  widgetList: CustomGridsterItem[];
  editMode: boolean;
  saveDashboardConfig: boolean;
  myApprovalsCount: number;
  barChart: ChartData;
  pieChart: ChartData;
  lineChart: ChartData;
  tableChart: ChartData;
  widgetsChartData: WidgetsChartData;
  excessLoginsChart: ChartData;
  outOfBoundLoginsChart: ChartData;
  outsideOfIpRangeChart: ChartData;
  myWorkflowsChart: { totalItemsCount: number; workflows: Workflow[] };
  myAccessHistoryChart: DashboardHistoryData[];
  analyticsWidgetDataNames: AnalyticsWidgetDataName[];
  violationsWidgetDataNames: ViolationsWidgetDataName[];
  chartDefaultView: ChartDefaultViewData;
  isLoaded: boolean;
  dataGrid: WidgetsDataGridData;
}

export const initialState: DashboardState = {
  widgetList: [],
  editMode: false,
  saveDashboardConfig: false,
  myApprovalsCount: null,
  barChart: null,
  pieChart: null,
  lineChart: null,
  tableChart: null,
  widgetsChartData: null,
  excessLoginsChart: null,
  outOfBoundLoginsChart: null,
  outsideOfIpRangeChart: null,
  myWorkflowsChart: { totalItemsCount: 0, workflows: null },
  myAccessHistoryChart: null,
  analyticsWidgetDataNames: null,
  violationsWidgetDataNames: null,
  chartDefaultView: null,
  isLoaded: false,
  dataGrid: null,
};

export const dashboardStateReducer = createReducer(
  initialState,
  on(
    DashboardActions.clearWidgetList,
    (state) => ({
      ...state,
      widgetList: initialState.widgetList,
    })
  ),
  on(
    DashboardActions.sendWidgetList,
    (state, {data}) => ({
      ...state,
      widgetList: [...data],
    })
  ),
  on(
    DashboardActions.getWidgetListSuccess,
    (state, {result}) => ({
      ...state,
      widgetList: result
    })
  ),
  on(
    DashboardActions.reloadLocalWidgetList,
    (state) => ({
      ...state,
      widgetList: [...state.widgetList],
    })
  ),
  on(
    DashboardActions.resetToInitialState,
    (state) => ({
      ...state,
      ...initialState
    })
  ),
  on(
    DashboardActions.setEditMode,
    (state, { value }) => ({
      ...state,
      editMode: value,
    })
  ),
  on(
    DashboardActions.saveDashboardConfig,
    (state, {value}) => ({
      ...state,
      saveDashboardConfig: value
    })
  ),
  on(
    DashboardActions.getMyApprovalsCountSuccess,
    (state, { result }) => ({
      ...state,
      myApprovalsCount: result
    })
  ),
  on(
    DashboardActions.getBarChartSuccess,
    (state, { result }) => ({
      ...state,
      barChart: result
    })
  ),
  on(
    DashboardActions.getPieChartSuccess,
    (state, { result }) => ({
      ...state,
      pieChart: result
    })
  ),
  on(
    DashboardActions.getLineChartSuccess,
    (state, { result }) => ({
      ...state,
      lineChart: result
    })
  ),
  on(
    DashboardActions.getChartSuccess,
    (state, { result, widgetInternalId }) => ({
        ...state,
        chartDefaultView: { ...state.chartDefaultView, [widgetInternalId]: result?.defaultView },
        widgetsChartData: { ...state.widgetsChartData, [widgetInternalId]: result?.chart },
        dataGrid: { ...state.dataGrid, [widgetInternalId]: result?.grid },
    })
  ),
  on(
    DashboardActions.getAzureLicensingChartSuccess,
    (state, { result, widgetInternalId }) => ({
        ...state,
        widgetsChartData: { ...state.widgetsChartData, [widgetInternalId]: result },
    })
  ),
  on(
    DashboardActions.getMyWorkflowsChartSuccess,
    (state, { result }) => ({
      ...state,
      myWorkflowsChart: result
    })
  ),
  on(
    DashboardActions.getMyAccessHistoryChartSuccess,
    (state, { result }) => ({
      ...state,
      myAccessHistoryChart: result
    })
  ),
  on(
    DashboardActions.resetMyAccessHistoryChart,
    (state) => ({
      ...state,
      myAccessHistoryChart: initialState.myAccessHistoryChart
    })
  ),
  on(
    DashboardActions.getAnalyticsWidgetDataNamesSuccess,
    (state, {result}) => ({
      ...state,
      analyticsWidgetDataNames: result
    })
  ),
  on(
    DashboardActions.resetAnalyticsWidgetDataNames,
    (state) => ({
      ...state,
      analyticsWidgetDataNames: initialState.analyticsWidgetDataNames
    })
  ),
  on(
    DashboardActions.getViolationsWidgetDataNamesSuccess,
    (state, {result}) => ({
      ...state,
      violationsWidgetDataNames: result
    })
  ),
  on(
    DashboardActions.resetViolationsWidgetDataNames,
    (state) => ({
      ...state,
      violationsWidgetDataNames: initialState.violationsWidgetDataNames
    })
  ),
  on(
    DashboardActions.setIsLoaded,
    (state, {value}) => ({
      ...state,
      isLoaded: value
    })
  ),
  on(
    DashboardActions.getViolationsChart,
    (state, { widgetInternalId }) => ({
      ...state,
      chartDefaultView: { ...state.chartDefaultView, [widgetInternalId]: initialState.chartDefaultView },
      widgetsChartData: { ...state.widgetsChartData, [widgetInternalId]: initialState.widgetsChartData },
    })
  ),
  on(
    DashboardActions.getAzureLicensingChart,
    (state, { widgetInternalId }) => ({
      ...state,
      widgetsChartData: { ...state.widgetsChartData, [widgetInternalId]: initialState.widgetsChartData },
    })
  ),
  on(
    DashboardActions.getAnalyticsChart,
    (state, { widgetInternalId }) => ({
      ...state,
      chartDefaultView: { ...state.chartDefaultView, [widgetInternalId]: initialState.chartDefaultView },
      widgetsChartData: { ...state.widgetsChartData, [widgetInternalId]: initialState.widgetsChartData },
    })
  ),
  on(
    DashboardActions.removeWidgetsChartData,
    (state, { widgetInternalId }) => {
      if (state.widgetsChartData && state.widgetsChartData[widgetInternalId]) {
        const newWidgetsChartData =  {...state.widgetsChartData};
        delete newWidgetsChartData[widgetInternalId];
        return {
          ...state,
          widgetsChartData: { ...newWidgetsChartData }
        };
      } else {
        return {
          ...state,
          widgetsChartData: {...state.widgetsChartData}
        };
      }
    }
  ),
);

