import { DataGridData } from './data-grid-data.model';

export declare interface ChartData {
  chartType: string;
  dimension1Points: any[];
  dimension1Title: string;
  dimension1Type: string;
  dimension2Points: any[];
  dimension2Title: string;
  dimension2Type: string;
  measureTitle: string;
  measures: [][];
  title: string;
}

export declare interface ChartFullData {
  chart: ChartData;
  defaultView: string;
  grid: any;
}

export declare interface ChartDatasetItem {
  label?: string[] | string;
  data?: any[];
  fill?: boolean;
  borderColor?: string[] | string;
  backgroundColor?: string[] | string;
  hoverBackgroundColor?: string[] | string;
}

export declare interface ChartJSData {
  labels: string[];
  datasets: ChartDatasetItem[];
}

export interface WidgetsChartData {
  [widgetId: number]: ChartData;
}

export interface WidgetsDataGridData {
  [widgetId: number]: DataGridData;
}

export interface ChartDefaultViewData {
  [widgetId: number]: string;
}

export declare interface AnalyticsWidgetDataName {
  id: number;
  name: string;
}

export declare interface ViolationsWidgetDataName {
  violationType: string;
  name: string;
}

export declare interface ChartTableItem {
  label?: string;
  points?: number[];
  total?: number;
}

export declare interface ChartTypesOptions {
  name: string;
  value: string;
  icon: string;
}


