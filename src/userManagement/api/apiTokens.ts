import { ApiTokenModelSchema, type ApiTokenModel } from '../models/apiTokenModel';
import type { GetApiTokens } from '../parameters/getApiTokens';
import type { DeleteApiToken } from '../parameters/deleteApiToken';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Gets the API tokens owned by the specified user. */
export async function getApiTokens(
  client: Client,
  parameters: GetApiTokens,
  options?: RequestOptions,
): Promise<ApiTokenModel[]> {
  const config: SendRequestOptions<ApiTokenModel[]> = {
    url: `/users/${parameters.accountId}/manage/api-tokens`,
    method: 'GET',
    schema: z.array(ApiTokenModelSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes a specifid API token by ID. */
export async function deleteApiToken(
  client: Client,
  parameters: DeleteApiToken,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/users/${parameters.accountId}/manage/api-tokens/${parameters.tokenId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
