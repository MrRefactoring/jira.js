import { PriorityIdSchema, type PriorityId } from '../models/priorityId';
import { PagePrioritySchema } from '../models/pagePriority';
import type { Page } from '../models/page';
import { PrioritySchema, type Priority } from '../models/priority';
import { TaskProgressObjectSchema, type TaskProgressObject } from '../models/taskProgressObject';
import type { CreatePriority } from '../parameters/createPriority';
import type { SetDefaultPriority } from '../parameters/setDefaultPriority';
import type { MovePriorities } from '../parameters/movePriorities';
import type { SearchPriorities } from '../parameters/searchPriorities';
import type { GetPriority } from '../parameters/getPriority';
import type { UpdatePriority } from '../parameters/updatePriority';
import type { DeletePriority } from '../parameters/deletePriority';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Creates an issue priority.
 *
 * **Deprecation notice:** The `iconUrl` parameter was sunset on 16th Mar 2025, and replaced with `avatarId`. See
 * [CHANGE-1525](https://developer.atlassian.com/changelog/#CHANGE-1525).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createPriority(
  client: Client,
  parameters: CreatePriority,
  options?: RequestOptions,
): Promise<PriorityId> {
  const config: SendRequestOptions<PriorityId> = {
    url: '/rest/api/3/priority',
    method: 'POST',
    body: {
      avatarId: parameters.avatarId,
      description: parameters.description,
      iconUrl: parameters.iconUrl,
      name: parameters.name,
      statusColor: parameters.statusColor,
    },
    schema: PriorityIdSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets default issue priority.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setDefaultPriority(
  client: Client,
  parameters: SetDefaultPriority,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/priority/default',
    method: 'PUT',
    body: {
      id: parameters.id,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Changes the order of issue priorities.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function movePriorities(
  client: Client,
  parameters: MovePriorities,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/priority/move',
    method: 'PUT',
    body: {
      after: parameters.after,
      ids: parameters.ids,
      position: parameters.position,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of
 * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
 *
 * - A list of priority IDs. Any invalid priority IDs are ignored.
 * - A list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project IDs
 *   are ignored.
 * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
 *   as there is no concept of default priorities in team-managed projects.
 *
 * **Deprecation notice:** The `onlyDefault` parameter is deprecated and will be removed at a later date. See
 * [CHANGE-1655](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1655).
 *
 * **Deprecation notice:** The `isDefault` property of priorities is deprecated and will be removed at a later date. See
 * [CHANGE-1655](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1655).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function searchPriorities(
  client: Client,
  parameters?: SearchPriorities,
  options?: RequestOptions,
): Promise<Page<Priority>> {
  const config: SendRequestOptions<Page<Priority>> = {
    url: '/rest/api/3/priority/search',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      projectId: parameters?.projectId,
      priorityName: parameters?.priorityName,
      onlyDefault: parameters?.onlyDefault,
      expand: parameters?.expand,
    },
    schema: PagePrioritySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns an issue priority. To fetch multiple priorities at once, use [Search
 * priorities](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority/#api-rest-api-3-priority-search-get)
 * instead.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getPriority(
  client: Client,
  parameters: GetPriority,
  options?: RequestOptions,
): Promise<Priority> {
  const config: SendRequestOptions<Priority> = {
    url: `/rest/api/3/priority/${parameters.id}`,
    method: 'GET',
    schema: PrioritySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates an issue priority.
 *
 * At least one request body parameter must be defined.
 *
 * **Deprecation notice:** The `iconUrl` parameter was sunset on 16th Mar 2025, and replaced with `avatarId`. See
 * [CHANGE-1525](https://developer.atlassian.com/changelog/#CHANGE-1525).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updatePriority(
  client: Client,
  parameters: UpdatePriority,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/priority/${parameters.id}`,
    method: 'PUT',
    body: {
      avatarId: parameters.avatarId,
      description: parameters.description,
      iconUrl: parameters.iconUrl,
      name: parameters.name,
      statusColor: parameters.statusColor,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue priority.
 *
 * This operation is [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async). Follow the
 * `location` link in the response to determine the status of the task and use [Get
 * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-task/#api-rest-api-3-task-taskId-get) to
 * obtain subsequent updates.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deletePriority(
  client: Client,
  parameters: DeletePriority,
  options?: RequestOptions,
): Promise<TaskProgressObject> {
  const config: SendRequestOptions<TaskProgressObject> = {
    url: `/rest/api/3/priority/${parameters.id}`,
    method: 'DELETE',
    schema: TaskProgressObjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
