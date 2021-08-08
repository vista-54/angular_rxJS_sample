import { createAction, props } from '@ngrx/store';
import { AccessLogType } from '@enums/history-log.types';

export const doNothing = createAction(
  '[Shared] Do Nothing'
);

export const setBusyState = createAction(
  '[Shared] Set Busy State',
  props<{ busy: boolean }>()
);

export const showMessage = createAction(
  '[Shared] Show Message',
  props<{ success?: string; error?: string; warning?: string }>()
);

export const showMessages = createAction(
  '[Shared] Show Messages',
  props<{ messages: { success?: string; error?: string; warning?: string }[] }>()
);

export const getPrivileges = createAction(
  '[Assigment Rule] Return Privileges'
);

export const setPrivileges = createAction(
  '[Assigment Rule] Set Privileges',
  props<{
    privileges: string[];
  }>()
);

export const expandFullscreen = createAction(
  '[Full Screen] Set Expand',
  props<{
    expand: boolean;
  }>()
);

export const setTitle = createAction(
  '[Assigment Rule] Set Title',
  props<{
    title: string;
  }>()
);


export const refreshData = createAction(
  '[Shared] Refresh Data'
);

export const setIsSaving = createAction(
  '[Shared] Set Is Saving',
  props<{ isSaving: boolean }>()
);
