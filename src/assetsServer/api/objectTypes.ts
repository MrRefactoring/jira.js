import { ObjectTypeSchema, type ObjectType } from '../models/objectType';
import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from '../models/objectTypeAttribute';
import type { ChangeOrderObjectType } from '../parameters/changeOrderObjectType';
import type { CreateObjectType } from '../parameters/createObjectType';
import type { LoadObjectType } from '../parameters/loadObjectType';
import type { UpdateObjectType } from '../parameters/updateObjectType';
import type { DeleteObjectType } from '../parameters/deleteObjectType';
import type { FindObjectTypeAttributes } from '../parameters/findObjectTypeAttributes';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Change the position of an object type in the object type hierarchy tree. */
export async function changeOrderObjectType(
  client: Client,
  parameters: ChangeOrderObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/rest/assets/1.0/objecttype/${parameters.affectedId}/position`,
    method: 'POST',
    body: {
      toObjectTypeId: parameters.toObjectTypeId,
      position: parameters.position,
    },
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a new object type. */
export async function createObjectType(
  client: Client,
  parameters: CreateObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: '/rest/assets/1.0/objecttype/create',
    method: 'POST',
    body: {
      id: parameters.id,
      name: parameters.name,
      description: parameters.description,
      iconId: parameters.iconId,
      objectSchemaId: parameters.objectSchemaId,
      parentObjectTypeId: parameters.parentObjectTypeId,
      inherited: parameters.inherited,
      abstractObjectType: parameters.abstractObjectType,
    },
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get a single object type. */
export async function loadObjectType(
  client: Client,
  parameters: LoadObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/rest/assets/1.0/objecttype/${parameters.id}`,
    method: 'GET',
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing object type. */
export async function updateObjectType(
  client: Client,
  parameters: UpdateObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/rest/assets/1.0/objecttype/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete an object type. */
export async function deleteObjectType(
  client: Client,
  parameters: DeleteObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/rest/assets/1.0/objecttype/${parameters.id}`,
    method: 'DELETE',
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Find all object type attributes for this object type. */
export async function findObjectTypeAttributes(
  client: Client,
  parameters: FindObjectTypeAttributes,
  options?: RequestOptions,
): Promise<ObjectTypeAttribute[]> {
  const config: SendRequestOptions<ObjectTypeAttribute[]> = {
    url: `/rest/assets/1.0/objecttype/${parameters.id}/attributes`,
    method: 'GET',
    searchParams: {
      orderByRequired: parameters.orderByRequired,
      orderByName: parameters.orderByName,
      includeChildren: parameters.includeChildren,
      query: parameters.query,
      excludeParentAttributes: parameters.excludeParentAttributes,
      includeValueExist: parameters.includeValueExist,
      onlyValueEditable: parameters.onlyValueEditable,
    },
    schema: z.array(ObjectTypeAttributeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
