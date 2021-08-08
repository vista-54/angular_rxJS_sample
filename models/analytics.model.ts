import { ChartType, DefaultView, FilterPayloadType } from '@enums/analytics';

export declare interface IdConfiguration {
  id: number;
  analyticsConfiguration: Configuration;
}

export declare interface IdViolationConfiguration {
  violationId: string;
  violtaionConfiguration: Configuration;
}

export declare interface Configuration {
  name: string;
  description?: string;
  defaultView: DefaultView;
  chartType: ChartType;
  filters: AnalyticsFilter[];
  globalFilter: string;
  environmentTypes: string[];
  columnNames: string[];
  dimension1: string;
  dimension1Top: number;
  dimension1OrderingDirection: string;
  dimension1IncludeRest: string;
  dimension2: string;
  dimension2Top: number;
  dimension2OrderingDirection: string;
  measuringColumn: string;
  dimension2IncludeRest: string;
  aggregationType: string;
}

export declare interface AnalyticsMetadata {
  logItems: LogItem[];
  environmentTypes: string[];
  accountTypes: string[];
  accessStates: string[];
  supportedAggregations: SupportedAggregations;
  includeRestTypes: string[];
}

export declare interface LogItem {
  columnName: string;
  displayName: string;
  columnType: string;
  supportedFilterTypes: string[];
  isDimension: boolean;
  uniquenessId: string;
}

export declare interface SupportedAggregations {
  key: string[];
}

export declare interface AnalyticsFilter {
  columnName: string;
  operator: string;
  filterType: string;
  value: string | any;
}

export declare interface KeyDisplay {
  key: string;
  display: string;
}

export declare interface ViolationSettings {
  allowedNormalLogins: number;
  allowedWorkingHoursStart: string;
  allowedWorkingHoursFinish: string;
  timeZoneOffset: number;
  ipRanges: {
    from: string;
    to: string;
  }[];

}
