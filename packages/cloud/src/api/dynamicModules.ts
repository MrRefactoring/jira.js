import { ConnectModulesSchema, type ConnectModules } from '#/models/connectModules';
import { type RegisterModules } from '#/parameters/registerModules';
import { type RemoveModules } from '#/parameters/removeModules';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns all modules registered dynamically by the calling app.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect apps can make this request.
 */
export async function getModules(client: Client): Promise<ConnectModules> {
  const config: SendRequestOptions<ConnectModules> = {
    url: '/rest/atlassian-connect/1/app/module/dynamic',
    method: 'GET',
    schema: ConnectModulesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Registers a list of modules.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect apps can make this request.
 */
export async function registerModules(client: Client, parameters: RegisterModules): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/atlassian-connect/1/app/module/dynamic',
    method: 'POST',
    body: {
      modules: parameters.modules,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Remove all or a list of modules registered by the calling app.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect apps can make this request.
 */
export async function removeModules(client: Client, parameters: RemoveModules): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/atlassian-connect/1/app/module/dynamic',
    method: 'DELETE',
    searchParams: {
      moduleKey: parameters.moduleKey,
    },
  };

  return await client.sendRequest(config);
}
