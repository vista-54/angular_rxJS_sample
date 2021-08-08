import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as HistoryItemsActions from '../states/history-items/history-items.actions';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import * as MenuActions from '../states/menu/menu.actions';
import { AppState } from '../app.state';
import { WorkflowService } from '../../pages/identity-automation/pages/workflow/workflow.service';
import { ItemsType } from '@models/workflow.model';
import {
  IdentityService,
} from '../../pages/identity-automation/pages/identity/shared/services/identity.service';
import { SortParams } from '../../pages/identity-automation/pages/integration/models/integration.model';
import { PaginationParams } from 'src/app/models/pagination.model';

@Injectable()
export class HistoryItemsEffect {

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private workflowService: WorkflowService,
    private identityService: IdentityService
  ) {
  }

  public getHistoryItems = createEffect(() => this.actions$
    .pipe(
      ofType(HistoryItemsActions.getHistoryItems),
      withLatestFrom(
        this.store$.pipe(select(state => state.workflowState)),
        this.store$.pipe(select(state => state.historyItemsState))
      ),
      switchMap(([, {selectedWorkflow}, {perPage, page, currentItemId, itemType, orderBy, orderDirection}]) =>
        this.getItems(itemType, {perPage, page}, currentItemId, {
          orderBy,
          orderingDirection: orderDirection
        })
          .pipe(
            switchMap(({totalItemsCount, entries}: { totalItemsCount: number; entries: any[] }) => {
              const menuAction = itemType === ItemsType.Identity ? MenuActions.setLevel3MyAccess() : MenuActions.setLevel3Workflows();
              return [
                menuAction,
                HistoryItemsActions.setHistoryItems({historyItems: entries}),
                HistoryItemsActions.setTotalItemsCount({totalItemsCount}),
              ];
            }),
            catchError((err) => of(SharedActions.doNothing()))
          )
      )
    )
  );

  public getItems(itemType: ItemsType, params: PaginationParams, id: number, orderingParams: SortParams) {
    if (itemType === ItemsType.Workflow) {
      return this.workflowService.getWorkflowHistory(params, id, orderingParams);
    } else {
      return this.identityService.getIdentityHistory(params, id, orderingParams);
    }
  }


}

