import { ProgressOutSchema, type ProgressOut } from '../models/progressOut';
import type { GetProgressForCategoryAndResourceId } from '../parameters/getProgressForCategoryAndResourceId';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Get progress of ongoing tasks Retrieve the progress of the most recent reindex task
 * `/progress/category/insight-reindex/reindex` Retrieve the progress of an import task
 * `/progress/category/imports/{id}`.
 */
export async function getProgressForCategoryAndResourceId(
  client: Client,
  parameters: GetProgressForCategoryAndResourceId,
): Promise<ProgressOut> {
  const config: SendRequestOptions<ProgressOut> = {
    url: `/rest/assets/1.0/progress/category/${parameters.category}/${parameters.resourceid}`,
    method: 'GET',
    schema: ProgressOutSchema,
  };

  return await client.sendRequest(config);
}
