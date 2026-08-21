import { ObjectAttributeSchema, type ObjectAttribute } from '../models/objectAttribute';
import type { CreateObjectAttribute } from '../parameters/createObjectAttribute';
import type { Client, SendRequestOptions } from '#/core';

/** Create a new attribute for a given object. */
export async function createObjectAttribute(
  client: Client,
  parameters: CreateObjectAttribute,
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
  };

  return await client.sendRequest(config);
}
