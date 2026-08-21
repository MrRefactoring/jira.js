import { ObjectSchemaListSchema, type ObjectSchemaList } from '../models/objectSchemaList';
import { ObjectSchemaSchema, type ObjectSchema } from '../models/objectSchema';
import { ObjectTypeAttributeSchema, type ObjectTypeAttribute } from '../models/objectTypeAttribute';
import { ObjectTypeSchema, type ObjectType } from '../models/objectType';
import type { FindSchemas } from '../parameters/findSchemas';
import type { CreateSchema } from '../parameters/createSchema';
import type { LoadSchema } from '../parameters/loadSchema';
import type { UpdateSchema } from '../parameters/updateSchema';
import type { DeleteSchema } from '../parameters/deleteSchema';
import type { FindSchemaAttributes } from '../parameters/findSchemaAttributes';
import type { FindSchemaObjectTypes } from '../parameters/findSchemaObjectTypes';
import type { FindSchemaObjectTypesFlat } from '../parameters/findSchemaObjectTypesFlat';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Resource to find object schemas in Assets */
export async function findSchemas(client: Client, parameters?: FindSchemas): Promise<ObjectSchemaList> {
  const config: SendRequestOptions<ObjectSchemaList> = {
    url: '/objectschema/list',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      includeCounts: parameters?.includeCounts,
    },
    schema: ObjectSchemaListSchema,
  };

  return await client.sendRequest(config);
}

/** Create a new object schema */
export async function createSchema(client: Client, parameters: CreateSchema): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: '/objectschema/create',
    method: 'POST',
    body: {
      name: parameters.name,
      objectSchemaKey: parameters.objectSchemaKey,
      description: parameters.description,
    },
    schema: ObjectSchemaSchema,
  };

  return await client.sendRequest(config);
}

/** Find a schema by id */
export async function loadSchema(client: Client, parameters: LoadSchema): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: `/objectschema/${parameters.id}`,
    method: 'GET',
    schema: ObjectSchemaSchema,
  };

  return await client.sendRequest(config);
}

/** Update an object schema */
export async function updateSchema(client: Client, parameters: UpdateSchema): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: `/objectschema/${parameters.id}`,
    method: 'PUT',
    body: {
      name: parameters.name,
      objectSchemaKey: parameters.objectSchemaKey,
      description: parameters.description,
    },
    schema: ObjectSchemaSchema,
  };

  return await client.sendRequest(config);
}

/** Delete a schema */
export async function deleteSchema(client: Client, parameters: DeleteSchema): Promise<ObjectSchema> {
  const config: SendRequestOptions<ObjectSchema> = {
    url: `/objectschema/${parameters.id}`,
    method: 'DELETE',
    schema: ObjectSchemaSchema,
  };

  return await client.sendRequest(config);
}

/** Find all object type attributes for this object schema */
export async function findSchemaAttributes(
  client: Client,
  parameters: FindSchemaAttributes,
): Promise<ObjectTypeAttribute[]> {
  const config: SendRequestOptions<ObjectTypeAttribute[]> = {
    url: `/objectschema/${parameters.id}/attributes`,
    method: 'GET',
    searchParams: {
      onlyValueEditable: parameters.onlyValueEditable,
      extended: parameters.extended,
      query: parameters.query,
    },
    schema: z.array(ObjectTypeAttributeSchema),
  };

  return await client.sendRequest(config);
}

/** Find all object types for this object schema */
export async function findSchemaObjectTypes(client: Client, parameters: FindSchemaObjectTypes): Promise<ObjectType[]> {
  const config: SendRequestOptions<ObjectType[]> = {
    url: `/objectschema/${parameters.id}/objecttypes`,
    method: 'GET',
    searchParams: {
      excludeAbstract: parameters.excludeAbstract,
    },
    schema: z.array(ObjectTypeSchema),
  };

  return await client.sendRequest(config);
}

/** Find all object types for this object schema */
export async function findSchemaObjectTypesFlat(
  client: Client,
  parameters: FindSchemaObjectTypesFlat,
): Promise<ObjectType[]> {
  const config: SendRequestOptions<ObjectType[]> = {
    url: `/objectschema/${parameters.id}/objecttypes/flat`,
    method: 'GET',
    searchParams: {
      query: parameters.query,
      exclude: parameters.exclude,
      includeObjectCounts: parameters.includeObjectCounts,
    },
    schema: z.array(ObjectTypeSchema),
  };

  return await client.sendRequest(config);
}
