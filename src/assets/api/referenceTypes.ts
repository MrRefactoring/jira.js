import { ReferenceTypeSchema, type ReferenceType } from '../models/referenceType';
import type { FindReferenceTypes } from '../parameters/findReferenceTypes';
import type { CreateReferenceType } from '../parameters/createReferenceType';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Get reference type */
export async function findReferenceTypes(client: Client, parameters?: FindReferenceTypes): Promise<ReferenceType[]> {
  const config: SendRequestOptions<ReferenceType[]> = {
    url: '/config/referencetype',
    method: 'GET',
    searchParams: {
      objectSchemaId: parameters?.objectSchemaId,
      includeAll: parameters?.includeAll,
    },
    schema: z.array(ReferenceTypeSchema),
  };

  return await client.sendRequest(config);
}

/** Update a reference type */
export async function createReferenceType(client: Client, parameters: CreateReferenceType): Promise<ReferenceType> {
  const config: SendRequestOptions<ReferenceType> = {
    url: '/config/referencetype',
    method: 'POST',
    body: {
      name: parameters.name,
      description: parameters.description,
      color: parameters.color,
      objectSchemaId: parameters.objectSchemaId,
    },
    schema: ReferenceTypeSchema,
  };

  return await client.sendRequest(config);
}
