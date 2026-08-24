import { ObjectSchemaSchema, type ObjectSchema } from '../models/objectSchema';
import { ObjectSchemaListSchema, type ObjectSchemaList } from '../models/objectSchemaList';
import { ObjectTypeSchema, type ObjectType } from '../models/objectType';
import type { CreateSchema } from '../parameters/createSchema';
import type { LoadSchema } from '../parameters/loadSchema';
import type { UpdateSchema } from '../parameters/updateSchema';
import type { DeleteSchema } from '../parameters/deleteSchema';
import type { FindSchemas } from '../parameters/findSchemas';
import type { FindObjectTypeFlatList } from '../parameters/findObjectTypeFlatList';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Create a new object schema. */
export async function createSchema(
  client: Client,
  parameters: CreateSchema,
  options?: RequestOptions,
): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: '/rest/assets/1.0/objectschema/create',
    method: 'POST',
    body: {
      name: parameters.name,
      objectSchemaKey: parameters.objectSchemaKey,
      description: parameters.description,
    },
    schema: ObjectSchemaSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get a single object schema. */
export async function loadSchema(
  client: Client,
  parameters: LoadSchema,
  options?: RequestOptions,
): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: `/rest/assets/1.0/objectschema/${parameters.id}`,
    method: 'GET',
    schema: ObjectSchemaSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an object schema. */
export async function updateSchema(
  client: Client,
  parameters: UpdateSchema,
  options?: RequestOptions,
): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: `/rest/assets/1.0/objectschema/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ObjectSchemaSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes a single object schema. */
export async function deleteSchema(
  client: Client,
  parameters: DeleteSchema,
  options?: RequestOptions,
): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: `/rest/assets/1.0/objectschema/${parameters.id}`,
    method: 'DELETE',
    schema: ObjectSchemaSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Searches for an object schema by name. */
export async function findSchemas(
  client: Client,
  parameters?: FindSchemas,
  options?: RequestOptions,
): Promise<ObjectSchemaList> {
  const config: SendRequestOptions<ObjectSchemaList> = {
    url: '/rest/assets/1.0/objectschema/list',
    method: 'GET',
    searchParams: {
      xoauth_requestor_id: parameters?.xoauth_requestor_id,
      query: parameters?.query,
    },
    schema: ObjectSchemaListSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get a flat list of all object types belonging to a certain object schema. */
export async function findObjectTypeFlatList(
  client: Client,
  parameters: FindObjectTypeFlatList,
  options?: RequestOptions,
): Promise<ObjectType[]> {
  const config: SendRequestOptions<ObjectType[]> = {
    url: `/rest/assets/1.0/objectschema/${parameters.id}/objecttypes/flat`,
    method: 'GET',
    searchParams: {
      role: parameters.role,
      query: parameters.query,
      exclude: parameters.exclude,
    },
    schema: z.array(ObjectTypeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
