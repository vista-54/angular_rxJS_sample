import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { WorkgroupService } from '../../pages/identity-automation/pages/identity/workgroup/shared/services/workgroup.service';
import * as WorkgroupActions from '../states/workgroup/workgroup.actions';
import { catchError, map, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { Workgroup, WorkgroupApiResponse, WorkgroupsApiResponse } from '@models/workgroup.model';



@Injectable()
export class WorkgroupEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private searchService: SearchService,
    private store$: Store<AppState>,
    private workgroupService: WorkgroupService
  ) {
  }

  public getWorkgroups$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkgroupActions.getWorkgroups),
      withLatestFrom(this.store$.pipe(select(state => state.workgroupState))),
      switchMap(([, {perPage, page, orderBy, orderDirection, query}]) =>
        this.workgroupService.getAll({page, perPage}, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, workgroups}: WorkgroupsApiResponse) => [
                WorkgroupActions.setWorkgroups({workgroups}),
                WorkgroupActions.setTotalItemsCount({totalItemsCount}),
                WorkgroupActions.toggleLoading({isLoading: false}),
                WorkgroupActions.toggleRefresh({isRefreshing: false})
              ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      )
    )
  );

  public getWorkgroup$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkgroupActions.getWorkgroup),
      switchMap(({id}) =>
        this.workgroupService.getWorkgroupById(id)
          .pipe(
            switchMap(({workgroup, workgroupIdentities, allIdentities}: WorkgroupApiResponse) => [
                  WorkgroupActions.toggleLoading({isLoading: false}),
                  WorkgroupActions.toggleRefresh({isRefreshing: false}),
                  WorkgroupActions.setWorkgroup({workgroup, workgroupIdentities, allIdentities}),
                ]
            ),
            catchError((err) => of(SharedActions.doNothing()))
          )
      )
      ,
      share()
    )
  );


  public getAllIdentities$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkgroupActions.getAllIdentities),
      switchMap(() =>
        this.workgroupService.getIdentities()
          .pipe(map((res) => WorkgroupActions.passAllIdentities({allIdentities: res})),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );


  public updateWorkgroupIdentity$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkgroupActions.updateWorkgroup),
      switchMap(({workgroup}) =>
        this.apiService.updateWorkgroupIdentities(workgroup)
          .pipe(
            map(() => WorkgroupActions.setIsSaving({isSaving: false})),
            catchError((err) => of(SharedActions.doNothing())))
      ),
      share()
    )
  );

  public createWorkgroupIdentity$ = createEffect(() => this.actions$
    .pipe(
      ofType(WorkgroupActions.createWorkgroup),
      switchMap(({workgroup}) =>
        this.apiService.saveWorkgroupIdentities(workgroup)
          .pipe(
            switchMap(({id}: Workgroup) => [
                WorkgroupActions.setIsSaving({isSaving: false}),
                WorkgroupActions.setIsCreateStatus({isCreate: false}),
                WorkgroupActions.createdSuccessWorkgroup({id})
              ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );
}
