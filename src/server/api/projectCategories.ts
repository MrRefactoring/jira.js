import { ProjectCategoryJsonSchema, type ProjectCategoryJson } from '../models/projectCategoryJson';
import type { CreateProjectCategory } from '../parameters/createProjectCategory';
import type { GetProjectCategoryById } from '../parameters/getProjectCategoryById';
import type { UpdateProjectCategory } from '../parameters/updateProjectCategory';
import type { RemoveProjectCategory } from '../parameters/removeProjectCategory';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns all project categories */
export async function getAllProjectCategories(
  client: Client,
  options?: RequestOptions,
): Promise<ProjectCategoryJson[]> {
  const config: SendRequestOptions<ProjectCategoryJson[]> = {
    url: '/rest/api/2/projectCategory',
    method: 'GET',
    schema: z.array(ProjectCategoryJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a project category. */
export async function createProjectCategory(
  client: Client,
  parameters: CreateProjectCategory,
  options?: RequestOptions,
): Promise<ProjectCategoryJson> {
  const config: SendRequestOptions<ProjectCategoryJson> = {
    url: '/rest/api/2/projectCategory',
    method: 'POST',
    body: {
      description: parameters.description,
      id: parameters.id,
      name: parameters.name,
      self: parameters.self,
    },
    schema: ProjectCategoryJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the project category that has the given id. */
export async function getProjectCategoryById(
  client: Client,
  parameters: GetProjectCategoryById,
  options?: RequestOptions,
): Promise<ProjectCategoryJson> {
  const config: SendRequestOptions<ProjectCategoryJson> = {
    url: `/rest/api/2/projectCategory/${parameters.id}`,
    method: 'GET',
    schema: ProjectCategoryJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Modify a project category. */
export async function updateProjectCategory(
  client: Client,
  parameters: UpdateProjectCategory,
  options?: RequestOptions,
): Promise<ProjectCategoryJson> {
  const config: SendRequestOptions<ProjectCategoryJson> = {
    url: `/rest/api/2/projectCategory/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ProjectCategoryJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete a project category. */
export async function removeProjectCategory(
  client: Client,
  parameters: RemoveProjectCategory,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/projectCategory/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
