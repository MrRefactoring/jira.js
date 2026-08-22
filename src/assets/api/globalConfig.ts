import type { UpdateGlobalConfiguration } from '../parameters/updateGlobalConfiguration';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Update general configuration for object schema */
export async function updateGlobalConfiguration(
  client: Client,
  parameters: UpdateGlobalConfiguration,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/global/config/objectschema/${parameters.id}/property`,
    method: 'POST',
    body: {
      allowOtherObjectSchema: parameters.allowOtherObjectSchema,
      validateQuickCreate: parameters.validateQuickCreate,
      quickCreateObjects: parameters.quickCreateObjects,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
