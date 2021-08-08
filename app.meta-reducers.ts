/* eslint-disable @typescript-eslint/dot-notation */
import { ActionReducer, MetaReducer } from '@ngrx/store';
import * as AnalyticsActions from '@states/analytics/analytics.actions';
import { deepEqual } from '../helpers/common.helpers';

export const globalStoreExceptionHandlerMetaReducer = (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state, action) => {
    try {
      state = reducer(state, action);
    } catch (error) {
      console.error('CRITICAL ERROR! Exception in the store module. \n', error);
    }
    return state;
  };

export const cloneConfigurationMetaReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  let isEdited = false;
  let configurationPrev: any;
  return (state, action) => {
      let newState: any;
      if (action.type === AnalyticsActions.setSelectedConfiguration.type) {
          if (configurationPrev) {
              isEdited = (!deepEqual(configurationPrev, action['configuration'])) && (state['analyticsState'].selectedConfigurationId !== 0);
          }
          configurationPrev = action['configuration'];
      }
      if (action.type === AnalyticsActions.setIsEdited.type) {
          isEdited = action['isEdited'];
      }
      if (action.type === AnalyticsActions.resetSelectedConfiguration.type) {
          configurationPrev = undefined;
      }
      if (state) {
          newState = {...state, analyticsState: {...state.analyticsState, isEdited}};
      } else {
          newState = state;
      }
      return reducer(newState, action);
  };
};


export const metaReducers: MetaReducer[] = [
  globalStoreExceptionHandlerMetaReducer,
  cloneConfigurationMetaReducer
];
