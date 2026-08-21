import { PagedQueueSchema } from '../models/pagedQueue';
import type { Page } from '../models/page';
import { QueueSchema, type Queue } from '../models/queue';
import { PagedIssueSchema } from '../models/pagedIssue';
import type { Issue } from '../models/issue';
import type { GetQueues } from '../parameters/getQueues';
import type { CreateQueue } from '../parameters/createQueue';
import type { GetQueue } from '../parameters/getQueue';
import type { UpdateQueue } from '../parameters/updateQueue';
import type { DeleteQueue } from '../parameters/deleteQueue';
import type { GetIssuesInQueue } from '../parameters/getIssuesInQueue';
import type { ReorderQueues } from '../parameters/reorderQueues';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns a page of queues defined inside a service project, for a given service project ID. The returned queues will
 * include an issue count for each queue (represented in `issueCount` field) if the query param `includeCount` is set to
 * true (defaults to false).
 *
 * **Permissions:**
 *
 * The calling user must be an agent of the given service project.
 */
export async function getQueues(client: Client, parameters: GetQueues): Promise<Page<Queue>> {
  const config: SendRequestOptions<Page<Queue>> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue`,
    method: 'GET',
    searchParams: {
      includeCount: parameters.includeCount,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedQueueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a queue with the given properties.
 *
 * **Permissions:**
 *
 * The calling user must have permission to create a queue, i.e. they must be an admin of the service project that the
 * queue belongs to.
 */
export async function createQueue(client: Client, parameters: CreateQueue): Promise<Queue> {
  const config: SendRequestOptions<Queue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue`,
    method: 'POST',
    body: {
      name: parameters.name,
      jql: parameters.jql,
      fields: parameters.fields,
    },
    schema: QueueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the queue for a given service project id and queue id. The returned queue will include an issue count for
 * queue (represented in `issueCount` field) if the query param `includeCount` is set to true (defaults to false).
 *
 * **Permissions:**
 *
 * The calling user must be an agent of the given service project.
 */
export async function getQueue(client: Client, parameters: GetQueue): Promise<Queue> {
  const config: SendRequestOptions<Queue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}`,
    method: 'GET',
    searchParams: {
      includeCount: parameters.includeCount,
    },
    schema: QueueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the queue properties with the new properties. If a property is not passed it will not be updated.
 *
 * **Permissions:**
 *
 * The calling user must have permission to update a queue, i.e. they must be an admin of the service project that the
 * queue belongs to.
 */
export async function updateQueue(client: Client, parameters: UpdateQueue): Promise<Queue> {
  const config: SendRequestOptions<Queue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}`,
    method: 'POST',
    body: {
      name: parameters.name,
      jql: parameters.jql,
      fields: parameters.fields,
    },
    schema: QueueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the queue for the given queue id.
 *
 * **Permissions:**
 *
 * The calling user must have permission to delete the queue, i.e. they must be an admin of the service project that the
 * queue belongs to.
 */
export async function deleteQueue(client: Client, parameters: DeleteQueue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns a page of issues inside a queue for a given queue ID. Only fields that the queue is configured to show are
 * returned. For example, if a queue is configured to show only Description and Due Date, then only those two fields are
 * returned for each issue in the queue. **Permissions:** The calling user must have permission to view the requested
 * queue, i.e. they must be an agent of the service project that the queue belongs to. **Note:** The total number of
 * issues across all pages that can be returned using paginated search is limited to the maxResultWindow, which is
 * defined by the underlying search engine. The current value is returned in the `maxResultWindow` property of the
 * response. If not set, it means there is no limit.
 */
export async function getIssuesInQueue(client: Client, parameters: GetIssuesInQueue): Promise<Page<Issue>> {
  const config: SendRequestOptions<Page<Issue>> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}/issue`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedIssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Reorder queues for the users. This is the order in which the queues will appear in agent view. The API requires all
 * queue ids to be passed in the new order.
 *
 * **Permissions:**
 *
 * The calling user must have permission to reorder the queue, i.e. they must be an admin of the service project that
 * the queue belongs to.
 */
export async function reorderQueues(client: Client, parameters: ReorderQueues): Promise<Queue> {
  const config: SendRequestOptions<Queue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/reorder`,
    method: 'POST',
    body: parameters.body,
    schema: QueueSchema,
  };

  return await client.sendRequest(config);
}
