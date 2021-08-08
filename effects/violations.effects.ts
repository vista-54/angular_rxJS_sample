/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ViolationsActions from '@states/violations/violations.actions';
import { catchError, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as MenuActions from '@states/menu/menu.actions';
import { of } from 'rxjs';
import { AppState } from '@store/app.state';
import { ViolationsService } from '../../services/violations.service';
import * as AnalyticsActions from '@states/analytics/analytics.actions';
import * as SharedActions from '@states/shared/shared.actions';

@Injectable()
export class ViolationsEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private violationsService: ViolationsService
    ) {
    }

    public getConfigurations$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.getConfigurations),
            withLatestFrom(
                this.store$.pipe(select(state => state.violationsState)),
            ),
            switchMap(([, {page, perPage, query}]) =>
                this.violationsService.getConfigurations({page, perPage}, query)
                    .pipe(
                        switchMap(({configurations, totalItemsCount}) => [
                            ViolationsActions.setItems({configurations}),
                            ViolationsActions.setTotalItemsCount({totalItemsCount}),
                            // MenuActions.resetLevel3()
                        ]),
                        catchError(() => of(ViolationsActions.saveConfigurationError()))
                    )
            )
        )
    );

    public getConfiguration$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.getConfiguration),
            withLatestFrom(
                this.store$.pipe(select(state => state.violationsState)),
            ),
            switchMap(([, {selectedConfigurationId}]) =>
                this.violationsService.getConfiguration(selectedConfigurationId)
                    .pipe(
                        switchMap((res) => [
                            ViolationsActions.setSelectedConfiguration({configuration: res})
                        ]),
                        catchError(() => of(ViolationsActions.saveConfigurationError()))
                    )
            )
        )
    );

    public getViolationSettings$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.getViolationSettings),
            switchMap(() =>
                this.violationsService.getViolationSettings()
                    .pipe(
                        switchMap((res) => [
                            ViolationsActions.getViolationSettingsSuccess({violationSettings: res})
                        ]),
                        catchError(() => of(ViolationsActions.saveConfigurationError()))
                    )
            )
        )
    );


    public cloneConfiguration$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.cloneConfiguration),
            switchMap(({id}) =>
                this.violationsService.clone(id)
                    .pipe(
                        switchMap(res => [
                            ViolationsActions.setSelectedConfiguration({configuration: res}),
                            AnalyticsActions.setCloneMode({isCloneMode: true}),
                            AnalyticsActions.setCloneId({cloneId: id}),
                            AnalyticsActions.setIsViolationCloned({isViolation: true}),
                            AnalyticsActions.setSelectedConfigurationId({selectedConfigurationId: null}),
                            AnalyticsActions.setSelectedConfiguration({configuration: res}),
                            ViolationsActions.cloneConfigurationSuccess()
                        ]),
                        catchError(() => of(ViolationsActions.cloneConfigurationError()))
                    )
            ),
            share()
        )
    );


    public getChartById$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.getChartByViolationId),
            withLatestFrom(this.store$.pipe(select(state => state.violationsState)),),
            switchMap(([, {selectedConfigurationId}]) =>
                this.violationsService.getChartByName(selectedConfigurationId)
                    .pipe(
                        switchMap((res) => [
                            ViolationsActions.getChartByViolationIdSuccess({chartData: res})
                        ]),
                        catchError(() => of(ViolationsActions.getChartByViolationIdError()))
                    )
            )
        )
    );

    public getGridById$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.getGridByViolationId),
            withLatestFrom(this.store$.pipe(select(state => state.violationsState))),
            switchMap(([, {selectedConfigurationId, gridPerPage, gridSkip}]) =>
                this.violationsService.getGridByName(selectedConfigurationId, {perPage: gridPerPage, skip: gridSkip})
                    .pipe(
                        switchMap((res) => [
                            ViolationsActions.getGridByViolationIdSuccess({gridData: res})
                        ]),
                        catchError(() => of(ViolationsActions.getGridByViolationIdError()))
                    )
            )
        )
    );

    public saveViolationSettings$ = createEffect(() => this.actions$
        .pipe(
            ofType(ViolationsActions.saveViolationSettings),
            withLatestFrom(this.store$.pipe(select(state => state.violationsState))),
            switchMap(([, {violationSettingsForm}]) =>
                this.violationsService.saveViolationSettings(violationSettingsForm.value)
                    .pipe(
                        switchMap((res) => [
                            SharedActions.setIsSaving({isSaving: false}),
                            ViolationsActions.saveViolationSettingsSuccess()
                        ]),
                        catchError(() => [
                            ViolationsActions.saveViolationSettingsError(),
                            SharedActions.setIsSaving({isSaving: false}),
                        ])
                    )
            )
        )
    );
}
