import { DataGridDisplayType } from '@enums/data-grid-display-type';
import { OrderingDirection } from '@enums/ordering-direction';

export enum DataType {
  Text = 'text',
  Numeric = 'numeric',
  Boolean = 'boolean',
  Date = 'date',
}

export declare interface DataGridData {
  title: string;
  columns: DataGridHeader[];
  rows: any[];
  totalRecords: number;
}

export declare interface DataGridHeader {
  field: string | any;
  header: string;
  dataType: DataType;
  displayType: DataGridDisplayType;
  sortable?: boolean;
}

export declare interface DataGridOutput {
  skip: number;
  perPage: number;
  orderingColumn: string;
  orderingDirection: OrderingDirection;
}
