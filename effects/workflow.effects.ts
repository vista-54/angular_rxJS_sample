/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WorkflowActions from '../states/workflow/workflow.actions';
import * as HistoryItemsActions from '../states/history-items/history-items.actions';
import { catchError, finalize, mergeMap, share, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { merge, Observable, of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { AppState } from '../app.state';
import { WorkflowService } from '../../pages/identity-automation/pages/workflow/workflow.service';
import { Workflow } from '../../pages/identity-automation/pages/workflow/workflow.model';
import { CustomFile, FileUploadStatusData, ItemsType } from '@models/workflow.model';
import * as MenuActions from '../states/menu/menu.actions';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploaderComponent } from 'src/app/pages/identity-automation/pages/workflow/modals/files-uploader/files-uploader.component';
import { FILE_UPLOADER_POPUP, RESET_UPLOAD_POPUP } from '@const/styles.const';
import { ApiService } from 'src/app/services/api.service';
import { XhrStatus } from '@enums/xhr-status';
import { ResetUploadComponent } from 'src/app/pages/identity-automation/pages/workflow/modals/reset-upload/reset-upload.component';
import { HttpEventType } from '@angular/common/http';
import { FileStatus, UploadingStatus } from '@enums/files-uploader';
import { toastMessages } from '@const/toast.const';
import { workflowStateReducer } from '@store/states/workflow/workflow.reducer';


@Injectable()
export class WorkflowEffects {


    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private workflowService: WorkflowService,
        private dialog: MatDialog,
        private apiService: ApiService,
    ) {
    }

    public getWorkflows$ = createEffect(() => this.actions$
        .pipe(
            ofType(WorkflowActions.getWorkflows),
            withLatestFrom(this.store$.pipe(select(state => state.workflowState))),
            switchMap(([, {perPage, page, filter1, filter2, orderBy, orderDirection, query}]) =>
                this.workflowService.getAll({page, perPage}, {filter1, filter2}, {
                    orderBy,
                    orderingDirection: orderDirection
                }, query)
                    .pipe(
                        switchMap(({totalItemsCount, workflows}: { totalItemsCount: number; workflows: Workflow[] }) => [
                            WorkflowActions.setWorkflows({workflows}),
                            WorkflowActions.setTotalItemsCount({totalItemsCount}),
                            WorkflowActions.toggleLoading({isLoading: false}),
                            WorkflowActions.toggleRefresh({isRefreshing: false}),
                        ]),
                        catchError((err) => of(SharedActions.doNothing()))
                    )
            )
        )
    );

    public getSelectedWorkflows$ = createEffect(() => this.actions$
        .pipe(
            ofType(WorkflowActions.getWorkflow),
            withLatestFrom(this.store$.pipe(select(state => state.workflowState))),
            switchMap(([, {selectedWorkflowId}]) =>
                this.workflowService.getOne(selectedWorkflowId)
                    .pipe(
                        switchMap((workflow: Workflow) => [
                            WorkflowActions.setWorkflow({workflow}),
                            // SharedActions.setTitle({title: workflow.typeKey}),
                            WorkflowActions.toggleLoading({isLoading: false}),
                            WorkflowActions.toggleRefresh({isRefreshing: false}),
                            WorkflowActions.replaceTriggeredWorkflowInWorkflows({workflow}),
                            HistoryItemsActions.resetToInitialState(),
                            HistoryItemsActions.setItemType({itemType: ItemsType.Workflow}),
                            HistoryItemsActions.setCurrentItemID({currentItemId: workflow.id}),
                            HistoryItemsActions.setCurrentItem({currentItem: workflow}),

                            MenuActions.setLevel3Workflows(),
                            // MenuActions.setWorkflowTitle({selectedWorkflow: workflow})

                        ]),
                        catchError((err) => of(SharedActions.doNothing()))
                    )
            ),
            share()
        )
    );


    public doActionWorkflow$ = createEffect(() => this.actions$
        .pipe(
            ofType(WorkflowActions.actionWorkflow),
            mergeMap(({id, action}) => this.workflowService.doAction(id, action)
                .pipe(
                    switchMap((workflow: Workflow) => [
                        WorkflowActions.setWorkflow({workflow}),
                        WorkflowActions.setSelectedWorkflowId({selectedWorkflowId: workflow.id}),
                        WorkflowActions.replaceTriggeredWorkflowInWorkflows({workflow}),
                        WorkflowActions.toggleLoading({isLoading: false}),
                        WorkflowActions.toggleRefresh({isRefreshing: false}),
                    ]),
                    catchError((err) => of(SharedActions.doNothing())),
                )
            ),
            share()
        )
    );

    public openImportWindow$ = createEffect(() => this.actions$
      .pipe(
          ofType(WorkflowActions.initUpload),
          switchMap(action =>
              this.apiService.initUpload(action.id)
                  .pipe(
                      tap((res: {xhrStatus: string}) => {
                          if (res.xhrStatus !== XhrStatus.uploadingAlreadyInitialized) {
                              this.openFilesUploader(action.id);
                          } else {
                              this.dialog.open(ResetUploadComponent, {
                                backdropClass: 'select-modal',
                                panelClass: 'files-uploader-modal',
                                width: RESET_UPLOAD_POPUP.width,
                                height: RESET_UPLOAD_POPUP.height,
                                data: { id: action.id },
                                id: action.id.toString()
                            });
                          }

                      }),
                      catchError((err) => of(SharedActions.doNothing()))
                  )
          ),
          share()
      ),
      {
          dispatch: false,
          useEffectsErrorHandler: false
      }
  );

  public addFileToQueue$ = createEffect(() => this.actions$
    .pipe(
        ofType(WorkflowActions.addFileToQueue),
        withLatestFrom(
          this.store$.pipe(select(state => state.workflowState.uploadingStatus)),
        ),
        switchMap(([{file}, uploadingStatus]) => {
          if (file.size > 100000000) {
            return of(SharedActions.showMessage({error: toastMessages.fileSizeError }));
          } else {
            const resultActions = [];
            resultActions.push(WorkflowActions.setUploadStatus({status: FileStatus.pending, fileName: file.name}));

            if (uploadingStatus === UploadingStatus.idle) {
              resultActions.push(WorkflowActions.setUploadingStatus({uploadingStatus: UploadingStatus.uploading}));
              resultActions.push(WorkflowActions.uploadFile());
            }

            return resultActions;
          }
        }),
        catchError(() => of(SharedActions.doNothing())),
        share()
    )
  );

  public fileUpload$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkflowActions.uploadFile),
      withLatestFrom(
          this.store$.pipe(select(state => state.workflowState.queue)),
      ),
      mergeMap(([, queue] ) => {
        if (queue?.length > 0) {
          const file = queue[0];
          return [
            WorkflowActions.removeFirstFromQueue(),
            WorkflowActions.setUploadStatus({status: FileStatus.inProcess, fileName: file?.name}),
            WorkflowActions.processFileUploading({file})
          ];
        } else {
          return of(WorkflowActions.setUploadingStatus({uploadingStatus: UploadingStatus.idle}));
        }
      }),
      share()
    )
  );

  public processFileUploading$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkflowActions.processFileUploading),
      withLatestFrom(
        this.store$.pipe(select(state => state.workflowState.workflowIdForUploading))
      ),
      mergeMap(([{ file }, workflowIdForUploading]) =>
        this.apiService.uploadFile(workflowIdForUploading, file)
          .pipe(
            takeUntil(this.actions$.pipe(ofType(WorkflowActions.cancelFileUploading))),
            switchMap(({ type, loaded, total, body}) => {
              if (type === HttpEventType.UploadProgress) {
                  const percentDone = Math.round(100 * loaded / total);
                  return of(WorkflowActions.setUploadProgress({progress: percentDone, fileName: file?.name}));
              }
              else if (body?.xhrStatus === XhrStatus.error) {
                return of(WorkflowActions.setUploadStatus({status: FileStatus.failed, fileName: file?.name}));
              } else if (type === HttpEventType.Response) {
                return of(WorkflowActions.setUploadStatus({status: FileStatus.uploaded, fileName: file?.name,}));
              } else {
                return of(SharedActions.doNothing());
              }
            }),
            catchError(() => of(WorkflowActions.setUploadStatus({status: FileStatus.failed, fileName: file?.name}))),
            finalize(() => {
              // return of the action does not work
              this.store$.dispatch(WorkflowActions.uploadFile());
            })
          )
      ),
      share()
    )
  );


  public submitUpload$ = createEffect(() => this.actions$
      .pipe(
          ofType(WorkflowActions.submitUpload),
          switchMap(action =>
              this.apiService.submitUpload(action.id, Object.values(action.fileList).map(item => item.name))
                  .pipe(
                      tap((res: {xhrStatus: string}) => {
                        if (res.xhrStatus === XhrStatus.ok) {
                          const dialogRef = this.dialog.getDialogById(`uploader-modal-${action.id}`);
                          dialogRef.close();
                        }

                      }),
                      catchError((err) => of(SharedActions.doNothing()))
                  )
          ),
          share()
      ),
      {
          dispatch: false,
          useEffectsErrorHandler: false
      }
  );

  public resetUpload$ = createEffect(() => this.actions$
      .pipe(
          ofType(WorkflowActions.resetUpload),
          switchMap(action =>
              this.apiService.resetUpload(action.id)
                  .pipe(
                      tap((res) => {
                        if (res.xhrStatus === XhrStatus.ok) {
                          const dialogRef = this.dialog.getDialogById(action.id.toString());
                          dialogRef.close();
                          this.openFilesUploader(action.id);
                        }
                      }),
                      catchError((err) => of(SharedActions.doNothing()))
                  )
          ),
          share()
      ),
      {
          dispatch: false,
          useEffectsErrorHandler: false
      }
  );

  public removeFileFromServer$ = createEffect(() => this.actions$
      .pipe(
          ofType(WorkflowActions.removeFileFromServer),
          mergeMap(action =>
              this.apiService.removeFileFromServer(action.id, action.fileName)
                  .pipe(
                      tap((res: {xhrStatus: string}) => {
                        if (res.xhrStatus === XhrStatus.ok) {
                          this.store$.dispatch(WorkflowActions.removeFileFromList({fileName: action.fileName}));
                        }
                      }),
                      catchError((err) => of(SharedActions.doNothing()))
                  )
          ),
          share()
      ),
      {
          dispatch: false,
          useEffectsErrorHandler: false
      }
  );

  private openFilesUploader(id: number): void {
      this.dialog.open(FilesUploaderComponent, {
          backdropClass: 'select-modal',
          panelClass: 'files-uploader-modal',
          width: FILE_UPLOADER_POPUP.width,
          height: FILE_UPLOADER_POPUP.height,
          data: { id },
          id: `uploader-modal-${id}`
      });
  }

}


