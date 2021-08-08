import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import * as AnalyticsActions from '@states/analytics/analytics.actions';
import * as MenuActions from '@states/menu/menu.actions';
import { catchError, debounceTime, map, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsService } from '../../services/analytics.service';
import { Observable, of, throwError } from 'rxjs';
import { Configuration } from '@models/analytics.model';
import * as SharedActions from '@states/shared/shared.actions';
import { ConfigurationIdStatus, DefaultView } from '@enums/analytics';
import { standardDebounceTimeInterval } from '@const/api.const';

@Injectable()
export class AnalyticsEffects {


  public getConfigurations$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.getConfigurations),
      withLatestFrom(
        this.store$.pipe(select(state => state.analyticsState)),
      ),
      switchMap(([, {page, perPage, query}]) =>
        this.analyticService.getConfigurations({page, perPage}, query)
          .pipe(
            switchMap(({configurations, totalItemsCount}) => [
              AnalyticsActions.setItems({configurations}),
              AnalyticsActions.setTotalItemsCount({totalItemsCount}),
              // MenuActions.resetLevel3()
            ]),
            catchError(() => of(AnalyticsActions.saveConfigurationError()))
          )
      )
    )
  );

  public getConfigurationName$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.getConfigurationName),
      switchMap(() =>
        this.analyticService.getConfigurationName()
          .pipe(
            switchMap(res => [
              AnalyticsActions.setSelectedConfiguration({configuration: res}),
            ]),
            catchError(() => of(AnalyticsActions.saveConfigurationError()))
          )
      )
    )
  );

  public getConfiguration$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.getConfiguration),
      switchMap(({id}) =>
        this.analyticService.getConfiguration(id)
          .pipe(
            switchMap(res => [
              AnalyticsActions.setSelectedConfiguration({configuration: res}),
            ]),
            catchError(() => of(AnalyticsActions.saveConfigurationError()))
          )
      )
    )
  );

  public saveConfiguration$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.saveConfiguration),
      withLatestFrom(
        this.store$.pipe(select(state => state.analyticsState)),
      ),
      switchMap(([, {selectedConfiguration, selectedConfigurationId, isConfigurationValid, validationErrorText}]) => this.saveConfiguration(selectedConfigurationId, selectedConfiguration, isConfigurationValid, validationErrorText)
        .pipe(
          switchMap(res => [
            AnalyticsActions.setIsEdited({isEdited: false}),
            SharedActions.setIsSaving({isSaving: false}),
            AnalyticsActions.saveConfigurationSuccess({id: res.id})
          ]),
          catchError((err) => [
            SharedActions.setIsSaving({isSaving: false}),
            SharedActions.showMessage({error: err}),
            AnalyticsActions.saveConfigurationError(),

          ])
        )
      ),
      share()
    )
  );

  public deleteConfiguration$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.deleteConfiguration),
      switchMap(({id}) =>
        this.analyticService.deleteConfiguration(id)
          .pipe(
            switchMap(res => [
              AnalyticsActions.deleteConfigurationSuccess(),
              AnalyticsActions.getConfigurations()
            ]),
            catchError(() => of(AnalyticsActions.deleteConfigurationError()))
          )
      )
    )
  );

  public cloneConfiguration$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.cloneConfiguration),
      switchMap(({id}) =>
        this.analyticService.clone(id)
          .pipe(
            switchMap(res => [
              AnalyticsActions.setSelectedConfiguration({configuration: res}),
              AnalyticsActions.setCloneMode({isCloneMode: true}),
            ]),
            catchError(() => of(AnalyticsActions.cloneConfigurationError()))
          )
      ),
      share()
    ),
  );

  public getMetadata$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.getMetadata),
      switchMap(() =>
        this.analyticService.getMetadata()
          .pipe(
            map(res => AnalyticsActions.getMetadataSuccess({metadata: res})),
            catchError(() => of(AnalyticsActions.getMetadataError()))
          )
      )
    )
  );


  public loadGridChart$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.setViewModeDefaultView, AnalyticsActions.loadGridChartData),
      withLatestFrom(this.store$.pipe(select(state => state.analyticsState))),
      debounceTime(standardDebounceTimeInterval),
      switchMap(([, {selectedConfiguration, selectedConfigurationId, viewModeDefaultView, isEdited, isConfigurationValid, validationErrorText, gridSkip, gridPerPage}]) =>
        this.loadGridChart(selectedConfigurationId, selectedConfiguration, viewModeDefaultView, isEdited, isConfigurationValid, validationErrorText, gridSkip, gridPerPage)
          .pipe(
            map(res => {
              if (viewModeDefaultView === DefaultView.Chart) {
                return AnalyticsActions.getChartSuccess({chartData: res});
              } else if (viewModeDefaultView === DefaultView.Grid) {
                return AnalyticsActions.getGridSuccess({gridData: res});
              }
            }),
            catchError((err) => {
              if (viewModeDefaultView === DefaultView.Chart) {
                return of(AnalyticsActions.getChartError());
              } else if (viewModeDefaultView === DefaultView.Grid) {
                return of(AnalyticsActions.getGridError());
              }
            })
          )
      )
    )
  );


  public validateAnalytic$ = createEffect(() => this.actions$
    .pipe(
      ofType(AnalyticsActions.validateConfiguration),
      withLatestFrom(this.store$.pipe(select(state => state.analyticsState))),
      switchMap(([, {selectedConfiguration, uniquenessIdLookup, columnNameDisplayNameLookup}]) =>
        this.validate(selectedConfiguration, uniquenessIdLookup, columnNameDisplayNameLookup)
      )
    )
  );


  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private analyticService: AnalyticsService
  ) {
  }

  private saveConfiguration(id: number, configuration: Configuration, isConfigurationValid: boolean, msg: string): Observable<any> {
    if (isConfigurationValid) {
      if (id && id !== ConfigurationIdStatus.new) {
        return this.analyticService.saveConfiguration(configuration, id);
      } else {
        return this.analyticService.createConfiguration(configuration);
      }
    }
    return throwError(msg);

  }

  private loadGridChart(id: number, configuration: Configuration, viewModeDefaultView: DefaultView, isEdited: boolean, isConfigurationValid: boolean, validationErrorText: string, gridSkip: number, gridPerPage: number):Observable<any> {
    if (isConfigurationValid) {

      if (viewModeDefaultView === DefaultView.Grid) {
        if (id !== ConfigurationIdStatus.new && id) {
          if (isEdited) {
            return this.analyticService.gridByConfiguration(configuration, {
              perPage: gridPerPage,
              skip: gridSkip
            });
          } else {
            return this.analyticService.gridById(id, {perPage: gridPerPage, skip: gridSkip});
          }
        } else {
          return this.analyticService.gridByConfiguration(configuration, {
            perPage: gridPerPage,
            skip: gridSkip
          });
        }

      } else if (viewModeDefaultView === DefaultView.Chart) {
        if (id !== ConfigurationIdStatus.new && id) {
          if (isEdited) {
            return this.analyticService.chartByConfiguration(configuration);
          } else {
            return this.analyticService.chartById(id);
          }
        } else {
          return this.analyticService.chartByConfiguration(configuration);
        }
      }
    } else {
      return throwError(validationErrorText);
    }
  }

  private validate(configuration: Configuration, uniquenessIdLookup: any, columnNameDisplayNameLookup: any):Observable<any> {
    let isValid = true;
    let msg = '';
    if (!this.analyticService.includeRestValidation(configuration)) {
      msg = 'Follow Sorting supports only ordering by measure.';
      isValid = false;
    } else if (this.analyticService.dimensionValidationIsEqual(configuration) || this.analyticService.dimensionValidationIsEqualMeasure(configuration, uniquenessIdLookup)) {
      msg = `${columnNameDisplayNameLookup[configuration.dimension1]} cannot be chosen as multiple dimensions or measure column.`;
      isValid = false;
    } else if (!this.analyticService.dimensionValidation(configuration, uniquenessIdLookup)) {
      msg = `Aggregation by ${columnNameDisplayNameLookup[configuration.dimension1]} and ${columnNameDisplayNameLookup[configuration.dimension2]} cannot be done together.`;
      isValid = false;
    } else if (!this.analyticService.isDimension2AndLimitSelected(configuration)) {
      msg = `Dimension 2 is not selected`;
      isValid = false;
    } else if (!this.analyticService.limitsValidation(configuration)) {
      msg = `The limit should be between 0 and 50.`;
      isValid = false;
    } else if (!this.analyticService.validateForAggregationType(configuration)) {
      msg = `The aggregation type is required.`;
      isValid = false;
    }
    return of(AnalyticsActions.setConfigurationIsValid({isValid, msg}));

  }

}
