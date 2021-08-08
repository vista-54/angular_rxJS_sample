import { createAction, props } from '@ngrx/store';
import { Configuration, IdViolationConfiguration, ViolationSettings } from '@models/analytics.model';
import { ChartData } from '@models/chart-data.model';
import { DataGridData } from '@models/data-grid-data.model';
import { FormArrayState } from 'ngrx-forms';

export const resetItems = createAction(
    '[VIOLATIONS] Reset Items'
);

export const getItems = createAction(
    '[VIOLATIONS] Get Items'
);

export const setItems = createAction(
    '[VIOLATIONS] Set Items',
    props<{ configurations: IdViolationConfiguration[] }>()
);

export const setTotalItemsCount = createAction(
    '[VIOLATIONS] Set Total Items Count',
    props<{ totalItemsCount: number }>()
);

export const search = createAction(
    '[VIOLATIONS] Set Filter Query',
    props<{ query: string }>()
);

export const resetPagination = createAction(
    '[VIOLATIONS] Reset Pagination'
);

export const getConfigurations = createAction(
    '[VIOLATIONS] Get Configurations from server'
);

export const getConfigurationName = createAction(
    '[VIOLATIONS] Get Configurations Name from server'
);

export const getConfigurationNameSuccess = createAction(
    '[VIOLATIONS] Get Configurations Name from server',
    props<{ name: string }>()
);

export const getConfiguration = createAction(
    '[VIOLATIONS] Get Configuration from server',
);

export const deleteConfiguration = createAction(
    '[VIOLATIONS] DELETE from server',
    props<{ id: number }>()
);

export const cloneConfiguration = createAction(
    '[VIOLATIONS] CLONE from server',
    props<{ id: string }>()
);

export const cloneConfigurationSuccess = createAction(
    '[VIOLATIONS] CLONE from server Success',
);

export const cloneConfigurationError = createAction(
    '[VIOLATIONS] CLONE from server Error',
);


export const deleteConfigurationSuccess = createAction(
    '[VIOLATIONS] DELETE from server Success',
);

export const deleteConfigurationError = createAction(
    '[VIOLATIONS] DELETE from server Error',
);

export const setSelectedConfigurationId = createAction(
    '[VIOLATIONS] Set Selected Configuration id',
    props<{ selectedConfigurationId: string }>()
);


export const setSelectedConfiguration = createAction(
    '[VIOLATIONS] Set Configuration to store',
    props<{ configuration: Configuration }>()
);

export const resetSelectedConfiguration = createAction(
    '[VIOLATIONS] Reset Configuration to store',
);

export const saveConfiguration = createAction(
    '[VIOLATIONS] Save Configuration on Server',
);

export const createConfigurationSuccess = createAction(
    '[VIOLATIONS] Create Configuration SUCCESS',
    props<{ id: number }>()
);

export const saveConfigurationSuccess = createAction(
    '[VIOLATIONS] Save Configuration SUCCESS',
);
export const saveConfigurationError = createAction(
    '[VIOLATIONS] Save Configuration ERROR',
);

export const getMetadata = createAction(
    '[VIOLATIONS] Get Metadata from server'
);

export const getMetadataSuccess = createAction(
    '[VIOLATIONS] Get Metadata Success',
    props<{ metadata: any }>()
);

export const getMetadataError = createAction(
    '[VIOLATIONS] Get Metadata Error',
);

export const nextPage = createAction(
    '[VIOLATIONS] Next Page',
    props<{ perPage: number; page: number }>()
);

export const getChartByViolationId = createAction(
    '[VIOLATIONS] Get Chart By Violation Id',
);

export const getChartByViolationIdSuccess = createAction(
    '[VIOLATIONS] Get Chart By Violation Id Success',
    props<{ chartData: ChartData }>()
);

export const getChartByViolationIdError = createAction(
    '[VIOLATIONS] Get Chart By Violation Id',
);

export const getGridByViolationId = createAction(
    '[VIOLATIONS] Get Grid By Violation Id',
);

export const getGridByViolationIdSuccess = createAction(
    '[VIOLATIONS] Get Grid By Violation Id Success',
    props<{ gridData: DataGridData }>()
);

export const getGridByViolationIdError = createAction(
    '[VIOLATIONS] Get Grid By Violation Id',
);

export const resetCharGridData = createAction(
    '[VIOLATIONS] Reset Chart Grid Data',
);


export const getViolationSettings = createAction(
    '[VIOLATION SETTINGS] Get from the server',
);

export const getViolationSettingsSuccess = createAction(
    '[VIOLATIONS] Set Violation settings to store',
    props<{ violationSettings: ViolationSettings }>()
);

export const addIpRange = createAction(
    '[VIOLATIONS SETTINGS] Add Ip Range Row',
    props<{ range: { from: string, to: string } }>()
);

export const rmIpRange = createAction(
    '[VIOLATIONS SETTINGS] Remove Ip Range Row',
    props<{ index: number }>()
)


export const resetIsViolationLoaded = createAction(
    '[VIOLATIONS SETTINGS] Reset Is Violation Loaded',
);

export const saveViolationSettings = createAction(
    '[VIOLATIONS SETTINGS] Save on the server',
);

export const saveViolationSettingsSuccess = createAction(
    '[VIOLATIONS SETTINGS] Save on the server Success',
);

export const saveViolationSettingsError = createAction(
    '[VIOLATIONS SETTINGS] Save on the server Error',
);

export const getViolationSettingsError = createAction(
    '[VIOLATIONS] Set Violation Error'
);

/**
 * Grid pagination
 */

export const setGridOutputsParams = createAction(
    '[VIOLATIONS] Set Grid Outputs Params',
    props<{ perPage: number; skip: number }>()
);
