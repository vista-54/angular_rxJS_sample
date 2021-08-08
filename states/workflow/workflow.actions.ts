import { UploadingStatus } from '@enums/files-uploader';
import { createAction, props } from '@ngrx/store';
import { CustomFile } from '@store/models/workflow.model';
import { Workflow } from '../../../pages/identity-automation/pages/workflow/workflow.model';

export const resetToInitialState = createAction(
  '[Workflows] Reset To Initial State'
);

export const resetWorkflows = createAction(
  '[Workflows] Reset To Empty Array'
);
export const resetPagination = createAction(
  '[Workflows] Reset Workflows Pagination'
);

export const getWorkflows = createAction(
  '[Workflows] Get Workflows'
);

export const setWorkflows = createAction(
  '[Workflows] Set Workflows',
  props<{ workflows: Workflow[] }>()
);

export const setSelectedWorkflowId = createAction(
  '[Workflows] Set Selected Workflow Id',
  props<{ selectedWorkflowId: number }>()
);

export const setTotalItemsCount = createAction(
  '[Workflows] Set TotalItemsCount',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Workflows] Next Page',
  props<{ perPage; page }>()
);

export const orderByField = createAction(
  '[Workflows] Order By',
  props<{ orderBy; orderDirection }>()
);

export const setFilter1 = createAction(
  '[Workflows] Set Filter1',
  props<{ filter1 }>()
);

export const setFilter2 = createAction(
  '[Workflows] Set Filter2',
  props<{ filter2 }>()
);

export const search = createAction(
  '[Workflows] Search Workflows',
  props<{ query }>()
);

export const getWorkflow = createAction(
  '[Workflows] is Selected',
);

export const setWorkflow = createAction(
  '[Workflows] set Workflow',
  props<{ workflow: Workflow }>()
);

export const toggleRefresh = createAction(
  '[Workflows] toggle Refresh',
  props<{ isRefreshing: boolean }>()
);
export const toggleLoading = createAction(
  '[Workflows] toggle Loading',
  props<{ isLoading: boolean }>()
);

export const actionWorkflow = createAction(
  '[Workflows] Do Action On Workflow',
  props<{ id: number; action: string }>()
);

export const replaceTriggeredWorkflowInWorkflows = createAction(
  '[Workflows] Replace Triggered Workflow In Workflows',
  props<{ workflow: Workflow }>()
);

export const initUpload = createAction(
  '[Workflows] Init Upload',
  props<{ id: number}>()
);

export const uploadFile = createAction(
  '[Workflows] Upload File'
);

export const processFileUploading = createAction(
  '[Workflows] Process File Uploading',
  props<{ file: CustomFile }>()
);

export const cancelFileUploading = createAction(
  '[Workflows] Cancel File Uploading'
);

export const submitUpload = createAction(
  '[Workflows] Submit Upload',
  props<{ id: number; fileList: CustomFile[] }>()
);

export const resetUpload = createAction(
  '[Workflows] Reset Upload',
  props<{ id: number }>()
);

export const setUploadStatus = createAction(
  '[Workflows] Set Upload Status',
  props<{ fileName: string; status: string }>()
);

export const setUploadProgress = createAction(
  '[Workflows] Set Upload Progress',
  props<{ fileName: string; progress: number }>()
);

export const clearUploadData = createAction(
  '[Workflows] Clear Upload Data'
);

export const setFileList = createAction(
  '[Workflows] Set File List',
  props<{ fileList: CustomFile[] }>()
);

export const removeFileFromList = createAction(
  '[Workflows] Remove File From List',
  props<{ fileName: string }>()
);

export const removeFileFromServer = createAction(
  '[Workflows] Remove File From Server',
  props<{ id: number; fileName: string }>()
);

export const setCanApplyUpload = createAction(
  '[Workflows] Set Can Apply Upload',
  props<{ canApplyUpload: boolean }>()
);

export const setQueue = createAction(
  '[Workflows] Set Queue',
  props<{ queue: CustomFile[] }>()
);

export const removeFirstFromQueue = createAction(
  '[Workflows] Remove First FromQueue'
);

export const addFileToQueue = createAction(
  '[Workflows] Add File To Queue',
  props<{ file: CustomFile }>()
);

export const removeFileFromQueue = createAction(
  '[Workflows] Remove File From Queue',
  props<{ file: CustomFile }>()
);

export const setWorkflowIdForUploading = createAction(
  '[Workflows] Set Workflow Id For Uploading',
  props<{ workflowIdForUploading: number }>()
);

export const setUploadingStatus = createAction(
  '[Workflows] Set Uploading Status',
  props<{ uploadingStatus: UploadingStatus }>()
);
