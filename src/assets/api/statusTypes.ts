import { StatusSchema, type Status } from '../models/status';
import type { FindStatusTypes } from '../parameters/findStatusTypes';
import type { CreateStatusType } from '../parameters/createStatusType';
import type { GetStatusType } from '../parameters/getStatusType';
import type { UpdateStatusType } from '../parameters/updateStatusType';
import type { DeleteStatusType } from '../parameters/deleteStatusType';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Find all status */
export async function findStatusTypes(
  client: Client,
  parameters?: FindStatusTypes,
  options?: RequestOptions,
): Promise<Status[]> {
  const config: SendRequestOptions<Status[]> = {
    url: '/config/statustype',
    method: 'GET',
    searchParams: {
      objectSchemaId: parameters?.objectSchemaId,
    },
    schema: z.array(StatusSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a new status */
export async function createStatusType(
  client: Client,
  parameters: CreateStatusType,
  options?: RequestOptions,
): Promise<Status> {
  const config: SendRequestOptions<Status> = {
    url: '/config/statustype',
    method: 'POST',
    body: {
      name: parameters.name,
      description: parameters.description,
      category: parameters.category,
      objectSchemaId: parameters.objectSchemaId,
    },
    schema: StatusSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Find a status by id */
export async function getStatusType(
  client: Client,
  parameters: GetStatusType,
  options?: RequestOptions,
): Promise<Status> {
  const config: SendRequestOptions<Status> = {
    url: `/config/statustype/${parameters.id}`,
    method: 'GET',
    schema: StatusSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update an existing status */
export async function updateStatusType(
  client: Client,
  parameters: UpdateStatusType,
  options?: RequestOptions,
): Promise<Status> {
  const config: SendRequestOptions<Status> = {
    url: `/config/statustype/${parameters.id}`,
    method: 'PUT',
    body: {
      name: parameters.name,
      description: parameters.description,
      category: parameters.category,
      objectSchemaId: parameters.objectSchemaId,
    },
    schema: StatusSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete an existing status */
export async function deleteStatusType(
  client: Client,
  parameters: DeleteStatusType,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/config/statustype/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
