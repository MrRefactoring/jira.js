import { ProgressSchema, type Progress } from '../models/progress';
import type { GetImportProgress } from '../parameters/getImportProgress';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Show ongoing import process */
export async function getImportProgress(
  client: Client,
  parameters: GetImportProgress,
  options?: RequestOptions,
): Promise<Progress> {
  const config: SendRequestOptions<Progress> = {
    url: `/progress/category/imports/${parameters.id}`,
    method: 'GET',
    schema: ProgressSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
