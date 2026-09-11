import { StatusTypeSchema, type StatusType } from '../models/statusType';
import type { GetStatusType } from '../parameters/getStatusType';
import type { UpdateStatusType } from '../parameters/updateStatusType';
import type { DeleteStatusType } from '../parameters/deleteStatusType';
import type { FindStatusTypes } from '../parameters/findStatusTypes';
import type { StoreStatusType } from '../parameters/storeStatusType';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Get details on a given status. */
export async function getStatusType(
  client: Client,
  parameters: GetStatusType,
  options?: RequestOptions,
): Promise<StatusType> {
  const config: SendRequestOptions<StatusType> = {
    url: `/rest/assets/1.0/config/statustype/${parameters.id}`,
    method: 'GET',
    schema: StatusTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing status type. */
export async function updateStatusType(
  client: Client,
  parameters: UpdateStatusType,
  options?: RequestOptions,
): Promise<StatusType> {
  const config: SendRequestOptions<StatusType> = {
    url: `/rest/assets/1.0/config/statustype/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: StatusTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete a single status type. */
export async function deleteStatusType(
  client: Client,
  parameters: DeleteStatusType,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/config/statustype/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Find status types for a given object schema ID. */
export async function findStatusTypes(
  client: Client,
  parameters?: FindStatusTypes,
  options?: RequestOptions,
): Promise<StatusType[]> {
  const config: SendRequestOptions<StatusType[]> = {
    url: '/rest/assets/1.0/config/statustype',
    method: 'GET',
    searchParams: {
      objectSchemaId: parameters?.objectSchemaId,
    },
    schema: z.array(StatusTypeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Store a new status type. */
export async function storeStatusType(
  client: Client,
  parameters: StoreStatusType,
  options?: RequestOptions,
): Promise<StatusType> {
  const config: SendRequestOptions<StatusType> = {
    url: '/rest/assets/1.0/config/statustype',
    method: 'POST',
    body: {
      id: parameters.id,
      name: parameters.name,
      description: parameters.description,
      category: parameters.category,
      objectSchemaId: parameters.objectSchemaId,
    },
    schema: StatusTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
