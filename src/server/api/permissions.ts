import { PermissionsJsonSchema, type PermissionsJson } from '../models/permissionsJson';
import type { GetPermissions } from '../parameters/getPermissions';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns all permissions in the system and whether the currently logged in user has them. You can optionally provide a
 * specific context to get permissions for (projectKey OR projectId OR issueKey OR issueId)
 */
export async function getPermissions(
  client: Client,
  parameters?: GetPermissions,
  options?: RequestOptions,
): Promise<PermissionsJson> {
  const config: SendRequestOptions<PermissionsJson> = {
    url: '/rest/api/2/mypermissions',
    method: 'GET',
    searchParams: {
      issueId: parameters?.issueId,
      projectKey: parameters?.projectKey,
      issueKey: parameters?.issueKey,
      projectId: parameters?.projectId,
    },
    schema: PermissionsJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all permissions that are present in the Jira instance - Global, Project and the global ones added by plugins */
export async function getAllPermissions(client: Client, options?: RequestOptions): Promise<PermissionsJson> {
  const config: SendRequestOptions<PermissionsJson> = {
    url: '/rest/api/2/permissions',
    method: 'GET',
    schema: PermissionsJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
