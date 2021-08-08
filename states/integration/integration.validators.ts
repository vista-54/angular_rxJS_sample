import { formGroupReducer, FormGroupState, setErrors, updateGroup, validate } from 'ngrx-forms';
import { pattern, required } from 'ngrx-forms/validation';
import { CsvModel } from '../../../pages/identity-automation/pages/integration/models/csv.model';
import { AuthSchemaType, NetworkLocation } from '@enums/integrations';
import { AWSModel } from '../../../pages/identity-automation/pages/integration/models/aws.model';
import { GoogleModel } from '../../../pages/identity-automation/pages/integration/models/google.model';
import { AzureAdModel } from '../../../pages/identity-automation/pages/integration/models/azureAd.model';
import { LinuxModel } from '../../../pages/identity-automation/pages/integration/models/linux.model';
import { RdpModel } from '../../../pages/identity-automation/pages/integration/models/rdp.model';
import { PeoplesoftModel } from '../../../pages/identity-automation/pages/integration/models/peoplesoft.model';
import { OracleModel } from '../../../pages/identity-automation/pages/integration/models/oracle.model';
import { EbsModel } from '../../../pages/identity-automation/pages/integration/models/ebs.model';
import { MssqlModel } from '../../../pages/identity-automation/pages/integration/models/mssql.model';
import { HrSourceSettings } from '../../../pages/identity-automation/pages/integration/models/settings.model';
import { RestApiModel } from '../../../pages/identity-automation/pages/integration/models/rest-api.model';
import { Action } from '@ngrx/store';
import { IntegrationModel } from '@models/integration.model';

const trimRegExp = new RegExp('^\\s*(\\S(.*\\S)?)\\s*$');

export const validateSelectedIntegrationForm = updateGroup<IntegrationModel>({
    description: validate(pattern(trimRegExp)),
});

