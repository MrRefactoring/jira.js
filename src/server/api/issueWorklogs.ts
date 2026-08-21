import { WorklogChangedSinceSchema, type WorklogChangedSince } from '../models/worklogChangedSince';
import { WorklogSchema, type Worklog } from '../models/worklog';
import type { GetIdsOfWorklogsDeletedSince } from '../parameters/getIdsOfWorklogsDeletedSince';
import type { GetWorklogsForIds } from '../parameters/getWorklogsForIds';
import type { GetIdsOfWorklogsModifiedSince } from '../parameters/getIdsOfWorklogsModifiedSince';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns worklogs id and delete time of worklogs that was deleted since given time. The returns set of worklogs is
 * limited to 1000 elements. This API will not return worklogs deleted during last minute.
 */
export async function getIdsOfWorklogsDeletedSince(
  client: Client,
  parameters?: GetIdsOfWorklogsDeletedSince,
): Promise<WorklogChangedSince> {
  const config: SendRequestOptions<WorklogChangedSince> = {
    url: '/rest/api/2/worklog/deleted',
    method: 'GET',
    searchParams: {
      since: parameters?.since,
    },
    schema: WorklogChangedSinceSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns worklogs for given worklog ids. Only worklogs to which the calling user has permissions, will be included in
 * the result. The returns set of worklogs is limited to 1000 elements.
 */
export async function getWorklogsForIds(client: Client, parameters: GetWorklogsForIds): Promise<Worklog[]> {
  const config: SendRequestOptions<Worklog[]> = {
    url: '/rest/api/2/worklog/list',
    method: 'POST',
    body: {
      ids: parameters.ids,
    },
    schema: z.array(WorklogSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns worklogs id and update time of worklogs that was updated since given time. The returns set of worklogs is
 * limited to 1000 elements. This API will not return worklogs updated during last minute.
 */
export async function getIdsOfWorklogsModifiedSince(
  client: Client,
  parameters?: GetIdsOfWorklogsModifiedSince,
): Promise<WorklogChangedSince> {
  const config: SendRequestOptions<WorklogChangedSince> = {
    url: '/rest/api/2/worklog/updated',
    method: 'GET',
    searchParams: {
      since: parameters?.since,
    },
    schema: WorklogChangedSinceSchema,
  };

  return await client.sendRequest(config);
}
