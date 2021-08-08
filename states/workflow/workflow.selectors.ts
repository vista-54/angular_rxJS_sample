import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { WorkflowState } from './workflow.reducer';
import { setCanApplyUpload } from './workflow.actions';
import { FileStatus } from '@enums/files-uploader';
import { FileUploadStatusData } from '@store/models/workflow.model';

export const selectWorkflow = (state: AppState) => state.workflowState;

export const selectWorkflows = createSelector(selectWorkflow, ({workflows}: WorkflowState) => workflows);
export const selectTotalItemsCount = createSelector(selectWorkflow, ({totalItemsCount}: WorkflowState) => totalItemsCount);
export const selectPage = createSelector(selectWorkflow, ({page}: WorkflowState) => page);
export const selectPerPage = createSelector(selectWorkflow, ({perPage}: WorkflowState) => perPage);
export const selectSelectedWorkflow = createSelector(selectWorkflow, ({selectedWorkflow}: WorkflowState) => selectedWorkflow);
export const selectIsRefreshing = createSelector(selectWorkflow, ({isRefreshing}: WorkflowState) => isRefreshing);
export const selectIsLoading = createSelector(selectWorkflow, ({isLoading}: WorkflowState) => isLoading);
export const selectFilter1 = createSelector(selectWorkflow, ({filter1}: WorkflowState) => filter1);
export const selectFilter2 = createSelector(selectWorkflow, ({filter2}: WorkflowState) => filter2);
export const selectSelectedWorkflowId = createSelector(selectWorkflow, ({selectedWorkflowId}: WorkflowState) => selectedWorkflowId);
export const selectFileUploadStatus = createSelector(
  selectWorkflow,
  ({fileUploadStatus}: WorkflowState, fileName: string)  => fileUploadStatus ? fileUploadStatus[fileName] : null
);
export const selectFileUploadProgress = createSelector(
  selectWorkflow,
  ({fileUploadProgress}: WorkflowState, fileName: string)  => fileUploadProgress ? fileUploadProgress[fileName] : null
);
export const selectLastUploadedFileIndex = createSelector(selectWorkflow, ({lastUploadedFileIndex}: WorkflowState) => lastUploadedFileIndex);
export const selectFileList = createSelector(selectWorkflow, ({fileList}: WorkflowState) => fileList);

export const selectFileUploadStatuses = (state: AppState) => state.workflowState.fileUploadStatus;
export const selectCanApplyUpload = createSelector(selectFileUploadStatuses,
  (fileUploadStatuses: FileUploadStatusData) =>
  {
    if (fileUploadStatuses && Object.keys(fileUploadStatuses).every(key => fileUploadStatuses[key] === FileStatus.uploaded)) {
      return true;
    } else {
      return false;
    }
  }
);
