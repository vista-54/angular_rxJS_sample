import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import * as GeneralWorkflowSettingsAction from '../states/general-workflow-settings/general-workflow-settings.actions';
import * as GeneralMetaDataAction from '../states/general-metadata/general-metadata.actions';
import { catchError, share, switchMap } from 'rxjs/operators';
import { GeneralWorkflowSettingsApiResponse } from '@models/general-workflow-settings.model';
import * as SharedActions from '@states/shared/shared.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { XhrStatus } from '@enums/xhr-status';
import { toastMessages } from '@const/toast.const';

@Injectable()
export class GeneralWorkflowSettingsEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store$: Store<AppState>
    ) {
    }


    public getGeneralWorkflowSettings$ = createEffect(() => this.actions$
        .pipe(
            ofType(GeneralWorkflowSettingsAction.getGeneralWorkflowSettings),
            switchMap(() =>
                this.apiService.getGeneralWorkflowSettings()
                    .pipe(
                        switchMap(({allIdentitiesAndWorkgroups, settings}: GeneralWorkflowSettingsApiResponse) => [
                            GeneralWorkflowSettingsAction.setAllIdentitiesAndWorkgroups({allIdentitiesAndWorkgroups}),
                            GeneralWorkflowSettingsAction.setSettings({settings}),
                            GeneralWorkflowSettingsAction.setRootOwnerIdName(),
                        ])
                    )
            ),
            share()
        )
    );

    public sendGeneralWorkflowSettings$ = createEffect(() => this.actions$
        .pipe(
            ofType(GeneralWorkflowSettingsAction.sendGeneralWorkflowSettings),
            switchMap(({generalWorkflowSetting}) =>
                this.apiService.saveGeneralWorkflowSettings(generalWorkflowSetting)
                    .pipe(
                        switchMap(({allIdentitiesAndWorkgroups, settings, xhrStatus}: GeneralWorkflowSettingsApiResponse) => {
                            if (xhrStatus !== XhrStatus.error) {
                                return [
                                    SharedActions.setIsSaving({isSaving: false}),
                                    GeneralWorkflowSettingsAction.setAllIdentitiesAndWorkgroups({allIdentitiesAndWorkgroups}),
                                    GeneralWorkflowSettingsAction.setSettings({settings}),
                                    GeneralWorkflowSettingsAction.setRootOwnerIdName(),
                                ];
                            }
                            return [
                                SharedActions.setIsSaving({isSaving: false}),
                                SharedActions.doNothing()
                            ];
                        }),
                        catchError((err) => {
                            return of(SharedActions.setIsSaving({isSaving: false}));
                        })
                    )
            ),
            share()
        )
    );

    public compileLeaverRuleBody$ = createEffect(() => this.actions$
        .pipe(
            ofType(GeneralWorkflowSettingsAction.compileLeaverRuleBody),
            switchMap(({ruleBody}) =>
                this.apiService.compileLeaverRule(ruleBody)
                    .pipe(
                        switchMap((res) => {
                            if (res.xhrStatus === XhrStatus.compilationError) {
                                return [
                                    GeneralMetaDataAction.setGlobalLeaverRuleSignatureCompilation({
                                        text: res.supportedErrorMessage,
                                        success: false
                                    }),
                                    GeneralMetaDataAction.setCompilationStatus({compilation: false})
                                ];
                            }
                            return [
                                GeneralMetaDataAction.setCompilationStatus({compilation: false}),
                                GeneralMetaDataAction.setGlobalLeaverRuleSignatureCompilation({
                                    text: toastMessages.compileSuccess,
                                    success: true
                                }),
                                // SharedActions.setIsSaving({isSaving: false}),
                                // GeneralWorkflowSettingsAction.setAllIdentitiesAndWorkgroups({allIdentitiesAndWorkgroups}),
                                // GeneralWorkflowSettingsAction.setSettings({settings}),
                                // GeneralWorkflowSettingsAction.setRootOwnerIdName(),
                            ];
                        }),
                        catchError((err) => {
                            return of(SharedActions.setIsSaving({isSaving: false}));
                        })
                    )
            ),
            share()
        )
    );
}
