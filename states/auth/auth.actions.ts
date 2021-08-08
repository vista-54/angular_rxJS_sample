import { createAction, props } from '@ngrx/store';

export const logout = createAction(
  '[Auth] Logout'
);

export const setAuthLoaderState = createAction(
  '[Auth] Set Auth Loader State',
  props<{ enabled: boolean }>()
);
