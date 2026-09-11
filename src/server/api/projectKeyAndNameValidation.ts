import { ErrorCollectionSchema, type ErrorCollection } from '../models/errorCollection';
import type { ValidateProjectKey } from '../parameters/validateProjectKey';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Validates a project key. */
export async function validateProjectKey(
  client: Client,
  parameters?: ValidateProjectKey,
  options?: RequestOptions,
): Promise<ErrorCollection> {
  const config: SendRequestOptions<ErrorCollection> = {
    url: '/rest/api/2/projectvalidate/key',
    method: 'GET',
    searchParams: {
      key: parameters?.key,
    },
    schema: ErrorCollectionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
