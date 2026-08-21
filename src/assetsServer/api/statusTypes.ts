import { StatusTypeSchema, type StatusType } from '../models/statusType';
import type { GetStatusType } from '../parameters/getStatusType';
import type { UpdateStatusType } from '../parameters/updateStatusType';
import type { DeleteStatusType } from '../parameters/deleteStatusType';
import type { FindStatusTypes } from '../parameters/findStatusTypes';
import type { StoreStatusType } from '../parameters/storeStatusType';
import type { Client, SendRequestOptions } from '#/core';

/** Get details on a given status. */
export async function getStatusType(client: Client, parameters: GetStatusType): Promise<StatusType> {
  const config: SendRequestOptions<StatusType> = {
    url: `/rest/assets/1.0/config/statustype/${parameters.id}`,
    method: 'GET',
    schema: StatusTypeSchema,
  };

  return await client.sendRequest(config);
}

/** Update an existing status type. */
export async function updateStatusType(client: Client, parameters: UpdateStatusType): Promise<StatusType> {
  const config: SendRequestOptions<StatusType> = {
    url: `/rest/assets/1.0/config/statustype/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: StatusTypeSchema,
  };

  return await client.sendRequest(config);
}

/** Delete a single status type. */
export async function deleteStatusType(client: Client, parameters: DeleteStatusType): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/assets/1.0/config/statustype/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Find status types for a given object schema ID. */
export async function findStatusTypes(client: Client, parameters?: FindStatusTypes): Promise<StatusType> {
  const config: SendRequestOptions<StatusType> = {
    url: '/rest/assets/1.0/config/statustype',
    method: 'GET',
    searchParams: {
      objectSchemaId: parameters?.objectSchemaId,
    },
    schema: StatusTypeSchema,
  };

  return await client.sendRequest(config);
}

/** Store a new status type. */
export async function storeStatusType(client: Client, parameters: StoreStatusType): Promise<StatusType> {
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
  };

  return await client.sendRequest(config);
}
