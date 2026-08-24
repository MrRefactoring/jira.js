import { ConfigurationSchema, type Configuration } from '../models/configuration';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the information if the optional features in Jira are enabled or disabled. If the time tracking is enabled, it
 * also returns the detailed information about time tracking configuration.
 */
export async function getConfiguration(client: Client, options?: RequestOptions): Promise<Configuration> {
  const config: SendRequestOptions<Configuration> = {
    url: '/rest/api/2/configuration',
    method: 'GET',
    schema: ConfigurationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
