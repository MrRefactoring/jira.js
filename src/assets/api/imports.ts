import { ProgressSchema, type Progress } from '../models/progress';
import type { StartImport } from '../parameters/startImport';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Start configured imports. To see an ongoing import see the Progress resource */
export async function startImport(
  client: Client,
  parameters: StartImport,
  options?: RequestOptions,
): Promise<Progress> {
  const config: SendRequestOptions<Progress> = {
    url: `/import/start/${parameters.id}`,
    method: 'POST',
    schema: ProgressSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
