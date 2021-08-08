import { createReducer, on } from '@ngrx/store';
import * as SharedActions from './shared.actions';

export interface SharedState {
    busy: boolean;
    privileges: string[];
    expand: boolean;
    title: string;
    isSaving: boolean;
}

export const initialState: SharedState = {
    busy: false,
    privileges: [],
    expand: false,
    title: null,
    isSaving: false
};

export const sharedReducer = createReducer(
    initialState,
    on(
        SharedActions.setBusyState,
        (state, {busy}) => ({
            ...state,
            busy
        })
    ),
    on(
        SharedActions.setPrivileges,
        (state, {privileges}) => ({
            ...state,
            privileges
        })
    ),
    on(
        SharedActions.expandFullscreen,
        (state, {expand}) => ({
            ...state,
            expand
        })
    ),
    on(
        SharedActions.setTitle,
        (state, {title}) => ({
            ...state,
            title
        })
    ), on(
        SharedActions.setIsSaving,
        (state, {isSaving}) => ({
            ...state,
            isSaving
        })
    ),
    on(
        SharedActions.refreshData,
        (state,) => ({
            ...state,
            isRefreshing: true
        })
    )
);
