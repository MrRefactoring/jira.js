import { ErrorCollectionSchema, type ErrorCollection } from '#/models/errorCollection';
import { type ValidateProjectKey } from '#/parameters/validateProjectKey';
import { type GetValidProjectKey } from '#/parameters/getValidProjectKey';
import { type GetValidProjectName } from '#/parameters/getValidProjectName';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Validates a project key by confirming the key is a valid string and not in use.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function validateProjectKey(client: Client, parameters?: ValidateProjectKey): Promise<ErrorCollection> {
  const config: SendRequestOptions<ErrorCollection> = {
    url: '/rest/api/3/projectvalidate/key',
    method: 'GET',
    searchParams: {
      key: parameters?.key,
    },
    schema: ErrorCollectionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Validates a project key and, if the key is invalid or in use, generates a valid random string for the project key.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getValidProjectKey(client: Client, parameters?: GetValidProjectKey): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: '/rest/api/3/projectvalidate/validProjectKey',
    method: 'GET',
    searchParams: {
      key: parameters?.key,
    },
    schema: z.string(),
  };

  return await client.sendRequest(config);
}

/**
 * Checks that a project name isn't in use. If the name isn't in use, the passed string is returned. If the name is in
 * use, this operation attempts to generate a valid project name based on the one supplied, usually by adding a sequence
 * number. If a valid project name cannot be generated, a 404 response is returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getValidProjectName(client: Client, parameters: GetValidProjectName): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: '/rest/api/3/projectvalidate/validProjectName',
    method: 'GET',
    searchParams: {
      name: parameters.name,
    },
    schema: z.string(),
  };

  return await client.sendRequest(config);
}
