import { CustomGridsterItem } from '@const/dashboard.const';
import { AnalyticsWidgetDataName, ChartData, ChartFullData, ViolationsWidgetDataName } from '@models/chart-data.model';
import { createAction, props } from '@ngrx/store';
import { Workflow } from 'src/app/pages/identity-automation/pages/workflow/workflow.model';


export const resetToInitialState = createAction(
  '[Dashboard] Reset To Initial State'
);

export const clearWidgetList = createAction(
  '[Dashboard] Clear Widget List'
);

export const sendWidgetList = createAction(
  '[Dashboard] Send Widget List',
  props<{ data: CustomGridsterItem[] }>()
);

export const sendWidgetListSuccess = createAction(
  '[Dashboard] Send Widget List Success',
  props<{ result: any }>()
);

export const getWidgetList = createAction(
  '[Dashboard] Get Widget List'
);

export const getWidgetListSuccess = createAction(
  '[Dashboard] Get Widget List Success',
  props<{ result: any }>()
);

export const reloadLocalWidgetList = createAction(
  '[Dashboard] Reload Local Widget List'
);

export const setEditMode = createAction(
  '[Dashboard] Set Edit Mode',
  props<{ value: boolean }>()
);

export const saveDashboardConfig = createAction(
  '[Dashboard] Save Dashboard Config',
  props<{ value: boolean }>()
);

export const getMyApprovalsCount = createAction(
  '[Dashboard] Get My Approvals Count'
);

export const getMyApprovalsCountSuccess = createAction(
  '[Dashboard] Get My Approvals Count Success',
  props<{ result: number }>()
);

export const getBarChart = createAction(
  '[Dashboard] Get Bar Chart'
);

export const getBarChartSuccess = createAction(
  '[Dashboard] Get Bar Chart Success',
  props<{ result: ChartData }>()
);

export const getPieChart = createAction(
  '[Dashboard] Get Pie Chart'
);

export const getPieChartSuccess = createAction(
  '[Dashboard] Get Pie Chart Success',
  props<{ result: ChartData }>()
);

export const getLineChart = createAction(
  '[Dashboard] Get Line Chart'
);

export const getLineChartSuccess = createAction(
  '[Dashboard] Get Line Chart Success',
  props<{ result: ChartData }>()
);

export const getViolationsChart = createAction(
  '[Dashboard] Get Violations Chart',
  props<{ violation: string; widgetInternalId: number }>()
);

export const getAzureLicensingChart = createAction(
  '[Dashboard] Get Azure Licensing Chart',
  props<{ id: number; widgetInternalId: number }>()
);

export const getAzureLicensingChartSuccess = createAction(
  '[Dashboard] Get Azure Licensing Chart Success',
  props<{ result: ChartData; widgetInternalId: number }>()
);

export const getAnalyticsChart = createAction(
  '[Dashboard] Get ViolAnalyticstions Chart',
  props<{ id: number; widgetInternalId: number }>()
);

export const getChartSuccess = createAction(
  '[Dashboard] Get Chart Success',
  props<{ result: ChartFullData; widgetInternalId: number }>()
);

export const getMyWorkflowsChart = createAction(
  '[Dashboard] Get MyWorkflows Chart',
  props<{ perPage: number }>()
);

export const getMyWorkflowsChartSuccess = createAction(
  '[Dashboard] Get MyWorkflows Chart Success',
  props<{ result: { totalItemsCount: number; workflows: Workflow[] } }>()
);

export const getMyAccessHistoryChart = createAction(
  '[Dashboard] Get MyAccessHistory Chart',
  props<{ id: number }>()
);

export const getMyAccessHistoryChartSuccess = createAction(
  '[Dashboard] Get MyAccessHistory Chart Success',
  props<{ result: any }>()
);

export const resetMyAccessHistoryChart = createAction(
  '[Dashboard] Reset MyAccessHistory Chart',
);

export const doNothing = createAction(
  '[Dashboard] Do Nothing'
);

export const resetAnalyticsWidgetDataNames = createAction(
  '[Dashboard] Reset Analytics Widget Data Names'
);

export const getAnalyticsWidgetDataNames = createAction(
  '[Dashboard] Get Analytics Widget Data Names'
);

export const getAnalyticsWidgetDataNamesSuccess = createAction(
  '[Dashboard] Get Analytics Widget Data Names Success',
  props<{ result: AnalyticsWidgetDataName[] }>()
);

export const resetViolationsWidgetDataNames = createAction(
  '[Dashboard] Reset Analytics Widget Data Names'
);

export const getViolationsWidgetDataNames = createAction(
  '[Dashboard] Get Violations Widget Data Names'
);

export const getViolationsWidgetDataNamesSuccess = createAction(
  '[Dashboard] Get Violations Widget Data Names Success',
  props<{ result: ViolationsWidgetDataName[] }>()
);

export const setIsLoaded = createAction(
  '[Dashboard] Set Is Loaded',
  props<{ value: boolean }>()
);

export const removeWidgetsChartData = createAction(
  '[Dashboard] Remove Widgets Chart Data',
  props<{ widgetInternalId: string | number }>()
);




