import { NameId } from './identity.model';

export declare interface Workgroup {
  id: number;
  name: string;
}

export declare interface WorkgroupsApiResponse {
  workgroups: Workgroup[];
  totalItemsCount: number;
}

export declare interface WorkgroupApiResponse {
  workgroup: Workgroup;
  workgroupIdentities: number[];
  allIdentities: NameId[];
}

export declare interface WorkgroupUpdateApiRequest extends Workgroup {
  identityIds: number[];
}

export declare interface WorkgroupSaveApiRequest {
  name: string;
  identityIds: number[];
}
