import { ProductModel } from '../../pages/identity-automation/pages/integration/models/product.model';
import { EnvironmentTypes, IntegrationTypes } from '@const/environment-types.const';
import { Boxed } from 'ngrx-forms';
import { AuthType, PwdOrPK } from '../../pages/identity-automation/pages/integration/models/integration.model';

export declare interface IntegrationModel {
  id: number;
  name: string;
  description: string;
  alternateName: string;
  environmentType: EnvironmentTypes;
  integrationType: IntegrationTypes;
  tags?: Boxed<string[]>;
  validationErrors: Boxed<string[]>;
}


export declare interface IntegrationApiResponse {
  integrationConfigs: ProductModel[];
  totalItemsCount: number;
}

export declare interface AllIdentitiesAndWorkgroups {
  allIdentities: any[];
  allWorkgroups: any[];
}


export declare interface IntegrationTogglesForm {
  linuxPwdOrPk: PwdOrPK;
  peopleSoftLogoutIntegration: boolean;
  mssqlAuth: AuthType;
}
