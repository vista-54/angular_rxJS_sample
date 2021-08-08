export declare interface AdditionalPropertyObject {
  additionalProperties: {};
  id: string;
  name: string;
  type: string;
}

export declare interface GetAdditionalPropertyObjectsApiResponse {
  additionalPropertyObjects: AdditionalPropertyObject[];
  additionalPropertyObjectsIds: string[];
  totalItemsCount: number;
}
