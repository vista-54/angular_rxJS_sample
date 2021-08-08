import { createAction, props } from '@ngrx/store';
import { GeneralMetaData } from '../../../models/generalMetaData.model';

export const resetToInitialState = createAction(
    '[General Metadata] Reset To Initial State'
);

export const getGeneralMetadata = createAction(
    '[General Metadata] Get General Metadata'
);

export const setGeneralMetadata = createAction(
    '[General Metadata] Set General Metadata',
    props<{ generalMetadata: GeneralMetaData }>()
);


export const setGlobalLeaverRuleSignatureCompilation = createAction(
    '[General Metadata] Set Global Leaver Rule Signature Compilation',
    props<{ text: string, success: boolean }>()
);

export const setCompilationStatus = createAction(
    '[General Metadata] Set Global Leaver Rule Signature Compilation Status',
    props<{ compilation: boolean }>()
);

export const getAssignmentRuleSignature = createAction(
    '[General Metadata] Get AssignmentRuleSignature',
);




