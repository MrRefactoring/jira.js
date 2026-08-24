import { ObjectAttributeSchema, type ObjectAttribute } from '../models/objectAttribute';
import type { CreateObjectAttribute } from '../parameters/createObjectAttribute';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Create a new attribute for a given object. */
export async function createObjectAttribute(
  client: Client,
  parameters: CreateObjectAttribute,
  options?: RequestOptions,
): Promise<ObjectAttribute> {
  const config: SendRequestOptions<ObjectAttribute> = {
    url: '/rest/assets/1.0/objectattribute/create',
    method: 'POST',
    searchParams: {
      includeTypeAttribute: parameters.includeTypeAttribute,
    },
    body: {
      objectId: parameters.objectId,
      objectTypeAttributeId: parameters.objectTypeAttributeId,
      objectAttributeValues: parameters.objectAttributeValues,
      operationType: parameters.operationType,
    },
    schema: ObjectAttributeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
