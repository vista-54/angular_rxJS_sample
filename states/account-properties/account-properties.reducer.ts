import { Action, createReducer, on } from '@ngrx/store';
import * as AccountPropertiesActions from '../account-properties/account-properties.actions';

export declare interface Pagination {
  totalItemsCount: number;
  perPage: number;
  page: number;
}

export interface AccountPropertiesState {
  paginatedItems: any[];
  allPageItems: any[];
  totalItemsCount: number;
  perPage: number;
  page: number;
  accountProperties: any[];
  additionalPropertyObjectProperties: any[];
  entitlementProperties: any[];
  orderBy: string;
  orderDirection: string;
  selectedTabIndex: number;
}

export const initialState: AccountPropertiesState = {
  paginatedItems: [],
  allPageItems: [],
  totalItemsCount: 0,
  perPage: 10,
  page: 0,
  accountProperties: [],
  additionalPropertyObjectProperties: [],
  entitlementProperties: [],
  orderBy: '',
  orderDirection: '',
  selectedTabIndex: 0
};

export const accountPropertyStateReducer = createReducer(
  initialState,
  on(
    AccountPropertiesActions.setInitialState,
    (state) => ({
      ...state,
      paginatedItems: initialState.paginatedItems,
      perPage: initialState.perPage,
      page: initialState.page,
      orderBy: initialState.orderBy,
      orderDirection: initialState.orderDirection
    })
  ),
  on(
    AccountPropertiesActions.setItemsOptions,
    (state, {accountProperties, additionalPropertyObjectProperties, entitlementProperties}) => {
      const _accountProperties = transformProperties(accountProperties);
      const _entitlementProperties = fillParentPropArr(entitlementProperties);
      const _additionalPropertyObjectProperties = fillParentPropArr(additionalPropertyObjectProperties);
      return {
        ...state,
        accountProperties: _accountProperties,
        additionalPropertyObjectProperties: _additionalPropertyObjectProperties,
        entitlementProperties: _entitlementProperties,
        totalItemsCount: transformProperties(accountProperties).length,
      };

    }
  ),
  on(
    AccountPropertiesActions.paginationInit,
    (state, {tabIndex}) => {
      const _initialArray = getInitialArray(state, tabIndex);
      return {
        ...state,
        allPageItems: _initialArray,
        totalItemsCount: _initialArray.length,
        paginatedItems: paginate(_initialArray, state.page, state.perPage),
        selectedTabIndex: tabIndex
      };
    }
  ),
  on(
    AccountPropertiesActions.nextPage,
    (state, {page, perPage}) => ({
        ...state,
        page,
        perPage,
        paginatedItems: paginate(state.allPageItems, page, perPage)
      })
  ),
  on(
    AccountPropertiesActions.orderByField,
    (state, {orderBy, orderDirection}) => {
      const sortedArr = [...sortByField(state.allPageItems, orderBy, orderDirection)];
      return {
        ...state,
        orderBy,
        orderDirection,
        allPageItems: sortedArr,
        paginatedItems: paginate(sortedArr, state.page, state.perPage)
      };
    }
  ),
  on(
    AccountPropertiesActions.setFilteredItems,
    (state, {items}) => {
      const sortedArr = [...sortByField(items, state.orderBy, state.orderDirection)];
      return {
        ...state,
        totalItemsCount: sortedArr.length,
        paginatedItems: paginate(sortedArr, 0, state.perPage)
      };
    }
  ),
);

function transformProperties(props: {}, onCreationCheck?: boolean): any[] {
  const result = [];
  for (const i in props) {
    const tmpObject = props[i];
    if (onCreationCheck) {
      if (this.onCreateValue(tmpObject.attributes) !== 'Not Supported') {
        result.push(tmpObject);
      }
    } else {
      result.push(tmpObject);
    }
  }
  return result;
}

function paginate(array, index, size) {
  // transform values
  size = parseInt(size);
  size = size < 1 ? 1 : size;

  // filter
  return [...(array.filter((value, n) => (n >= (index * size)) && (n < ((index + 1) * size))))];
}

function sortByField(arr: any[], property, direction) {
  const sortOrder = direction === 'asc' ? 1 : -1;
  const arrayForSort = [...arr];
  return arrayForSort.sort((a, b) => {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  });
}

function fillParentPropArr(propsArray) {
  if (!propsArray) {
    return [];
  }
  const result = [];
  Object.keys(propsArray).map(key => {
    const type = {
      title: key,
      data: transformProperties(propsArray[key])
    };
    result.push(type);
  });
  return result;
}

function getInitialArray(state, tabIndex) {
  let _initialArray = [];
  let insideIndex = 0;
  if (tabIndex === 0) {
    _initialArray = state.accountProperties;
  } else if (tabIndex > 0 && tabIndex <= state.entitlementProperties?.length) {
    insideIndex = tabIndex - 1;
    _initialArray = state.entitlementProperties[insideIndex].data;
  } else if (tabIndex > (state.entitlementProperties?.length + 1)) {
    insideIndex = tabIndex - 1 - state.entitlementProperties?.length;
    _initialArray = state.additionalPropertyObjectProperties[insideIndex]?.data;
  }
  return _initialArray;
}

