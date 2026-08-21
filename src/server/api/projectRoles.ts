import { ProjectRoleSchema, type ProjectRole } from '../models/projectRole';
import { ProjectRoleActorsSchema, type ProjectRoleActors } from '../models/projectRoleActors';
import type { CreateProjectRole } from '../parameters/createProjectRole';
import type { GetProjectRolesById } from '../parameters/getProjectRolesById';
import type { PartialUpdateProjectRole } from '../parameters/partialUpdateProjectRole';
import type { FullyUpdateProjectRole } from '../parameters/fullyUpdateProjectRole';
import type { DeleteProjectRole } from '../parameters/deleteProjectRole';
import type { GetProjectRoleActorsForRole } from '../parameters/getProjectRoleActorsForRole';
import type { AddProjectRoleActorsToRole } from '../parameters/addProjectRoleActorsToRole';
import type { DeleteProjectRoleActorsFromRole } from '../parameters/deleteProjectRoleActorsFromRole';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Get all the ProjectRoles available in Jira. Currently this list is global. */
export async function getAllProjectRoles(client: Client): Promise<ProjectRole[]> {
  const config: SendRequestOptions<ProjectRole[]> = {
    url: '/rest/api/2/role',
    method: 'GET',
    schema: z.array(ProjectRoleSchema),
  };

  return await client.sendRequest(config);
}

/** Creates a new ProjectRole to be available in Jira. The created role does not have any default actors assigned. */
export async function createProjectRole(client: Client, parameters: CreateProjectRole): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: '/rest/api/2/role',
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/** Get a specific ProjectRole available in Jira. */
export async function getProjectRolesById(client: Client, parameters: GetProjectRolesById): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/2/role/${parameters.id}`,
    method: 'GET',
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/** Partially updates a roles name or description. */
export async function partialUpdateProjectRole(
  client: Client,
  parameters: PartialUpdateProjectRole,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/2/role/${parameters.id}`,
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/** Fully updates a roles. Both name and description must be given. */
export async function fullyUpdateProjectRole(client: Client, parameters: FullyUpdateProjectRole): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/2/role/${parameters.id}`,
    method: 'PUT',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes a role. May return 403 in the future */
export async function deleteProjectRole(client: Client, parameters: DeleteProjectRole): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/role/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      swap: parameters.swap,
    },
  };

  return await client.sendRequest(config);
}

/** Gets default actors for the given role. */
export async function getProjectRoleActorsForRole(
  client: Client,
  parameters: GetProjectRoleActorsForRole,
): Promise<ProjectRoleActors> {
  const config: SendRequestOptions<ProjectRoleActors> = {
    url: `/rest/api/2/role/${parameters.id}/actors`,
    method: 'GET',
    schema: ProjectRoleActorsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds default actors to the given role. The request data should contain a list of usernames or a list of groups to
 * add.
 */
export async function addProjectRoleActorsToRole(
  client: Client,
  parameters: AddProjectRoleActorsToRole,
): Promise<ProjectRoleActors> {
  const config: SendRequestOptions<ProjectRoleActors> = {
    url: `/rest/api/2/role/${parameters.id}/actors`,
    method: 'POST',
    body: {
      group: parameters.group,
      user: parameters.user,
    },
    schema: ProjectRoleActorsSchema,
  };

  return await client.sendRequest(config);
}

/** Removes default actor from the given role. */
export async function deleteProjectRoleActorsFromRole(
  client: Client,
  parameters: DeleteProjectRoleActorsFromRole,
): Promise<ProjectRoleActors> {
  const config: SendRequestOptions<ProjectRoleActors> = {
    url: `/rest/api/2/role/${parameters.id}/actors`,
    method: 'DELETE',
    searchParams: {
      user: parameters.user,
      group: parameters.group,
    },
    schema: ProjectRoleActorsSchema,
  };

  return await client.sendRequest(config);
}
