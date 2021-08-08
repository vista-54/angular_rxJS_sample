import { WorkflowsFilter1, WorkflowsFilter2 } from 'src/app/pages/identity-automation/pages/workflow/workflow.model';
import { RequestTableParams } from './shared.model';

export declare interface WorkflowRequestParams extends RequestTableParams {
  filter1: WorkflowsFilter1;
  filter2: WorkflowsFilter2;
}

export enum ItemsType {
  'Workflow',
  'Identity'
}

export declare interface FileUploadStatusData {
  [fileName: string]: string;
}

export declare interface FileUploadProgressData {
  [fileName: string]: number;
}

export declare interface CustomFile extends File {
  id: number;
  status?: string;
}
