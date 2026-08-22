import { ProjectCategorySchema, type ProjectCategory } from '../models/projectCategory';
import { UpdatedProjectCategorySchema, type UpdatedProjectCategory } from '../models/updatedProjectCategory';
import type { CreateProjectCategory } from '../parameters/createProjectCategory';
import type { GetProjectCategoryById } from '../parameters/getProjectCategoryById';
import type { UpdateProjectCategory } from '../parameters/updateProjectCategory';
import type { RemoveProjectCategory } from '../parameters/removeProjectCategory';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns all project categories.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getAllProjectCategories(client: Client, options?: RequestOptions): Promise<ProjectCategory[]> {
  const config: SendRequestOptions<ProjectCategory[]> = {
    url: '/rest/api/3/projectCategory',
    method: 'GET',
    schema: z.array(ProjectCategorySchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a project category.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createProjectCategory(
  client: Client,
  parameters: CreateProjectCategory,
  options?: RequestOptions,
): Promise<ProjectCategory> {
  const config: SendRequestOptions<ProjectCategory> = {
    url: '/rest/api/3/projectCategory',
    method: 'POST',
    body: {
      description: parameters.description,
      id: parameters.id,
      name: parameters.name,
      self: parameters.self,
    },
    schema: ProjectCategorySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a project category.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function getProjectCategoryById(
  client: Client,
  parameters: GetProjectCategoryById,
  options?: RequestOptions,
): Promise<ProjectCategory> {
  const config: SendRequestOptions<ProjectCategory> = {
    url: `/rest/api/3/projectCategory/${parameters.id}`,
    method: 'GET',
    schema: ProjectCategorySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a project category.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateProjectCategory(
  client: Client,
  parameters: UpdateProjectCategory,
  options?: RequestOptions,
): Promise<UpdatedProjectCategory> {
  const config: SendRequestOptions<UpdatedProjectCategory> = {
    url: `/rest/api/3/projectCategory/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: UpdatedProjectCategorySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a project category.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeProjectCategory(
  client: Client,
  parameters: RemoveProjectCategory,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/projectCategory/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
