import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  authLoaderEnabled: boolean;
}

export const initialState: AuthState = {
  authLoaderEnabled: false,
};

export const authStateReducer = createReducer(
  initialState,
  on(
    AuthActions.setAuthLoaderState,
    (state, { enabled }) => ({
        ...state,
        authLoaderEnabled: enabled
    })
  ),
);
