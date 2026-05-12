import { ProjectTypeSchema, type ProjectType } from '#/models/projectType';
import { type GetProjectTypeByKey } from '#/parameters/getProjectTypeByKey';
import { type GetAccessibleProjectTypeByKey } from '#/parameters/getAccessibleProjectTypeByKey';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns all [project types](https://confluence.atlassian.com/x/Var1Nw), whether or not the instance has a valid
 * license for each type.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAllProjectTypes(client: Client): Promise<ProjectType[]> {
  const config: SendRequestOptions<ProjectType[]> = {
    url: '/rest/api/3/project/type',
    method: 'GET',
    schema: z.array(ProjectTypeSchema),
  };

  return await client.sendRequest(config);
}

/** Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a valid license. */
export async function getAllAccessibleProjectTypes(client: Client): Promise<ProjectType[]> {
  const config: SendRequestOptions<ProjectType[]> = {
    url: '/rest/api/3/project/type/accessible',
    method: 'GET',
    schema: z.array(ProjectTypeSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getProjectTypeByKey(client: Client, parameters: GetProjectTypeByKey): Promise<ProjectType> {
  const config: SendRequestOptions<ProjectType> = {
    url: `/rest/api/3/project/type/${parameters.projectTypeKey}`,
    method: 'GET',
    schema: ProjectTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw) if it is accessible to the user.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getAccessibleProjectTypeByKey(
  client: Client,
  parameters: GetAccessibleProjectTypeByKey,
): Promise<ProjectType> {
  const config: SendRequestOptions<ProjectType> = {
    url: `/rest/api/3/project/type/${parameters.projectTypeKey}/accessible`,
    method: 'GET',
    schema: ProjectTypeSchema,
  };

  return await client.sendRequest(config);
}
