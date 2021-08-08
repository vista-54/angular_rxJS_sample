import { Workflow } from '../../../pages/identity-automation/pages/workflow/workflow.model';
import { createReducer, on } from '@ngrx/store';
import * as WorkflowActions from '../workflow/workflow.actions';
import { WorkflowsFilter1, WorkflowsFilter2 } from '../../../pages/identity-automation/pages/workflow/workflow.model';
import { CustomFile, FileUploadProgressData, FileUploadStatusData } from '@store/models/workflow.model';
import { UploadingStatus } from '@enums/files-uploader';


export interface WorkflowState {
    workflows: Workflow[];
    selectedWorkflow: Workflow;
    perPage: number;
    page: number;
    orderBy: string;
    orderDirection: string;
    filter1: WorkflowsFilter1;
    filter2: WorkflowsFilter2;
    totalItemsCount: number;
    selectedWorkflowId: number;
    query: string;
    isRefreshing: boolean;
    isLoading: boolean;
    currentItemId: number;
    historyItems: any[];
    fileUploadStatus: FileUploadStatusData;
    fileUploadProgress: FileUploadProgressData[];
    lastUploadedFileIndex: number;
    fileList: CustomFile[];
    canApplyUpload: boolean;
    queue: CustomFile[];
    workflowIdForUploading: number;
    uploadingStatus: UploadingStatus;
}


export const initialState: WorkflowState = {
    workflows: null,
    selectedWorkflow: null,
    perPage: 25,
    page: 0,
    orderBy: null,
    orderDirection: null,
    filter1: WorkflowsFilter1.Workflows,
    filter2: WorkflowsFilter2.All,
    totalItemsCount: 0,
    selectedWorkflowId: null,
    query: null,
    isRefreshing: false,
    isLoading: false,
    currentItemId: null,
    historyItems: null,
    fileUploadStatus: null,
    fileUploadProgress: [],
    lastUploadedFileIndex: 0,
    fileList: [],
    canApplyUpload: false,
    queue: [],
    workflowIdForUploading: null,
    uploadingStatus: UploadingStatus.idle
};


