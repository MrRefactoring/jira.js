import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from '../models/objectTypeAttribute';
import type { CreateObjectTypeAttribute } from '../parameters/createObjectTypeAttribute';
import type { UpdateObjectTypeAttribute } from '../parameters/updateObjectTypeAttribute';
import type { DeleteObjectTypeAttribute } from '../parameters/deleteObjectTypeAttribute';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Create a new attribute on the given object type */
export async function createObjectTypeAttribute(
  client: Client,
  parameters: CreateObjectTypeAttribute,
  options?: RequestOptions,
): Promise<ObjectTypeAttribute> {
  const config: SendRequestOptions<ObjectTypeAttribute> = {
    url: `/objecttypeattribute/${parameters.objectTypeId}`,
    method: 'POST',
    body: {
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
      suffix: parameters.suffix,
      includeChildObjectTypes: parameters.includeChildObjectTypes,
      hidden: parameters.hidden,
      uniqueAttribute: parameters.uniqueAttribute,
      summable: parameters.summable,
      regexValidation: parameters.regexValidation,
      qlQuery: parameters.qlQuery,
      options: parameters.options,
    },
    schema: ObjectTypeAttributeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing object type attribute */
export async function updateObjectTypeAttribute(
  client: Client,
  parameters: UpdateObjectTypeAttribute,
  options?: RequestOptions,
): Promise<ObjectTypeAttribute> {
  const config: SendRequestOptions<ObjectTypeAttribute> = {
    url: `/objecttypeattribute/${parameters.objectTypeId}/${parameters.id}`,
    method: 'PUT',
    body: {
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
      suffix: parameters.suffix,
      includeChildObjectTypes: parameters.includeChildObjectTypes,
      hidden: parameters.hidden,
      uniqueAttribute: parameters.uniqueAttribute,
      summable: parameters.summable,
      regexValidation: parameters.regexValidation,
      qlQuery: parameters.qlQuery,
      options: parameters.options,
    },
    schema: ObjectTypeAttributeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete an existing object type attribute */
export async function deleteObjectTypeAttribute(
  client: Client,
  parameters: DeleteObjectTypeAttribute,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/objecttypeattribute/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
