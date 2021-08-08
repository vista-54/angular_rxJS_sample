import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { AppState } from '../app.state';
import * as AccountPropertiesActions from '../states/account-properties/account-properties.actions';


@Injectable()
export class AccountPropertiesEffects {

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private store$: Store<AppState>  ) {
  }

  public getAccountProperties$ = createEffect(() => this.actions$
    .pipe(
      ofType(AccountPropertiesActions.searchByQuery),
      withLatestFrom(this.store$.pipe(select(state => state.accountPropertiesState))),
      switchMap(([{query}, {allPageItems}]) => {
          const foundItems = this.searchService.search(query, allPageItems,
            (item: any) => item + ' ' + item?.title + ' ' + item?.type);
          return of(AccountPropertiesActions.setFilteredItems({items: foundItems}));
        }
      )
    )
  );
}
