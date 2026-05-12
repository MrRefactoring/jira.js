import { ProjectRoleSchema, type ProjectRole } from '#/models/projectRole';
import { ProjectRoleDetailsSchema, type ProjectRoleDetails } from '#/models/projectRoleDetails';
import { type GetProjectRoles } from '#/parameters/getProjectRoles';
import { type GetProjectRole } from '#/parameters/getProjectRole';
import { type GetProjectRoleDetails } from '#/parameters/getProjectRoleDetails';
import { type CreateProjectRole } from '#/parameters/createProjectRole';
import { type GetProjectRoleById } from '#/parameters/getProjectRoleById';
import { type PartialUpdateProjectRole } from '#/parameters/partialUpdateProjectRole';
import { type FullyUpdateProjectRole } from '#/parameters/fullyUpdateProjectRole';
import { type DeleteProjectRole } from '#/parameters/deleteProjectRole';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a list of [project roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/)
 * for the project returning the name and self URL for each role.
 *
 * Note that all project roles are shared with all projects in Jira Cloud. See [Get all project
 * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) for more
 * information.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any project on the site or
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getProjectRoles(client: Client, parameters: GetProjectRoles): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/role`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * Returns a project role's details and actors associated with the project. The list of actors is sorted by display
 * name.
 *
 * To check whether a user belongs to a role based on their group memberships, use [Get
 * user](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user/#api-rest-api-3-user-get) with the
 * `groups` expand parameter selected. Then check whether the user keys and groups match with the actors returned for
 * the project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or _Administer
 * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getProjectRole(client: Client, parameters: GetProjectRole): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'GET',
    searchParams: {
      excludeInactiveUsers: parameters.excludeInactiveUsers,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all [project roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) and
 * the details for each role. Note that the list of project roles is common to all projects.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectRoleDetails(
  client: Client,
  parameters: GetProjectRoleDetails,
): Promise<ProjectRoleDetails[]> {
  const config: SendRequestOptions<ProjectRoleDetails[]> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/roledetails`,
    method: 'GET',
    searchParams: {
      currentMember: parameters.currentMember,
      excludeConnectAddons: parameters.excludeConnectAddons,
      excludeOtherServiceRoles: parameters.excludeOtherServiceRoles,
    },
    schema: z.array(ProjectRoleDetailsSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Gets a list of all project roles, complete with project role details and default actors.
 *
 * ### About project roles
 *
 * [Project roles](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) are a flexible
 * way to to associate users and groups with projects. In Jira Cloud, the list of project roles is shared globally with
 * all projects, but each project can have a different set of actors associated with it (unlike groups, which have the
 * same membership throughout all Jira applications).
 *
 * Project roles are used in [permission
 * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-rest-api-3-permissionscheme-get),
 * [email notification
 * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-notification-schemes/#api-rest-api-3-notificationscheme-get),
 * [issue security
 * levels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-rest-api-3-issuesecurityschemes-get),
 * [comment
 * visibility](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-comment/#api-rest-api-3-comment-list-post),
 * and workflow conditions.
 *
 * #### Members and actors
 *
 * In the Jira REST API, a member of a project role is called an _actor_. An _actor_ is a group or user associated with
 * a project role.
 *
 * Actors may be set as [default
 * members](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/#Specifying-'default-members'-for-a-project-role)
 * of the project role or set at the project level:
 *
 * - Default actors: Users and groups that are assigned to the project role for all newly created projects. The default
 *   actors can be removed at the project level later if desired.
 * - Actors: Users and groups that are associated with a project role for a project, which may differ from the default
 *   actors. This enables you to assign a user to different roles in different projects.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllProjectRoles(client: Client): Promise<ProjectRole[]> {
  const config: SendRequestOptions<ProjectRole[]> = {
    url: '/rest/api/3/role',
    method: 'GET',
    schema: z.array(ProjectRoleSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new project role with no [default
 * actors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-resolution/#api-rest-api-3-resolution-get).
 * You can use the [Add default actors to project
 * role](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-id-actors-post)
 * operation to add default actors to the project role after creating it.
 *
 * _Note that although a new project role is available to all projects upon creation, any default actors that are
 * associated with the project role are not added to projects that existed prior to the role being created._<
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createProjectRole(client: Client, parameters: CreateProjectRole): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: '/rest/api/3/role',
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Gets the project role details and the default actors associated with the role. The list of default actors is sorted
 * by display name.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getProjectRoleById(client: Client, parameters: GetProjectRoleById): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/role/${parameters.id}`,
    method: 'GET',
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates either the project role's name or its description.
 *
 * You cannot update both the name and description at the same time using this operation. If you send a request with a
 * name and a description only the name is updated.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function partialUpdateProjectRole(
  client: Client,
  parameters: PartialUpdateProjectRole,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/role/${parameters.id}`,
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the project role's name and description. You must include both a name and a description in the request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function fullyUpdateProjectRole(client: Client, parameters: FullyUpdateProjectRole): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/3/role/${parameters.id}`,
    method: 'PUT',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
    schema: ProjectRoleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in
 * use.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteProjectRole(client: Client, parameters: DeleteProjectRole): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/role/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      swap: parameters.swap,
    },
  };

  return await client.sendRequest(config);
}
