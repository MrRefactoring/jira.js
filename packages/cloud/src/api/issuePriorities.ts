import { PrioritySchema, type Priority } from '#/models/priority';
import { type SetDefaultPriority } from '#/parameters/setDefaultPriority';
import { type MovePriorities } from '#/parameters/movePriorities';
import { type GetPriority } from '#/parameters/getPriority';
import { type DeletePriority } from '#/parameters/deletePriority';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Sets default issue priority.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setDefaultPriority(client: Client, parameters: SetDefaultPriority): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/priority/default',
    method: 'PUT',
    body: {
      id: parameters.id,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Changes the order of issue priorities.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function movePriorities(client: Client, parameters: MovePriorities): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/priority/move',
    method: 'PUT',
    body: {
      after: parameters.after,
      ids: parameters.ids,
      position: parameters.position,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns an issue priority.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getPriority(client: Client, parameters: GetPriority): Promise<Priority> {
  const config: SendRequestOptions<Priority> = {
    url: `/rest/api/3/priority/${parameters.id}`,
    method: 'GET',
    schema: PrioritySchema,
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
export async function deletePriority(client: Client, parameters: DeletePriority): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/priority/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
