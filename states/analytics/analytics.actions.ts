import { createAction, props } from '@ngrx/store';
import { AnalyticsMetadata, Configuration, IdConfiguration } from '@models/analytics.model';
import { DataGridData } from '@models/data-grid-data.model';
import { DefaultView } from '@enums/analytics';
import { ChartData } from '@models/chart-data.model';


export const resetItems = createAction(
  '[ANALYTICS] Reset Items'
);

export const resetToInitialState = createAction(
  '[ANALYTICS] Reset to Initial State'
);

export const resetToInitialStateWithoutMetadata = createAction(
  '[ANALYTICS] Reset to Initial State WithoutMetadata'
);
export const resetToInitialStateWithoutCloneMode = createAction(
  '[ANALYTICS] Reset to Initial State Clone Mode '
);

export const getItems = createAction(
  '[ANALYTICS] Get Items'
);

export const setItems = createAction(
  '[ANALYTICS] Set Items',
  props<{ configurations: IdConfiguration[] }>()
);

export const setTotalItemsCount = createAction(
  '[ANALYTICS] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const search = createAction(
  '[ANALYTICS] Set Filter Query',
  props<{ query: string }>()
);

export const resetPagination = createAction(
  '[ANALYTICS] Reset Pagination'
);

export const getConfigurations = createAction(
  '[ANALYTICS] Get Configurations from server'
);

export const getConfigurationName = createAction(
  '[ANALYTICS] Get Configurations Name from server'
);

export const getConfigurationNameSuccess = createAction(
  '[ANALYTICS] Get Configurations Name from server',
  props<{ name: string }>()
);

export const getConfiguration = createAction(
  '[ANALYTICS] Get Configuration from server',
  props<{ id: number }>()
);

export const deleteConfiguration = createAction(
  '[ANALYTICS] DELETE from server',
  props<{ id: number }>()
);

export const cloneConfiguration = createAction(
  '[ANALYTICS] CLONE from server',
  props<{ id: number }>()
);


export const setIsViolationCloned = createAction(
  '[ANALYTICS] Set Violation Clone',
  props<{ isViolation: boolean }>()
);


export const cloneConfigurationSuccess = createAction(
  '[ANALYTICS] CLONE from server Success',
);

export const cloneConfigurationError = createAction(
  '[ANALYTICS] CLONE from server Error',
);


export const deleteConfigurationSuccess = createAction(
  '[ANALYTICS] DELETE from server Success',
);

export const deleteConfigurationError = createAction(
  '[ANALYTICS] DELETE from server Error',
);

export const setSelectedConfigurationId = createAction(
  '[ANALYTICS] Set Selected Configuration id',
  props<{ selectedConfigurationId: number }>()
);


export const setSelectedConfiguration = createAction(
  '[ANALYTICS] Set Configuration to store',
  props<{ configuration: Configuration }>()
);

export const setConfigurationIsValid = createAction(
  '[ANALYTICS] Set Configuration is Valid',
  props<{ isValid: boolean; msg: string }>()
);


export const setIsEdited = createAction(
  '[ANALYTICS] Set is Edited',
  props<{ isEdited: boolean }>()
);


export const resetSelectedConfiguration = createAction(
  '[ANALYTICS] Reset Configuration to store',
);

export const saveConfiguration = createAction(
  '[ANALYTICS] Save Configuration on Server',
);

export const createConfigurationSuccess = createAction(
  '[ANALYTICS] Create Configuration SUCCESS',
  props<{ id: number }>()
);

export const saveConfigurationSuccess = createAction(
  '[ANALYTICS] Save Configuration SUCCESS',
  props<{ id: number }>()
);
export const saveConfigurationError = createAction(
  '[ANALYTICS] Save Configuration ERROR',
);

export const getMetadata = createAction(
  '[ANALYTICS] Get Metadata from server'
);

export const getMetadataSuccess = createAction(
  '[ANALYTICS] Get Metadata Success',
  props<{ metadata: AnalyticsMetadata }>()
);

export const getMetadataError = createAction(
  '[ANALYTICS] Get Metadata Error',
);

export const nextPage = createAction(
  '[ANALYTICS] Next Page',
  props<{ perPage: number; page: number }>()
);

export const getGrid = createAction(
  '[ANALYTICS] Get Grid From The Server'
);

export const getGridById = createAction(
  '[ANALYTICS] Get Grid By Id From The Server',
  props<{ id: number }>()
);

export const getGridByConfiguration = createAction(
  '[ANALYTICS] Get Grid From The Server by Configuration'
);

export const setCloneMode = createAction(
  '[ANALYTICS] Set Clone Violation Mode',
  props<{ isCloneMode: boolean }>()
);

export const setCloneId = createAction(
  '[ANALYTICS] Set Clone Id',
  props<{ cloneId: string }>()
);

export const setViewModeDefaultView = createAction(
  '[ANALYTICS] Set View Mode Default View',
  props<{ viewModeDefaultView: DefaultView }>()
);


export const loadGridChartData = createAction(
  '[ANALYTICS] Load Grid Chart Data',
);

export const getGridSuccess = createAction(
  '[ANALYTICS] Get Grid From The Server SUCCESS',
  props<{ gridData: DataGridData }>()
);

export const getGridError = createAction(
  '[ANALYTICS] Get Grid From The Server ERROR'
);

export const getChartSuccess = createAction(
  '[ANALYTICS] Get Chart by Configuration ID Success',
  props<{ chartData: ChartData }>()
);

export const getChartError = createAction(
  '[ANALYTICS] Get Chart by Configuration ID Error',
);

export const setGridChartDataToInitial = createAction(
  '[ANALYTICS] Get Grid Chart to initial state',
);


export const validateConfiguration = createAction(
  '[ANALYTICS] Validate Configuration',
);


/**
 * Grid pagination
 */

export const setGridOutputsParams = createAction(
  '[ANALYTICS] Set Grid Outputs Params',
  props<{ perPage: number; skip: number }>()
);

export const updateOrderingConfiguration = createAction(
  '[ANALYTICS] Update Ordering Params in Configuration',
  props<{ orderingDirection: string; orderingColumn: string }>()
);


export const setFilterTypes = createAction(
  '[ANALYTICS] Select Filter Types',
);

export const selectFilterCol = createAction(
  '[ANALYTICS] select Filter Column',
);







