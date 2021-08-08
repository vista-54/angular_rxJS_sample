import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DashboardActions from '../states/dashboard/dashboard.actions';
import { catchError, map, mergeMap, share, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
  }

  public getWidgetList$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getWidgetList),
      switchMap(() => this.apiService.getWidgetList()
        .pipe(
          switchMap(result => [
            DashboardActions.getWidgetListSuccess({ result }),
            DashboardActions.saveDashboardConfig({ value: false }),
            DashboardActions.setIsLoaded({ value: true }),
          ]),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

  public sendWidgetList$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.sendWidgetList),
      switchMap(action => this.apiService.sendWidgetList(action.data)
        .pipe(
          mergeMap(result => [
            DashboardActions.sendWidgetListSuccess({ result }),
            DashboardActions.saveDashboardConfig({ value: false }),
            DashboardActions.setEditMode({ value: false })
          ]),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

  public getMyApprovalsCount$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getMyApprovalsCount),
      mergeMap(() => this.apiService.getMyApprovalsCount()
        .pipe(
          map(result => DashboardActions.getMyApprovalsCountSuccess({ result })),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

  public getViolationsChart$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getViolationsChart),
      mergeMap(({ violation, widgetInternalId }) =>
        this.apiService.getChartsViolations(violation)
          .pipe(
            map(result =>
              DashboardActions.getChartSuccess({ result, widgetInternalId })
            ),
            catchError(() => of(DashboardActions.doNothing()))
          )),
      share()
    ));

  public getAzureLicensingChart$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getAzureLicensingChart),
      mergeMap(({ id, widgetInternalId }) =>
        this.apiService.getAzureLicensingChart(id)
          .pipe(
            map(result =>
              DashboardActions.getAzureLicensingChartSuccess({ result, widgetInternalId })
            ),
            catchError(() => of(DashboardActions.doNothing()))
          )),
      share()
    ));

  public getAnalyticsChart$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getAnalyticsChart),
      mergeMap(({ id, widgetInternalId }) =>
        this.apiService.getChartsAnalytics(id)
          .pipe(
            map(result =>
              DashboardActions.getChartSuccess({ result, widgetInternalId })
            ),
            catchError(() => of(DashboardActions.doNothing()))
          )),
      share()
    ));

  public getMyWorkflowsChart$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getMyWorkflowsChart),
      switchMap((action) => this.apiService.getMyWorkflowsChart(action.perPage)
        .pipe(
          map(result => DashboardActions.getMyWorkflowsChartSuccess({ result })),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

  public getMyAccessHistoryChart$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getMyAccessHistoryChart),
      mergeMap(action => this.apiService.getMyAccessHistoryChart(action.id)
        .pipe(
          map(result => DashboardActions.getMyAccessHistoryChartSuccess({ result })),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

  public getAnalyticsWidgetDataNames$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getAnalyticsWidgetDataNames),
      mergeMap(() => this.apiService.getAnalyticsWidgetDataNames()
        .pipe(
          map(result => DashboardActions.getAnalyticsWidgetDataNamesSuccess({ result })),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

  public getViolationsWidgetDataNames$ = createEffect(() => this.actions$
    .pipe(
      ofType(DashboardActions.getViolationsWidgetDataNames),
      mergeMap(() => this.apiService.getViolationsWidgetDataNames()
        .pipe(
          map(result => DashboardActions.getViolationsWidgetDataNamesSuccess({ result })),
          catchError((err) => of(DashboardActions.doNothing()))
        )),
      share()
    ));

}