export const workflowStateReducer = createReducer(
    initialState,
    on(
        WorkflowActions.resetToInitialState,
        () => ({
            ...initialState
        })
    ), on(
        WorkflowActions.resetPagination,
        (state, {}) => ({
            ...state,
            page: initialState.page,
        })
    ), on(
        WorkflowActions.resetWorkflows,
        (state, {}) => ({
            ...state,
            workflows: initialState.workflows,
        })
    ),
    on(
        WorkflowActions.setWorkflows,
        (state, {workflows}) => ({
            ...state,
            workflows
        })
    ),
    on(
        WorkflowActions.setTotalItemsCount,
        (state, {totalItemsCount}) => ({
            ...state,
            totalItemsCount
        })
    ),
    on(
        WorkflowActions.nextPage,
        (state, {perPage, page}) => ({
            ...state,
            perPage,
            page
        })
    ),
    on(
        WorkflowActions.setFilter1,
        (state, {filter1}) => ({
            ...state,
            filter1,
        })
    ),
    on(
        WorkflowActions.setFilter2,
        (state, {filter2}) => ({
            ...state,
            filter2,
        })
    ),
    on(
        WorkflowActions.orderByField,
        (state, {orderBy, orderDirection}) => ({
            ...state,
            orderBy,
            orderDirection
        })
    ),
    on(
        WorkflowActions.search,
        (state, {query}) => ({
            ...state,
            query
        })
    ),
    on(
        WorkflowActions.setWorkflow,
        (state, {workflow}) => ({
            ...state,
            selectedWorkflow: workflow
        })
    ),
    on(
        WorkflowActions.toggleRefresh,
        (state, {isRefreshing}) => ({
            ...state,
            isRefreshing
        })
    ),
    on(
        WorkflowActions.setSelectedWorkflowId,
        (state, {selectedWorkflowId}) => ({
            ...state,
            selectedWorkflowId
        })
    ),
    on(
        WorkflowActions.toggleLoading,
        (state, {isLoading}) => ({
            ...state,
            isLoading
        })
    ),
    on(
        WorkflowActions.replaceTriggeredWorkflowInWorkflows,
        (state, {workflow}) => {
            const replaced = replaceWorkflowAfterAction(workflow, state.workflows);
            let selectedWorkflow = state.selectedWorkflow;
            if (workflow.id === state.selectedWorkflow.id) {
                selectedWorkflow = workflow;
            }
            return {
                ...state,
                workflows: replaced,
                selectedWorkflow
            };
        }
    ),
    on(
      WorkflowActions.setUploadStatus,
      (state, {status, fileName}) => ({
          ...state,
          fileUploadStatus: {...state.fileUploadStatus, [fileName]: status }
        })
    ),
    on(
      WorkflowActions.setUploadProgress,
      (state, {progress, fileName}) => ({
          ...state,
          fileUploadProgress: { ...state.fileUploadProgress, [fileName]: progress },
      })
    ),
    on(
      WorkflowActions.clearUploadData,
      (state) => ({
          ...state,
          fileUploadStatus: initialState.fileUploadStatus,
          fileUploadProgress: initialState.fileUploadProgress,
          lastUploadedFileIndex: initialState.lastUploadedFileIndex,
          fileList: initialState.fileList,
          canApplyUpload: initialState.canApplyUpload,
      })
    ),
    on(
      WorkflowActions.setFileList,
      (state, {fileList}) => ({
        ...state,
        fileList: [...fileList ],
      })
    ),
    on(
      WorkflowActions.removeFileFromList,
      (state, {fileName}) => {
          const index = state.fileList.findIndex(item => item.name === fileName);
          if (state.fileList[index] && state.fileList.length === 1) {
            return {
              ...state,
              fileUploadStatus: initialState.fileUploadStatus,
              fileUploadProgress: initialState.fileUploadProgress,
              lastUploadedFileIndex: initialState.lastUploadedFileIndex,
              fileList: initialState.fileList,
              canApplyUpload: initialState.canApplyUpload,
            };
          }

          if (index !== -1) {
            const newFileList = [ ...state.fileList];
            const newFileUploadStatus = { ...state.fileUploadStatus};
            const newFileUploadProgress = { ...state.fileUploadProgress};
            newFileList.splice(index, 1);
            delete newFileUploadStatus[fileName];
            delete newFileUploadProgress[fileName];
            return {
              ...state,
              fileList: [...newFileList],
              fileUploadStatus: {...newFileUploadStatus},
              fileUploadProgress: {...newFileUploadProgress},
            };
          }
          return {...state};
      }
    ),
    on(
      WorkflowActions.setCanApplyUpload,
      (state, {canApplyUpload}) => ({
          ...state,
          canApplyUpload
      })
    ),
    on(
      WorkflowActions.setQueue,
      (state, {queue}) => ({
          ...state,
          queue
      })
    ),
    on(
      WorkflowActions.addFileToQueue,
      (state, {file}) => {
          const newQueue = [...state.queue];
          newQueue.push(file);
          return {
            ...state,
            queue: [...newQueue]
          };
      }
    ),
    on(
      WorkflowActions.removeFirstFromQueue,
      (state) => {
          const newQueue = [...state.queue];
          newQueue.shift();
          return {
            ...state,
            queue: [...newQueue]
          };
      }
    ),
    on(
      WorkflowActions.removeFileFromQueue,
      (state, {file}) => {
          const newQueue = [...state.queue];
          newQueue.splice( newQueue.findIndex(item => item.name === file.name) ,1);
          return {
            ...state,
            queue: [...newQueue]
          };
      }
    ),
    on(
      WorkflowActions.setWorkflowIdForUploading,
      (state, {workflowIdForUploading}) => ({
          ...state,
          workflowIdForUploading
      })
    ),
    on(
      WorkflowActions.setUploadingStatus,
      (state, {uploadingStatus}) => ({
          ...state,
          uploadingStatus
      })
    ),
);


const replaceWorkflowAfterAction = (workflow, workflows) => {
    let tmpWorkflows = [];
    if (workflows) {
        tmpWorkflows = [...workflows];
    }
    const index = tmpWorkflows.findIndex(item => item.id === workflow.id);
    tmpWorkflows[index] = workflow;
    return tmpWorkflows;
};
