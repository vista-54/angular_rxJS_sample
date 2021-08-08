/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IntegrationsAction from '../states/integration/integration.actions';
import * as EntitlementAction from '../states/entitlements/entitlements.actions';
import * as MenuAction from '../states/menu/menu.actions';
import * as MenuActions from '../states/menu/menu.actions';
import { catchError, map, share, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as SharedActions from '../states/shared/shared.actions';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { AppState } from '../app.state';
import { IntegrationService } from '../../pages/identity-automation/pages/integration/services/integration.service';
import { IntegrationApiResponse, IntegrationTogglesForm } from '@models/integration.model';
import { IntegrationApiConfigResponse } from '@models/accounts.model';
import { ProductListService } from '../../pages/identity-automation/pages/integration/services/product-list.service';
import * as AccountProperties from '../states/account-properties/account-properties.actions';
import { ProductModel } from '../../pages/identity-automation/pages/integration/models/product.model';
import { XhrStatus } from '@enums/xhr-status';
import { FormGroupState, unbox, ValidationErrors } from 'ngrx-forms';
import { CsvModel } from '../../pages/identity-automation/pages/integration/models/csv.model';
import { NetworkLocation } from '@enums/integrations';
import { Settings } from '../../pages/identity-automation/pages/integration/models/settings.model';
import { IntegrationState } from '@states/integration/integration.reducer';
import { IntegrationTypes } from '@const/environment-types.const';
import { validationMsg } from '@const/validation.msg';
import { LinuxModel } from '../../pages/identity-automation/pages/integration/models/linux.model';
import { AuthType, PwdOrPK } from '../../pages/identity-automation/pages/integration/models/integration.model';
import { MssqlModel } from '../../pages/identity-automation/pages/integration/models/mssql.model';
import { PeoplesoftModel } from '../../pages/identity-automation/pages/integration/models/peoplesoft.model';

@Injectable()
export class IntegrationEffects {


  public generateLevel3Menu$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.setMenuLevel3),
      withLatestFrom(
        this.store$.pipe(select(state => state.entitlementsState)),
        this.store$.pipe(select(state => state.integrationState)),
        this.store$.pipe(select(state => state.accountPropertiesState))),
      switchMap(([, {entitlementSubTabsWithTargets, entitlementSubTabs, targetsArray},
                   {targetsLookup, additionalPropertyObjectTypes, selectedIntegration, metadata},
                   {entitlementProperties, additionalPropertyObjectProperties}]) =>
        of(MenuAction.setLevel3Integration({
          entitlementSubTabsWithTargets,
          entitlementSubTabs,
          targetsArray,
          targetsLookup,
          additionalPropertyObjects: additionalPropertyObjectTypes,
          entitlementProperties,
          additionalPropertyObjectProperties,
          metadata,
          selectedIntegration: selectedIntegration.value
        }))
      ),
      share()
    )
  );


  public getIntegrations$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.getIntegrations),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {perPage, page, orderBy, orderDirection, query}]) =>
        this.apiService.getIntegrations({page, perPage}, {
          orderBy,
          orderingDirection: orderDirection
        }, query)
          .pipe(
            switchMap(({totalItemsCount, integrationConfigs}: IntegrationApiResponse) => [
              IntegrationsAction.setIntegrations({integrations: integrationConfigs}),
              IntegrationsAction.setTotalItemsCount({totalItemsCount}),
            ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );

  public getIntegrationConfig$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.getSelectedIntegration),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([{id}, {selectedIntegration}]) =>
        this.integrationService.getIntegrationById(id)
          .pipe(
            switchMap(({integrationData, allIdentitiesAndWorkgroups, targetEntitlementTypes, additionalPropertyObjectTypes, integrationType}: IntegrationApiConfigResponse) => [
              IntegrationsAction.setMetadata({metadata: integrationData.metadata}),
              AccountProperties.setItemsOptions({
                accountProperties: integrationData.metadata.accountProperties,
                entitlementProperties: integrationData.metadata.entitlementProperties,
                additionalPropertyObjectProperties: integrationData.metadata.additionalPropertyObjectProperties
              }),
              IntegrationsAction.setSettings({settings: integrationData.settings}),
              IntegrationsAction.setAreBlackListSupported({areBlackWhiteListsSupported: integrationData.data.isBlackListSupported}),
              IntegrationsAction.setBlackListProp({isBlackWhiteListPropertiesVisible: integrationData.metadata.blackWhiteListsProperties?.length > 0}),
              IntegrationsAction.setAllIdentitiesAndWorkgroups({allIdentitiesAndWorkgroups}),
              IntegrationsAction.setTargets({targets: integrationData.data.targets}),
              IntegrationsAction.setEnvType({envType: integrationType}),
              IntegrationsAction.setAdditionalPropertyObjectTypes({additionalPropertyObjectTypes}),
              EntitlementAction.setEntitlementsSubTabs({targetEntitlementTypes}),
              IntegrationsAction.setMenuLevel3(),
              MenuActions.setLevel3Loading({loading: false}),
            ]),
            catchError((err) => of(IntegrationsAction.getSelectedIntegrationError({integrationType: selectedIntegration.value.integrationType}),
              MenuActions.setLevel3Loading({loading: false}),
            ))
          )
      ),
      share()
    )
  );

  public saveIntegrationSettings$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.saveSettings),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationId, settings}]) =>
        this.productListService.saveIntegrationSettings(selectedIntegrationId, this.preSaveSettings(settings))
          .pipe(
            map(() => SharedActions.setIsSaving({isSaving: false})),
            catchError((err) => of(SharedActions.setIsSaving({isSaving: false})))
          )
      ),
      share()
    )
  );

  public saveProductDetails$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.saveDetails),
      switchMap(({details}) =>
        this.productListService.createDetails(details)
          .pipe(
            switchMap((res: { result: ProductModel }) => [
              IntegrationsAction.setSelectedIntegration({selectedIntegration: res.result}),
              IntegrationsAction.saveDetailsSuccess({res})
            ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );


  public saveIntegration$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.saveIntegration),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, state]) =>
        this.saveIntegration(state)
          .pipe(
            switchMap((res: ProductModel) => [
              SharedActions.setIsSaving({isSaving: false}),
              IntegrationsAction.resetSelectedIntegration(),
              IntegrationsAction.setSelectedIntegration({
                selectedIntegration: res,
              }),
              IntegrationsAction.saveDetailsSuccess({res})
            ]),
            catchError((err) => of(SharedActions.doNothing(),
              SharedActions.setIsSaving({isSaving: false}),
            ))
          )
      ),
      share()
    )
  );

  /**
   * @deprecated
   */
  public updateProductDetails$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.updateDetails),
      switchMap(({details}) =>
        this.productListService.saveDetails(details)
          .pipe(
            switchMap((res: { result: ProductModel }) => [
              IntegrationsAction.setSelectedIntegration({selectedIntegration: res.result}),
              IntegrationsAction.saveDetailsSuccess({res})
            ]),
            catchError((err) => of(SharedActions.doNothing()))
          )
      ),
      share()
    )
  );


  public getSelectedIntegration$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.getSelectedIntegration),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([{id}, {integrations}]) =>
        this.integrationService.getIntegrationDetails(id)
          .pipe(
            switchMap(res => [
              IntegrationsAction.setSelectedIntegration({selectedIntegration: res}),
              MenuActions.load3LevelIntegrationMenuIfDetailsSuccess({integrationType: res.integrationType}),
              IntegrationsAction.integrationLoader({loader: false})
            ])
          )
      ),
      share()
    )
  );

  public deleteIntegration = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.deleteIntegration),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationId}]) =>
        this.productListService.remove(selectedIntegrationId)
          .pipe(
            switchMap(res => [
              IntegrationsAction.deleteIntegrationSuccess(),
            ])
          )
      ),
      share()
    )
  );


  public testIntegrationConnection$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.testIntegrationConnection),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, state]) =>
        this.testConnection(this.preSaveIntegration(state), this.isTouched(state))
          .pipe(
            map((res) => IntegrationsAction.testIntegrationConnectionSuccess()),
            catchError((err) => of(IntegrationsAction.testIntegrationConnectionError()))
          )
      ),
      share()
    )
  );

  /**
   * @deprecated
   */
  public testConnectionBeforeSave$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.testConnectionBeforeSave),
      switchMap(({product, type}) => this.productListService.testConnectionBeforeSave(product)
        .pipe(
          map((res) => IntegrationsAction.connectionBeforeSaveResultSuccessfully({res})),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  /**
   * @deprecated
   */
  public testConnection$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.testConnectionSave),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationId}]) =>
        this.productListService.testConnection(selectedIntegrationId)
          .pipe(
            map((res) => IntegrationsAction.connectionSaveResultSuccessfully({res})),
            catchError((err) => of(IntegrationsAction.connectionSaveResultError()))
          )
      ),
      share()
    )
  );

  public compileLeaverRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileLeaverRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {hrSourceForm}]) => this.integrationService.leaverCompile(hrSourceForm.value.leaverRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileLeaverRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileLeaverRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  /**
   * Rest API Integration
   */
  public restApiCompileGetMetaDataRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileGetMetaDataRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiCompileGetMetaDataRule(selectedIntegrationRestApiForm.value.getMetadataRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileGetMetaDataRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileGetMetaDataRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiCompileGetIntegrationDataRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileGetIntegrationDataRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiCompileGetIntegrationDataRule(selectedIntegrationRestApiForm.value.getIntegrationDataRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileGetIntegrationDataRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileGetIntegrationDataRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiCreateAccountRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileCreateAccountRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiCreateAccountRule(selectedIntegrationRestApiForm.value.createAccountRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileCreateAccountRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileCreateAccountRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );


  public restApiDeleteAccountRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileDeleteAccountRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiDeleteAccountRule(selectedIntegrationRestApiForm.value.deleteAccountDataRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileDeleteAccountRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileDeleteAccountRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );


  public restApiLockAccountRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileLockAccountRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiLockAccountRule(selectedIntegrationRestApiForm.value.lockAccountRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileLockAccountRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileLockAccountRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiUnlockAccountRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileUnlockAccountRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiUnlockAccountRule(selectedIntegrationRestApiForm.value.unlockAccountRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileUnlockAccountRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileUnlockAccountRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiUpdateAccountCredentialRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileUpdateAccountCredentialRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiUpdateAccountCredentialRule(selectedIntegrationRestApiForm.value.updateAccountCredentialsRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileUpdateAccountCredentialRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileUpdateAccountCredentialRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );


  public restApiUpdateAccountAdditionalPropertiesRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileUpdateAccountAdditionalPropertiesRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiUpdateAccountAdditionalPropertiesRule(selectedIntegrationRestApiForm.value.updateAccountAdditionalPropertiesRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileUpdateAccountAdditionalPropertiesRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileUpdateAccountAdditionalPropertiesRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiUpdateAccountEntitlementsDeltaRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileUpdateAccountEntitlementsDeltaRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiUpdateAccountEntitlementsDeltaRule(selectedIntegrationRestApiForm.value.updateAccountEntitlementsDeltaRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileUpdateAccountEntitlementsDeltaRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileUpdateAccountEntitlementsDeltaRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiGetActiveLoginsRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileGetActiveLoginsRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiGetActiveLoginsRule(selectedIntegrationRestApiForm.value.getActiveLoginsRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileGetActiveLoginsRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileGetActiveLoginsRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiGetBlacklistedLoginAttemptsRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileGetBlacklistedLoginAttemptsRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiGetBlacklistedLoginAttemptsRule(selectedIntegrationRestApiForm.value.getBlacklistedLoginAttemptsRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileGetBlacklistedLoginAttemptsRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileGetBlacklistedLoginAttemptsRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiGetBlackListRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileGetBlackListRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiGetBlackListRule(selectedIntegrationRestApiForm.value.getBlackListRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileGetBlackListRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileGetBlackListRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public restApiSetBlackListRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileSetBlackListRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiSetBlackListRule(selectedIntegrationRestApiForm.value.getBlackListRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileSetBlackListRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileSetBlackListRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );


  public restApiGetCustomAuthHeaderRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.restApiCompileGetCustomAuthHeaderRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationRestApiForm}]) => this.integrationService.restApiGetCustomAuthHeaderRule(selectedIntegrationRestApiForm.value.getCustomAuthHeaderRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.restApiCompileGetCustomAuthHeaderRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.restApiCompileGetCustomAuthHeaderRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  /**
   * Rest Api End
   */

  /**
   * CSV INTEGRATION
   */

  public csvCompileGetMetadataMappingRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.csvCompileGetMetadataMappingRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationCsvForm}]) => this.integrationService.csvGetMetadataMappingRule(selectedIntegrationCsvForm.value.getMetadataRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.csvCompileGetMetadataMappingRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.csvCompileGetMetadataMappingRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public csvGetIntegrationDataMappingRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.csvCompileGetIntegrationDataMappingRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {selectedIntegrationCsvForm}]) => this.integrationService.csvGetIntegrationDataMappingRule(selectedIntegrationCsvForm.value.getIntegrationDataRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.csvCompileGetIntegrationDataMappingRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.csvCompileGetIntegrationDataMappingRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  /**
   * CSV INTEGRATION END
   */

  public compileCorrelationRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileCorrelationRule),
      switchMap(({ruleBody}) => this.integrationService.correlationCompile(ruleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileCorrelationRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileCorrelationRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public compileCustomizationRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileCustomizationRule),
      switchMap(({ruleBody}) => this.integrationService.customizationCompile(ruleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileCustomizationRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileCustomizationRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public compileJoinerRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileJoinerRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {hrSourceForm}]) => this.integrationService.joinerCompile(hrSourceForm.value.joinerRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileJoinerRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileJoinerRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public compileMoverRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileMoverRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {hrSourceForm}]) => this.integrationService.moverCompile(hrSourceForm.value.moverRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileMoverRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileMoverRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public compileReinstatementRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileReinstatementRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {hrSourceForm}]) => this.integrationService.reinstatementCompile(hrSourceForm.value.reinstatementRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileReinstatementRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileReinstatementRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public compileIdentityAttributesRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileIdentityAttributesRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {hrSourceForm}]) => this.integrationService.identityAttributesCompile(hrSourceForm.value.identityAttributesMappingRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileIdentityAttributesRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileIdentityAttributesRuleSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public compileTerminationRule$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.compileTerminationRule),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, {leaverRuleForm}]) => this.integrationService.terminationRuleCompile(leaverRuleForm.value.terminationRuleBody)
        .pipe(
          map((res) => {
            if (res.xhrStatus === XhrStatus.compilationError) {
              return IntegrationsAction.compileTerminationRuleError({message: res.supportedErrorMessage});
            }
            return IntegrationsAction.compileTerminationSuccess();
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  public validateIntegration$ = createEffect(() => this.actions$
    .pipe(
      ofType(IntegrationsAction.validateIntegration),
      withLatestFrom(this.store$.pipe(select(state => state.integrationState))),
      switchMap(([, state]) => this.validateIntegration(state)
        .pipe(
          switchMap(({invalid, messages}) => {
            if (invalid) {
              return [
                SharedActions.showMessages({messages}),
                SharedActions.setIsSaving({isSaving: false})
              ];
            } else {
              return [IntegrationsAction.saveIntegration()];
            }
          }),
          catchError((err) => of(IntegrationsAction.connectionBeforeSaveResultError()))
        )
      ),
      share()
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private searchService: SearchService,
    private integrationService: IntegrationService,
    private store$: Store<AppState>,
    private productListService: ProductListService
  ) {
  }

  private saveIntegration(state: IntegrationState): Observable<any> {
    const preSavedIntegration = this.preSaveIntegration(state);
    if (preSavedIntegration.id) {
      return this.productListService.saveDetails(preSavedIntegration);
    } else {
      return this.productListService.createDetails(preSavedIntegration);
    }
  }

  private preSaveIntegration(state: IntegrationState): any {
    const detailsCopy = {...state.selectedIntegration.value};
    if (detailsCopy.description === '') {
      detailsCopy.description = null;
    }
    return {
      ...state.selectedIntegration.value,
      description: detailsCopy.description,
      tags: unbox(state.selectedIntegration.value.tags),
      aws: state.selectedIntegration.value.integrationType === IntegrationTypes.Aws ? state.selectedIntegrationAWSForm.value : null,
      azureAd: state.selectedIntegration.value.integrationType === IntegrationTypes.AzureAd ? state.selectedIntegrationAzureAdForm.value : null,
      google: state.selectedIntegration.value.integrationType === IntegrationTypes.Google ? state.selectedIntegrationGoogleForm.value : null,
      oracle: state.selectedIntegration.value.integrationType === IntegrationTypes.Oracle ? state.selectedIntegrationOracleForm.value : null,
      mssql: state.selectedIntegration.value.integrationType === IntegrationTypes.Mssql ? this.preSaveMssql(state.selectedIntegrationMssqlForm.value, state.integrationTogglesForms.value) : null,
      peoplesoft: state.selectedIntegration.value.integrationType === IntegrationTypes.Peoplesoft ? this.preSavePeoplesoft(state.selectedIntegrationPeoplesoftForm.value, state.integrationTogglesForms.value) : null,
      linux: state.selectedIntegration.value.integrationType === IntegrationTypes.Linux ? this.preSaveLinux(state.selectedIntegrationLinuxForm.value, state.integrationTogglesForms.value) : null,
      rdp: state.selectedIntegration.value.integrationType === IntegrationTypes.Rdp ? state.selectedIntegrationRdpForm.value : null,
      csv: state.selectedIntegration.value.integrationType === IntegrationTypes.Csv ? this.preSaveCsv(state.selectedIntegrationCsvForm.value) : null,
      ebs: state.selectedIntegration.value.integrationType === IntegrationTypes.Ebs ? state.selectedIntegrationEbsForm.value : null,
      restApi: state.selectedIntegration.value.integrationType === IntegrationTypes.RestApi ? state.selectedIntegrationRestApiForm.value : null,
    };
  }

  private isTouched(state: IntegrationState): boolean {
    switch (state.selectedIntegration.value.integrationType) {
      case IntegrationTypes.AzureAd:
        return state.selectedIntegrationAzureAdForm.isTouched;
      case IntegrationTypes.Aws:
        return state.selectedIntegrationAWSForm.isTouched;
      case IntegrationTypes.RestApi:
        return state.selectedIntegrationRestApiForm.isTouched;
      case IntegrationTypes.Mssql:
        return state.selectedIntegrationMssqlForm.isTouched;
      case IntegrationTypes.Ebs:
        return state.selectedIntegrationEbsForm.isTouched;
      case IntegrationTypes.Oracle:
        return state.selectedIntegrationOracleForm.isTouched;
      case IntegrationTypes.Peoplesoft:
        return state.selectedIntegrationPeoplesoftForm.isTouched;
      case IntegrationTypes.Rdp:
        return state.selectedIntegrationRdpForm.isTouched;
      case IntegrationTypes.Linux:
        return state.selectedIntegrationLinuxForm.isTouched;
      case IntegrationTypes.Google:
        return state.selectedIntegrationGoogleForm.isTouched;
      case IntegrationTypes.Csv:
        return state.selectedIntegrationCsvForm.isTouched;
    }

  }

  private preSaveSettings(settings: Settings): Settings {
    const tmpSetting = {...settings};
    if (!tmpSetting.hrSourceSettings.hrSourceEnabled) {
      tmpSetting.hrSourceSettings = null;
    }
    return tmpSetting;
  }

  private preSaveLinux(linux: LinuxModel, toggle: IntegrationTogglesForm): LinuxModel {
    const linuxObj = {...linux};
    if (toggle.linuxPwdOrPk === PwdOrPK.pwd) {
      linuxObj.privateKey = null;
    } else {
      linuxObj.password = null;
    }
    return linuxObj;
  }

  private preSaveMssql(mssql: MssqlModel, toggle: IntegrationTogglesForm): MssqlModel {
    const mssqlObj = {...mssql};
    if (toggle.mssqlAuth === AuthType.Windows) {
      mssqlObj.user = null;
      mssqlObj.password = null;
    }
    return mssqlObj;
  }

  private preSavePeoplesoft(peoplesoftModel: PeoplesoftModel, toggle: IntegrationTogglesForm): PeoplesoftModel {
    const peoplesoftObj = {...peoplesoftModel};
    if (!toggle.peopleSoftLogoutIntegration) {
      peoplesoftObj.logoutUrl = null;
      peoplesoftObj.referers = [];
    }
    return peoplesoftObj;
  }

  private preSaveCsv(csv: CsvModel): CsvModel {
    const csvObj = {...csv};
    switch (csv.networkLocationType) {
      case NetworkLocation.ftp:
        csvObj.httpUrls = [];
        csvObj.networkShare = null;
        csvObj.serverFolder = null;
        break;
      case NetworkLocation.http:
        csvObj.ftpLocation = null;
        csvObj.networkShare = null;
        csvObj.serverFolder = null;
        break;
      case NetworkLocation.networkShare:
        csvObj.ftpLocation = null;
        csvObj.httpUrls = [];
        csvObj.serverFolder = null;
        break;
      case NetworkLocation.serverFolder:
        csvObj.ftpLocation = null;
        csvObj.httpUrls = [];
        csvObj.networkShare = null;
        break;
      case NetworkLocation.noLocation:
        csvObj.ftpLocation = null;
        csvObj.httpUrls = [];
        csvObj.networkShare = null;
        csvObj.serverFolder = null;
        break;
    }
    return csvObj;
  }

  private testConnection(integrationForm: ProductModel, isTouched: boolean): Observable<any> {
    if (integrationForm.id && !isTouched) {
      return this.productListService.testConnection(integrationForm.id);
    } else {
      return this.productListService.testConnectionBeforeSave(integrationForm);
    }
  }

  private validateIntegration(state: IntegrationState): Observable<{ invalid: boolean; messages: { error: string }[] }> {
    if (!state.selectedIntegration.isValid) {
      return of({invalid: true, messages: this.prepareErrorMsgArr(state.selectedIntegration.errors)});
    }
    switch (state.selectedIntegration.value.integrationType) {
      case IntegrationTypes.Aws:
        if (!state.selectedIntegrationAWSForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationAWSForm.errors)
          });
        }
        break;
      case IntegrationTypes.AzureAd:
        if (!state.selectedIntegrationAzureAdForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationAzureAdForm.errors)
          });
        }
        break;
      case IntegrationTypes.Google:
        if (!state.selectedIntegrationGoogleForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationGoogleForm.errors)
          });
        }
        break;
      case IntegrationTypes.Peoplesoft:
        if (!state.selectedIntegrationPeoplesoftForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationPeoplesoftForm.errors)
          });
        }
        break;
      case IntegrationTypes.Mssql:
        if (!state.selectedIntegrationMssqlForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationMssqlForm.errors)
          });
        }
        break;
      case IntegrationTypes.Oracle:
        if (!state.selectedIntegrationOracleForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationOracleForm.errors)
          });
        }
        break;
      case IntegrationTypes.Linux:
        if (!state.selectedIntegrationLinuxForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationLinuxForm.errors)
          });
        }
        break;
      case IntegrationTypes.Rdp:
        if (!state.selectedIntegrationRdpForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationRdpForm.errors)
          });
        }
        break;
      case IntegrationTypes.Csv:
        if (!state.selectedIntegrationCsvForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationCsvForm.errors)
          });
        }
        break;
      case IntegrationTypes.Ebs:
        if (!state.selectedIntegrationEbsForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationEbsForm.errors)
          });
        }
        break;
      case IntegrationTypes.RestApi:
        if (!state.selectedIntegrationRestApiForm.isValid) {
          return of({
            invalid: true,
            messages: this.prepareErrorMsgArr(state.selectedIntegrationRestApiForm.errors)
          });
        }
        break;

    }

    return of({
      invalid: false,
      messages: []
    });
  }

  private prepareErrorMsgArr(errors: ValidationErrors): { error: string }[] {
    const errArr = Object.keys(errors);
    const validationMessages = [];
    errArr.map(item => {
      validationMessages.push({error: validationMsg[item]});
    });
    return validationMessages;
  }
}
