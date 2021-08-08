import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import * as GeneralMetadataActions from '../states/general-metadata/general-metadata.actions';
import * as MenuActions from '../states/menu/menu.actions';
import * as SharedActions from '../states/shared/shared.actions';
import { exhaustMap, share, switchMap } from 'rxjs/operators';
import { GeneralMetaData } from 'src/app/models/generalMetaData.model';

@Injectable()
export class GeneralMetadataEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
  }

  public getGeneralMetadata$ = createEffect(() => this.actions$
    .pipe(
      ofType(GeneralMetadataActions.getGeneralMetadata),
      switchMap(() =>
        this.apiService.getGeneralMetaData()
          .pipe(
            exhaustMap((generalMetadata: GeneralMetaData) => [
                SharedActions.setPrivileges({privileges: generalMetadata.privileges}),
                GeneralMetadataActions.setGeneralMetadata({generalMetadata}),
                MenuActions.setLevel1({generalMetadata})
              ])
          )
      ),
      share()
    )
  );
}
