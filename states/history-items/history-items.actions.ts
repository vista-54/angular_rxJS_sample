import { createAction, props } from '@ngrx/store';
import { ItemsType } from '@models/workflow.model';
import { Identity } from '@models/identity.model';
import { Workflow } from '../../../pages/identity-automation/pages/workflow/workflow.model';

export const resetToInitialState = createAction(
    '[History Items] Reset To Initial State'
);

export const resetItems = createAction(
    '[History Items] Reset Items'
);

export const setItemType = createAction(
    '[History Items] Set Item Type',
    props<{ itemType: ItemsType }>()
);

export const setCurrentItemID = createAction(
    '[History Items] Set Current Item Id',
    props<{ currentItemId: number }>()
);

export const setCurrentItem = createAction(
    '[History Items] Set Current Item',
    props<{ currentItem: Identity | Workflow }>()
);

export const getHistoryItems = createAction(
    '[History Items] Request History Items'
);

export const setHistoryItems = createAction(
    '[History Items] Set History Items',
    props<{ historyItems: any[] }>()
);

export const setTotalItemsCount = createAction(
    '[History Items] Set TotalItemsCount',
    props<{ totalItemsCount: number }>()
);


export const nextPage = createAction(
    '[History Items] Next Page',
    props<{ perPage; page }>()
);

export const orderByField = createAction(
    '[History Items] Order By',
    props<{ orderBy; orderDirection }>()
);
