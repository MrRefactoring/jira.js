import type { GetQueueSettingsOnProject } from '../parameters/getQueueSettingsOnProject';
import type { SetShouldQueuesIncludeCountGlobally } from '../parameters/setShouldQueuesIncludeCountGlobally';
import type { SetShouldQueuesIncludeCountOnProject } from '../parameters/setShouldQueuesIncludeCountOnProject';
import type { SetShouldQueuesUseCountCacheGlobally } from '../parameters/setShouldQueuesUseCountCacheGlobally';
import type { SetShouldQueuesUseCountCacheOnProject } from '../parameters/setShouldQueuesUseCountCacheOnProject';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Retrieve the current state of configurable settings for the projects Queue. */
export async function getQueueSettingsOnProject(
  client: Client,
  parameters: GetQueueSettingsOnProject,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/admin/queues/${parameters.projectKey}`,
    method: 'GET',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Allows to set whether service project queues should include the issue count on the Queues page. This is a global
 * setting that if disabled will override any project level settings. The default value is always true. The intention of
 * this method is that if you are experiencing performance issues with queue rendering on agent pages, then this setting
 * might be of use to try toggling the queue count on/off. The queue count executes a JQL query that may take time on
 * instances with many projects/issues.
 */
export async function setShouldQueuesIncludeCountGlobally(
  client: Client,
  parameters: SetShouldQueuesIncludeCountGlobally,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/servicedeskapi/admin/queues/include-count',
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Allows to set whether service project queues should include the issue count on the Queues page for specified project.
 * This is a project level setting, and it's enabled state can be overrided by the global setting. To enable queue count
 * this and the global setting must be true. The default value is always true. The intention of this method is that if
 * you are experiencing performance issues with queue rendering on agent pages, then this setting might be of use to try
 * toggling the queue count on/off. The queue count executes a JQL query that may take time on instances with many
 * projects/issues.
 */
export async function setShouldQueuesIncludeCountOnProject(
  client: Client,
  parameters: SetShouldQueuesIncludeCountOnProject,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/admin/queues/${parameters.projectKey}/include-count`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Allows to set whether service project queues should always return as soon as possible, and schedule the queue count
 * to happen off-thread. This is a global setting that if disabled will override any project level settings. The default
 * value is always false. The intention of this method is that if you are experiencing performance issues with queue
 * rendering on agent pages, then this setting might be of use to try toggling the queue count on/off. With this
 * enabled, any project that also enables this setting, will return the latest cached value (up to a expiry time limit)
 * and schedule a new count to occur in a new thread. That new thread will update the cache value when done, and
 * subsequent update of the queue view, through polling or refresh, will take that as the latest cache value. When no
 * cache value, or it has expired, the queue count will be blank. The queue count will still be specific to the agent
 * viewing the queue, so any view restrictions will remain. This setting is an option to try if would are having some
 * performance issues, but do not want to turn queue count off completely, and are happy with an approximate value.
 */
export async function setShouldQueuesUseCountCacheGlobally(
  client: Client,
  parameters: SetShouldQueuesUseCountCacheGlobally,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/servicedeskapi/admin/queues/cache-count',
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Allows to set whether service project queues should include the issue count on the Queues page for specified project.
 * This is a project level setting, and it's enabled state can be overrided by the global setting. To enable queue count
 * this and the global setting must be true. The default value is always true. The intention of this method is that if
 * you are experiencing performance issues with queue rendering on agent pages, then this setting might be of use to try
 * toggling the queue count on/off. With this enabled, if the global setting is also enabled, queues for project will
 * return the latest cached value (up to a expiry time limit) and schedule a new count to occur in a new thread. That
 * new thread will update the cache value when done, and subsequent update of the queue view, through polling or
 * refresh, will take that as the latest cache value. When no cache value, or it has expired, the queue count will be
 * blank. The queue count will still be specific to the agent viewing the queue, so any view restrictions will remain.
 * This setting is an option to try if would are having some performance issues, but do not want to turn queue count off
 * completely, and are happy with an approximate value.
 */
export async function setShouldQueuesUseCountCacheOnProject(
  client: Client,
  parameters: SetShouldQueuesUseCountCacheOnProject,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/admin/queues/${parameters.projectKey}/cache-count`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
