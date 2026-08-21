import { ProgressSchema, type Progress } from '../models/progress';
import type { GetImportProgress } from '../parameters/getImportProgress';
import type { Client, SendRequestOptions } from '#/core';

/** Show ongoing import process */
export async function getImportProgress(client: Client, parameters: GetImportProgress): Promise<Progress> {
  const config: SendRequestOptions<Progress> = {
    url: `/progress/category/imports/${parameters.id}`,
    method: 'GET',
    schema: ProgressSchema,
  };

  return await client.sendRequest(config);
}
