import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.authState;

export const selectAuthLoaderEnabled = createSelector(selectAuth, ({ authLoaderEnabled }: AuthState) => authLoaderEnabled);
