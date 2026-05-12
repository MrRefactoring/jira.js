import { ProjectRoleSchema, type ProjectRole } from '#/models/projectRole';
import { type AddActorUsers } from '#/parameters/addActorUsers';
import { type SetActors } from '#/parameters/setActors';
import { type DeleteActor } from '#/parameters/deleteActor';
import { type GetProjectRoleActorsForRole } from '#/parameters/getProjectRoleActorsForRole';
import { type AddProjectRoleActorsToRole } from '#/parameters/addProjectRoleActorsToRole';
import { type DeleteProjectRoleActorsFromRole } from '#/parameters/deleteProjectRoleActorsFromRole';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Adds actors to a project role for the project.
 *
 * To replace all actors for the project, use [Set actors for project
 * role](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-role-id-put).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or _Administer
 * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addActorUsers(client: Client, parameters: AddActorUsers): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'POST',
    body: {
      group: parameters.group,
      groupId: parameters.groupId,
      user: parameters.user,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the actors for a project role for a project, replacing all existing actors.
 *
 * To add actors to the project without overwriting the existing list, use [Add actors to project
 * role](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-role-id-post).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or _Administer
 * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setActors(client: Client, parameters: SetActors): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'PUT',
    body: {
      categorisedActors: parameters.categorisedActors,
      id: parameters.id,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes actors from a project role for the project.
 *
 * To remove default actors from the project role, use [Delete default actors from project
 * role](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-id-actors-delete).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or _Administer
 * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteActor(client: Client, parameters: DeleteActor): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      user: parameters.user,
      group: parameters.group,
      groupId: parameters.groupId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the [default
 * actors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-resolution/#api-rest-api-3-resolution-get)
 * for the project role.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getProjectRoleActorsForRole(
  client: Client,
  parameters: GetProjectRoleActorsForRole,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/role/${parameters.id}/actors`,
    method: 'GET',
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds [default
 * actors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-resolution/#api-rest-api-3-resolution-get)
 * to a role. You may add groups or users, but you cannot add groups and users in the same request.
 *
 * Changing a project role's default actors does not affect project role members for projects already created.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addProjectRoleActorsToRole(
  client: Client,
  parameters: AddProjectRoleActorsToRole,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/role/${parameters.id}/actors`,
    method: 'POST',
    body: {
      group: parameters.group,
      groupId: parameters.groupId,
      user: parameters.user,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the [default
 * actors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-resolution/#api-rest-api-3-resolution-get)
 * from a project role. You may delete a group or user, but you cannot delete a group and a user in the same request.
 *
 * Changing a project role's default actors does not affect project role members for projects already created.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteProjectRoleActorsFromRole(
  client: Client,
  parameters: DeleteProjectRoleActorsFromRole,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/role/${parameters.id}/actors`,
    method: 'DELETE',
    searchParams: {
      user: parameters.user,
      groupId: parameters.groupId,
      group: parameters.group,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}
