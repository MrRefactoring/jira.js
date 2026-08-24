import type { GetSchemas } from '../parameters/getSchemas';
import type { GetUserSchemas } from '../parameters/getUserSchemas';
import type { GetGroupSchemas } from '../parameters/getGroupSchemas';
import type { GetExtensionUserSchemas } from '../parameters/getExtensionUserSchemas';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Get all SCIM features metadata of your organization.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getSchemas(client: Client, parameters: GetSchemas, options?: RequestOptions): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: `/scim/directory/${parameters.directoryId}/Schemas`,
    method: 'GET',
    schema: z.string(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get the user schemas from the SCIM provider.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getUserSchemas(
  client: Client,
  parameters: GetUserSchemas,
  options?: RequestOptions,
): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: `/scim/directory/${parameters.directoryId}/Schemas/urn:ietf:params:scim:schemas:core:2.0:User`,
    method: 'GET',
    schema: z.string(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get the group schemas from the SCIM provider.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getGroupSchemas(
  client: Client,
  parameters: GetGroupSchemas,
  options?: RequestOptions,
): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: `/scim/directory/${parameters.directoryId}/Schemas/urn:ietf:params:scim:schemas:core:2.0:Group`,
    method: 'GET',
    schema: z.string(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get the user enterprise extension schemas from the SCIM provider.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getExtensionUserSchemas(
  client: Client,
  parameters: GetExtensionUserSchemas,
  options?: RequestOptions,
): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: `/scim/directory/${parameters.directoryId}/Schemas/urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`,
    method: 'GET',
    schema: z.string(),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
