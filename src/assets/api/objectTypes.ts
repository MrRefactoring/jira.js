import { ObjectTypeSchema, type ObjectType } from '../models/objectType';
import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from '../models/objectTypeAttribute';
import type { LoadObjectType } from '../parameters/loadObjectType';
import type { UpdateObjectType } from '../parameters/updateObjectType';
import type { DeleteObjectType } from '../parameters/deleteObjectType';
import type { FindObjectTypeAttributes } from '../parameters/findObjectTypeAttributes';
import type { ChangeObjectTypePosition } from '../parameters/changeObjectTypePosition';
import type { CreateObjectType } from '../parameters/createObjectType';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Find an object type by id */
export async function loadObjectType(
  client: Client,
  parameters: LoadObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/objecttype/${parameters.id}`,
    method: 'GET',
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing object type */
export async function updateObjectType(
  client: Client,
  parameters: UpdateObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/objecttype/${parameters.id}`,
    method: 'PUT',
    body: {
      name: parameters.name,
      description: parameters.description,
      iconId: parameters.iconId,
      inherited: parameters.inherited,
      abstractObjectType: parameters.abstractObjectType,
    },
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete an object type */
export async function deleteObjectType(
  client: Client,
  parameters: DeleteObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/objecttype/${parameters.id}`,
    method: 'DELETE',
    schema: ObjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Find all attributes for this object type */
export async function findObjectTypeAttributes(
  client: Client,
  parameters: FindObjectTypeAttributes,
  options?: RequestOptions,
): Promise<ObjectTypeAttribute[]> {
  const config: SendRequestOptions<ObjectTypeAttribute[]> = {
    url: `/objecttype/${parameters.id}/attributes`,
    method: 'GET',
    searchParams: {
      onlyValueEditable: parameters.onlyValueEditable,
      orderByName: parameters.orderByName,
      query: parameters.query,
      includeValuesExist: parameters.includeValuesExist,
      excludeParentAttributes: parameters.excludeParentAttributes,
      includeChildren: parameters.includeChildren,
      orderByRequired: parameters.orderByRequired,
    },
    schema: z.array(ObjectTypeAttributeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Change position of this object type */
export async function changeObjectTypePosition(
  client: Client,
  parameters: ChangeObjectTypePosition,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: `/objecttype/${parameters.id}/position`,
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

/** Create a new object type */
export async function createObjectType(
  client: Client,
  parameters: CreateObjectType,
  options?: RequestOptions,
): Promise<ObjectType> {
  const config: SendRequestOptions<ObjectType> = {
    url: '/objecttype/create',
    method: 'POST',
    body: {
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
