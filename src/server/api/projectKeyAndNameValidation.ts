import { ErrorCollectionSchema, type ErrorCollection } from '../models/errorCollection';
import type { ValidateProjectKey } from '../parameters/validateProjectKey';
import type { Client, SendRequestOptions } from '#/core';

/** Validates a project key. */
export async function validateProjectKey(client: Client, parameters?: ValidateProjectKey): Promise<ErrorCollection> {
  const config: SendRequestOptions<ErrorCollection> = {
    url: '/rest/api/2/projectvalidate/key',
    method: 'GET',
    searchParams: {
      key: parameters?.key,
    },
    schema: ErrorCollectionSchema,
  };

  return await client.sendRequest(config);
}
