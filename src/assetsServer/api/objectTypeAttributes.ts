import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from '../models/objectTypeAttribute';
import type { DeleteObjectTypeAttribute } from '../parameters/deleteObjectTypeAttribute';
import type { StoreObjectTypeAttribute } from '../parameters/storeObjectTypeAttribute';
import type { UpdateObjectTypeAttribute } from '../parameters/updateObjectTypeAttribute';
import type { Client, SendRequestOptions } from '#/core';

/** Delete a single object type attribute. */
export async function deleteObjectTypeAttribute(client: Client, parameters: DeleteObjectTypeAttribute): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/objecttypeattribute/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Store an object type attribute. */
export async function storeObjectTypeAttribute(
  client: Client,
  parameters: StoreObjectTypeAttribute,
): Promise<ObjectTypeAttribute> {
  const config: SendRequestOptions<ObjectTypeAttribute> = {
    url: `/rest/assets/1.0/objecttypeattribute/${parameters.objectTypeId}`,
    method: 'POST',
    body: {
      expand: parameters.expand,
      project: parameters.project,
      position: parameters.position,
      after: parameters.after,
      id: parameters.id,
      name: parameters.name,
      label: parameters.label,
      description: parameters.description,
      type: parameters.type,
      defaultTypeId: parameters.defaultTypeId,
      typeValue: parameters.typeValue,
      typeValueMulti: parameters.typeValueMulti,
      additionalValue: parameters.additionalValue,
      minimumCardinality: parameters.minimumCardinality,
      maximumCardinality: parameters.maximumCardinality,
      removeExcessCardinality: parameters.removeExcessCardinality,
      suffix: parameters.suffix,
      hidden: parameters.hidden,
      includeChildObjectTypes: parameters.includeChildObjectTypes,
      uniqueAttribute: parameters.uniqueAttribute,
      summable: parameters.summable,
      indexed: parameters.indexed,
      regexValidation: parameters.regexValidation,
      qlQuery: parameters.qlQuery,
      options: parameters.options,
      iql: parameters.iql,
    },
    schema: ObjectTypeAttributeSchema,
  };

  return await client.sendRequest(config);
}

/** Update an object type attribute. */
export async function updateObjectTypeAttribute(
  client: Client,
  parameters: UpdateObjectTypeAttribute,
): Promise<ObjectTypeAttribute> {
  const config: SendRequestOptions<ObjectTypeAttribute> = {
    url: `/rest/assets/1.0/objecttypeattribute/${parameters.objectTypeId}/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ObjectTypeAttributeSchema,
  };

  return await client.sendRequest(config);
}
