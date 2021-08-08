import { createAction, props } from '@ngrx/store';
import { AdditionalPropertyObject } from '../../models/account-attributes.model';

export const resetToInitialState = createAction(
  '[Account Attributes] Reset To Initial State'
);
export const resetItems = createAction(
  '[Account Attributes] Reset To Empty Array'
);
export const setSelectedAccountAttribute = createAction(
  '[Account Attributes] Set AdditionalPropertyObjectType ',
  props<{ additionalPropertyObjectType: string }>()
);

export const getItems = createAction(
  '[Account Attributes] Get Items From Server'
);

export const setItems = createAction(
  '[Account Attributes] Set Items',
  props<{ items: AdditionalPropertyObject[] }>()
);

export const setAdditionalPropertyObjectsIds = createAction(
  '[Account Attributes] Set Additional Property ObjectsIds',
  props<{ additionalPropertyObjectsIds: string[] }>()
);

export const setTotalItemsCount = createAction(
  '[Account Attributes] Set Total Items Count',
  props<{ totalItemsCount: number }>()
);

export const nextPage = createAction(
  '[Account Attributes] Next Page',
  props<{ perPage: number; page: number }>()
);

export const resetPagination = createAction(
  '[Account Attributes] Reset Account Attributes Pagination'
);

export const search = createAction(
  '[Account Attributes] Search Account Attributes',
  props<{ query: string }>()
);


export const orderByField = createAction(
  '[Account Attributes] Order By',
  props<{ orderBy: string; orderDirection: string }>()
);