export const validateSelectedIntegrationFormCsv = updateGroup<CsvModel>({
    csvHeaders: validate(required),
    csvDelimiter: validate(required, pattern(trimRegExp)),
    csvQuoter: validate(required, pattern(trimRegExp)),
    encoding: validate(required, pattern(trimRegExp)),
    getMetadataRuleBody: validate(required, pattern(trimRegExp)),
    getIntegrationDataRuleBody: validate(required, pattern(trimRegExp)),
    networkShare: (x, y) => {
        if (y.value.networkLocationType === NetworkLocation.networkShare) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    ftpLocation: (x, y) => {
        if (y.value.networkLocationType === NetworkLocation.ftp) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    serverFolder: (x, y) => {
        if (y.value.networkLocationType === NetworkLocation.serverFolder) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    }
});

export const validateSelectedIntegrationFormAws = updateGroup<AWSModel>({
    loginUrl: validate(required, pattern(trimRegExp)),
    accessKey: validate(required, pattern(trimRegExp)),
    secretAccessKey: validate(required, pattern(trimRegExp)),
});

export const validateSelectedIntegrationFormGoogle = updateGroup<GoogleModel>({
    loginUrl: validate(required, pattern(trimRegExp)),
    privateKey: validate(required, pattern(trimRegExp)),
    clientEmail: validate(required, pattern(trimRegExp)),
    domain: validate(required, pattern(trimRegExp)),
    adminEmail: validate(required, pattern(trimRegExp)),
});

export const validateSelectedIntegrationFormAzure = updateGroup<AzureAdModel>({
    loginUrl: validate(required, pattern(trimRegExp)),
    tenantId: validate(required, pattern(trimRegExp)),
    clientId: validate(required, pattern(trimRegExp)),
    clientSecret: validate(required, pattern(trimRegExp))
});

export const validateSelectedIntegrationFormLinux = updateGroup<LinuxModel>({
    user: validate(required, pattern(trimRegExp)),
    address: validate(required, pattern(trimRegExp)),
    osType: validate(required, pattern(trimRegExp)),
});

export const validateSelectedIntegrationFormRdp = updateGroup<RdpModel>({
    user: validate(required, pattern(trimRegExp)),
    password: validate(required, pattern(trimRegExp)),
    address: validate(required, pattern(trimRegExp))
});

export const validateSelectedIntegrationFormPeoplesoft = updateGroup<PeoplesoftModel>({
    user: validate(required, pattern(trimRegExp)),
    password: validate(required, pattern(trimRegExp)),
    address: validate(required, pattern(trimRegExp)),
    hostName: validate(required, pattern(trimRegExp))
});

export const validateSelectedIntegrationFormOracle = updateGroup<OracleModel>({
    user: validate(required, pattern(trimRegExp)),
    password: validate(required, pattern(trimRegExp)),
    address: validate(required, pattern(trimRegExp))
});

export const validateSelectedIntegrationFormEbs = updateGroup<EbsModel>({
    hostName: validate(required, pattern(trimRegExp)),
    user: validate(required, pattern(trimRegExp)),
    password: validate(required, pattern(trimRegExp)),
    address: validate(required, pattern(trimRegExp))
});

export const validateSelectedIntegrationFormMssql = updateGroup<MssqlModel>({
    address: validate(required, pattern(trimRegExp))
});

export const validateSelectedIntegrationFormRestApi = updateGroup<RestApiModel>({
    baseAddress: validate(required, pattern(trimRegExp)),
    user: (x, y) => {
        if (y.value.authType === AuthSchemaType.basicAuth) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    password: (x, y) => {
        if (y.value.authType === AuthSchemaType.basicAuth) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    bearerToken: (x, y) => {
        if (y.value.authType === AuthSchemaType.bearerToken) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    customHeaderName: (x, y) => {
        if (y.value.authType === AuthSchemaType.apiKey) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    customHeaderValue: (x, y) => {
        if (y.value.authType === AuthSchemaType.apiKey) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    authority: (x, y) => {
        if (y.value.authType === AuthSchemaType.oAuth2) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    clientId: (x, y) => {
        if (y.value.authType === AuthSchemaType.oAuth2) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    clientSecret: (x, y) => {
        if (y.value.authType === AuthSchemaType.oAuth2) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    scope: (x, y) => {
        if (y.value.authType === AuthSchemaType.oAuth2) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
    getCustomAuthHeaderRuleBody: (x, y) => {
        if (y.value.authType === AuthSchemaType.customAuthHeader) {
            return validate(x, required);
        } else {
            return setErrors(x, []);
        }
    },
});

export const validateHrSource = updateGroup<HrSourceSettings>({
    offboardingApprovalStrategy: validate(required),
    onboardingApprovalStrategy: validate(required),
    transferApprovalStrategy: validate(required)
});

export const validateBodyIntegration = (integration: FormGroupState<IntegrationModel>, action: Action): FormGroupState<IntegrationModel> => {
    const formGroupReducerConst = formGroupReducer(integration, action);
    return validateSelectedIntegrationForm(formGroupReducerConst);
};

export const validateAwsIntegration = (awsForm: FormGroupState<AWSModel>, action: Action): FormGroupState<AWSModel> => {
    const formGroupReducerConst = formGroupReducer(awsForm, action);
    return validateSelectedIntegrationFormAws(formGroupReducerConst);
};

export const validateAzureAdIntegration = (azureForm: FormGroupState<AzureAdModel>, action: Action): FormGroupState<AzureAdModel> => {
    const formGroupReducerConst = formGroupReducer(azureForm, action);
    return validateSelectedIntegrationFormAzure(formGroupReducerConst);
};

export const validateGoogleIntegration = (googleForm: FormGroupState<GoogleModel>, action: Action): FormGroupState<GoogleModel> => {
    const formGroupReducerConst = formGroupReducer(googleForm, action);
    return validateSelectedIntegrationFormGoogle(formGroupReducerConst);
};

export const validateOracleIntegration = (oracleForm: FormGroupState<OracleModel>, action: Action): FormGroupState<OracleModel> => {
    const formGroupReducerConst = formGroupReducer(oracleForm, action);
    return validateSelectedIntegrationFormOracle(formGroupReducerConst);
};

export const validateMssqlIntegration = (mssqlForm: FormGroupState<MssqlModel>, action: Action): FormGroupState<MssqlModel> => {
    const formGroupReducerConst = formGroupReducer(mssqlForm, action);
    return validateSelectedIntegrationFormMssql(formGroupReducerConst);
};

export const validatePeoplesoftIntegration = (peoplesoftForm: FormGroupState<PeoplesoftModel>, action: Action): FormGroupState<PeoplesoftModel> => {
    const formGroupReducerConst = formGroupReducer(peoplesoftForm, action);
    return validateSelectedIntegrationFormPeoplesoft(formGroupReducerConst);
};

export const validateLinuxIntegration = (linuxForm: FormGroupState<LinuxModel>, action: Action): FormGroupState<LinuxModel> => {
    const formGroupReducerConst = formGroupReducer(linuxForm, action);
    return validateSelectedIntegrationFormLinux(formGroupReducerConst);
};

export const validateRdpIntegration = (rdpForm: FormGroupState<RdpModel>, action: Action): FormGroupState<RdpModel> => {
    const formGroupReducerConst = formGroupReducer(rdpForm, action);
    return validateSelectedIntegrationFormRdp(formGroupReducerConst);
};

export const validateCsvIntegration = (csvForm: FormGroupState<CsvModel>, action: Action): FormGroupState<CsvModel> => {
    const formGroupReducerConst = formGroupReducer(csvForm, action);
    return validateSelectedIntegrationFormCsv(formGroupReducerConst);
};

export const validateEbsIntegration = (ebsForm: FormGroupState<EbsModel>, action: Action): FormGroupState<EbsModel> => {
    const formGroupReducerConst = formGroupReducer(ebsForm, action);
    return validateSelectedIntegrationFormEbs(formGroupReducerConst);
};

export const validateRestApiIntegration = (restForm: FormGroupState<RestApiModel>, action: Action): FormGroupState<RestApiModel> => {
    const formGroupReducerConst = formGroupReducer(restForm, action);
    return validateSelectedIntegrationFormRestApi(formGroupReducerConst);
};


