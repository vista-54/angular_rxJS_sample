import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';


export const selectDashboard = (state: AppState) => state.dashboardState;
export const selectWidgetList = createSelector(selectDashboard, ({widgetList}: DashboardState) => widgetList);
export const selectEditMode = createSelector(selectDashboard, ({editMode}: DashboardState) => editMode);
export const selectSaveDashboardConfig = createSelector(selectDashboard, ({saveDashboardConfig}: DashboardState) => saveDashboardConfig);
export const selectMyApprovalsCount = createSelector(selectDashboard, ({myApprovalsCount}: DashboardState) => myApprovalsCount);
export const selectBarChart = createSelector(selectDashboard, ({barChart}: DashboardState) => barChart);
export const selectPieChart = createSelector(selectDashboard, ({pieChart}: DashboardState) => pieChart);
export const selectLineChart = createSelector(selectDashboard, ({lineChart}: DashboardState) => lineChart);
export const selectTableChart = createSelector(selectDashboard, ({tableChart}: DashboardState) => tableChart);
export const selectExcessLoginsChart = createSelector(selectDashboard, ({excessLoginsChart}: DashboardState) => excessLoginsChart);
export const selectOutOfBoundLoginsChart = createSelector(selectDashboard, ({outOfBoundLoginsChart}: DashboardState) => outOfBoundLoginsChart);
export const selectOutsideOfIpRangeChart = createSelector(selectDashboard, ({outsideOfIpRangeChart}: DashboardState) => outsideOfIpRangeChart);
export const selectMyWorkflowsChart = createSelector(selectDashboard, ({myWorkflowsChart}: DashboardState) => myWorkflowsChart);
export const selectMyAccessHistoryChart = createSelector(selectDashboard, ({myAccessHistoryChart}: DashboardState) => myAccessHistoryChart);
export const selectIsLoaded = createSelector(selectDashboard, ({isLoaded}: DashboardState) => isLoaded);
export const selectChartData = createSelector(
  selectDashboard,
  ({widgetsChartData}: DashboardState, widgetId: number)  => widgetsChartData ? widgetsChartData[widgetId] : null
);
export const selectAnalyticsWidgetDataNames = createSelector(
  selectDashboard,
  ({analyticsWidgetDataNames}: DashboardState) => analyticsWidgetDataNames
);
export const selectViolationsWidgetDataNames = createSelector(
  selectDashboard,
  ({violationsWidgetDataNames}: DashboardState) => violationsWidgetDataNames
);
export const selectShartDefaultView = createSelector(
  selectDashboard,
  ({chartDefaultView}: DashboardState, widgetId: number)  => chartDefaultView ? chartDefaultView[widgetId] : null
);
export const selectDataGrid = createSelector(
  selectDashboard,
  ({dataGrid}: DashboardState, widgetId: number)  => dataGrid ? dataGrid[widgetId] : null
);

export const selectWidgetListItem = createSelector(
  selectDashboard,
  ({widgetList}: DashboardState, widgetId: number)  => widgetList.find(item => item.id === widgetId.toString())
);
