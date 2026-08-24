import { ReadOnlyModeStatusSchema, type ReadOnlyModeStatus } from '../models/readOnlyModeStatus';
import type { UpdateReadOnlyMode } from '../parameters/updateReadOnlyMode';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns whether Jira is currently in read-only mode.
 *
 * Available since Jira Data Center 11.3, and in 10.3 LTS.
 */
export async function getReadOnlyMode(client: Client, options?: RequestOptions): Promise<ReadOnlyModeStatus> {
  const config: SendRequestOptions<ReadOnlyModeStatus> = {
    url: '/rest/api/2/readonly-mode',
    method: 'GET',
    schema: ReadOnlyModeStatusSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Enables or disables Jira read-only mode.
 *
 * Available since Jira Data Center 11.3, and in 10.3 LTS.
 */
export async function updateReadOnlyMode(
  client: Client,
  parameters: UpdateReadOnlyMode,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/readonly-mode',
    method: 'PUT',
    body: {
      enabled: parameters.enabled,
      endTime: parameters.endTime,
      message: parameters.message,
      timeZone: parameters.timeZone,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
