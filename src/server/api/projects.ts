import { ProjectSchema, type Project } from '../models/project';
import { ProjectIdentitySchema, type ProjectIdentity } from '../models/projectIdentity';
import { ProjectTypeSchema, type ProjectType } from '../models/projectType';
import { AvatarSchema, type Avatar } from '../models/avatar';
import { GetAllProjectAvatarsSchema, type GetAllProjectAvatars } from '../models/getAllProjectAvatars';
import { ComponentSchema, type Component } from '../models/component';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import { GetProjectRolesSchema, type GetProjectRoles } from '../models/getProjectRoles';
import { ProjectRoleSchema, type ProjectRole } from '../models/projectRole';
import { IssueTypeWithStatusJsonSchema, type IssueTypeWithStatusJson } from '../models/issueTypeWithStatusJson';
import { PagedResultsSchema, type PagedResults } from '../models/pagedResults';
import { VersionSchema, type Version } from '../models/version';
import { SecuritySchemeJsonSchema, type SecuritySchemeJson } from '../models/securitySchemeJson';
import { NotificationSchemeSchema, type NotificationScheme } from '../models/notificationScheme';
import { PermissionSchemeSchema, type PermissionScheme } from '../models/permissionScheme';
import { PrioritySchemeSchema, type PriorityScheme } from '../models/priorityScheme';
import { SecurityListLevelJsonSchema, type SecurityListLevelJson } from '../models/securityListLevelJson';
import { WorkflowSchemeSchema, type WorkflowScheme } from '../models/workflowScheme';
import {
  ProjectPickerResultWrapperSchema,
  type ProjectPickerResultWrapper,
} from '../models/projectPickerResultWrapper';
import type { GetAllProjects } from '../parameters/getAllProjects';
import type { CreateProject } from '../parameters/createProject';
import type { GetProjectTypeByKey } from '../parameters/getProjectTypeByKey';
import type { GetAccessibleProjectTypeByKey } from '../parameters/getAccessibleProjectTypeByKey';
import type { GetProject } from '../parameters/getProject';
import type { UpdateProject } from '../parameters/updateProject';
import type { DeleteProject } from '../parameters/deleteProject';
import type { ArchiveProject } from '../parameters/archiveProject';
import type { CreateProjectAvatarFromTemporary } from '../parameters/createProjectAvatarFromTemporary';
import type { UpdateProjectAvatar } from '../parameters/updateProjectAvatar';
import type { StoreTemporaryProjectAvatarUsingMultiPart } from '../parameters/storeTemporaryProjectAvatarUsingMultiPart';
import type { DeleteProjectAvatar } from '../parameters/deleteProjectAvatar';
import type { GetAllProjectAvatars as GetAllProjectAvatarsParameters } from '../parameters/getAllProjectAvatars';
import type { GetProjectComponents } from '../parameters/getProjectComponents';
import type { GetProjectPropertyKeys } from '../parameters/getProjectPropertyKeys';
import type { GetProjectProperty } from '../parameters/getProjectProperty';
import type { SetProjectProperty } from '../parameters/setProjectProperty';
import type { DeleteProjectProperty } from '../parameters/deleteProjectProperty';
import type { RestoreProject } from '../parameters/restoreProject';
import type { GetProjectRoles as GetProjectRolesParameters } from '../parameters/getProjectRoles';
import type { GetProjectRole } from '../parameters/getProjectRole';
import type { AddActorUsers } from '../parameters/addActorUsers';
import type { SetActors } from '../parameters/setActors';
import type { DeleteActor } from '../parameters/deleteActor';
import type { GetAllStatuses } from '../parameters/getAllStatuses';
import type { UpdateProjectType } from '../parameters/updateProjectType';
import type { GetProjectVersionsPaginated } from '../parameters/getProjectVersionsPaginated';
import type { GetProjectVersions } from '../parameters/getProjectVersions';
import type { GetProjectIssueSecurityScheme } from '../parameters/getProjectIssueSecurityScheme';
import type { GetProjectNotificationScheme } from '../parameters/getProjectNotificationScheme';
import type { GetAssignedPermissionScheme } from '../parameters/getAssignedPermissionScheme';
import type { AssignPermissionScheme } from '../parameters/assignPermissionScheme';
import type { GetAssignedPriorityScheme } from '../parameters/getAssignedPriorityScheme';
import type { AssignPriorityScheme } from '../parameters/assignPriorityScheme';
import type { UnassignPriorityScheme } from '../parameters/unassignPriorityScheme';
import type { GetSecurityLevelsForProject } from '../parameters/getSecurityLevelsForProject';
import type { GetWorkflowSchemeForProject } from '../parameters/getWorkflowSchemeForProject';
import type { SearchForProjects } from '../parameters/searchForProjects';
import { type Client, type RequestOptions, type SendRequestOptions, toFormDataFile } from '#/core';
import { z } from 'zod';

/**
 * Returns all projects which are visible for the currently logged in user. If no user is logged in, it returns the list
 * of projects that are visible when using anonymous access.
 */
export async function getAllProjects(
  client: Client,
  parameters?: GetAllProjects,
  options?: RequestOptions,
): Promise<Project[]> {
  const config: SendRequestOptions<Project[]> = {
    url: '/rest/api/2/project',
    method: 'GET',
    searchParams: {
      includeArchived: parameters?.includeArchived,
      expand: parameters?.expand,
      recent: parameters?.recent,
      browseArchive: parameters?.browseArchive,
    },
    schema: z.array(ProjectSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Creates a new project */
export async function createProject(
  client: Client,
  parameters: CreateProject,
  options?: RequestOptions,
): Promise<ProjectIdentity> {
  const config: SendRequestOptions<ProjectIdentity> = {
    url: '/rest/api/2/project',
    method: 'POST',
    body: {
      assigneeType: parameters.assigneeType,
      avatarId: parameters.avatarId,
      categoryId: parameters.categoryId,
      description: parameters.description,
      issueSecurityScheme: parameters.issueSecurityScheme,
      key: parameters.key,
      lead: parameters.lead,
      name: parameters.name,
      notificationScheme: parameters.notificationScheme,
      permissionScheme: parameters.permissionScheme,
      projectTemplateKey: parameters.projectTemplateKey,
      projectTypeKey: parameters.projectTypeKey,
      url: parameters.url,
      workflowSchemeId: parameters.workflowSchemeId,
    },
    schema: ProjectIdentitySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all the project types defined on the Jira instance, not taking into account whether the license to use those
 * project types is valid or not. In case of anonymous checks if they can access at least one project.
 */
export async function getAllProjectTypes(client: Client, options?: RequestOptions): Promise<ProjectType[]> {
  const config: SendRequestOptions<ProjectType[]> = {
    url: '/rest/api/2/project/type',
    method: 'GET',
    schema: z.array(ProjectTypeSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the project type with the given key. In case of anonymous checks if they can access at least one project. */
export async function getProjectTypeByKey(
  client: Client,
  parameters: GetProjectTypeByKey,
  options?: RequestOptions,
): Promise<ProjectType> {
  const config: SendRequestOptions<ProjectType> = {
    url: `/rest/api/2/project/type/${parameters.projectTypeKey}`,
    method: 'GET',
    schema: ProjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the project type with the given key, if it is accessible to the logged in user. This takes into account
 * whether the user is licensed on the Application that defines the project type.
 */
export async function getAccessibleProjectTypeByKey(
  client: Client,
  parameters: GetAccessibleProjectTypeByKey,
  options?: RequestOptions,
): Promise<ProjectType> {
  const config: SendRequestOptions<ProjectType> = {
    url: `/rest/api/2/project/type/${parameters.projectTypeKey}/accessible`,
    method: 'GET',
    schema: ProjectTypeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a full representation of a project in JSON format. All project keys associated with the project will only be
 * returned if `expand=projectKeys`.
 */
export async function getProject(client: Client, parameters: GetProject, options?: RequestOptions): Promise<Project> {
  const config: SendRequestOptions<Project> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: ProjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a project. Only non null values sent in JSON will be updated in the project. Values available for the
 * assigneeType field are: "PROJECT_LEAD" and "UNASSIGNED".
 */
export async function updateProject(
  client: Client,
  parameters: UpdateProject,
  options?: RequestOptions,
): Promise<Project> {
  const config: SendRequestOptions<Project> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      assigneeType: parameters.assigneeType,
      avatarId: parameters.avatarId,
      categoryId: parameters.categoryId,
      description: parameters.description,
      issueSecurityScheme: parameters.issueSecurityScheme,
      key: parameters.key,
      lead: parameters.lead,
      name: parameters.name,
      notificationScheme: parameters.notificationScheme,
      permissionScheme: parameters.permissionScheme,
      projectTemplateKey: parameters.projectTemplateKey,
      projectTypeKey: parameters.projectTypeKey,
      url: parameters.url,
    },
    schema: ProjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes a project */
export async function deleteProject(
  client: Client,
  parameters: DeleteProject,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Archives a project */
export async function archiveProject(
  client: Client,
  parameters: ArchiveProject,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/archive`,
    method: 'PUT',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Converts the temporary avatar into the final one. This is step 2/3 of changing an avatar for a project:
 *
 * - Upload (store temporary avatar)
 * - Crop (create avatar from temporary)
 * - Update (update project avatar)
 */
export async function createProjectAvatarFromTemporary(
  client: Client,
  parameters: CreateProjectAvatarFromTemporary,
  options?: RequestOptions,
): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar`,
    method: 'POST',
    body: {
      cropperOffsetX: parameters.cropperOffsetX,
      cropperOffsetY: parameters.cropperOffsetY,
      cropperWidth: parameters.cropperWidth,
      needsCropping: parameters.needsCropping,
      url: parameters.url,
    },
    schema: AvatarSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates an avatar for a project. This is step 3/3 of changing an avatar for a project. */
export async function updateProjectAvatar(
  client: Client,
  parameters: UpdateProjectAvatar,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar`,
    method: 'PUT',
    body: {
      id: parameters.id,
      owner: parameters.owner,
      selected: parameters.selected,
      isSelected: parameters.isSelected,
      isSystemAvatar: parameters.isSystemAvatar,
      isDeletable: parameters.isDeletable,
      fileName: parameters.fileName,
      urls: parameters.urls,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates temporary avatar using multipart. The response is sent back as JSON stored in a textarea. This is because the
 * client uses remote iframing to submit avatars using multipart. So we must send them a valid HTML page back from which
 * the client parses the JSON.
 */
export async function storeTemporaryProjectAvatarUsingMultiPart(
  client: Client,
  parameters: StoreTemporaryProjectAvatarUsingMultiPart,
  options?: RequestOptions,
): Promise<unknown> {
  const formData = new FormData();
  const items = Array.isArray(parameters.avatar) ? parameters.avatar : [parameters.avatar];

  for (const attachment of items) {
    formData.append('avatar', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar/temporary`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes avatar */
export async function deleteProjectAvatar(
  client: Client,
  parameters: DeleteProjectAvatar,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all avatars which are visible for the currently logged in user. The avatars are grouped into system and
 * custom.
 */
export async function getAllProjectAvatars(
  client: Client,
  parameters: GetAllProjectAvatarsParameters,
  options?: RequestOptions,
): Promise<GetAllProjectAvatars> {
  const config: SendRequestOptions<GetAllProjectAvatars> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatars`,
    method: 'GET',
    schema: GetAllProjectAvatarsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Contains a full representation of the specified project's components. */
export async function getProjectComponents(
  client: Client,
  parameters: GetProjectComponents,
  options?: RequestOptions,
): Promise<Component[]> {
  const config: SendRequestOptions<Component[]> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/components`,
    method: 'GET',
    schema: z.array(ComponentSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the keys of all properties for the project identified by the key or by the id. */
export async function getProjectPropertyKeys(
  client: Client,
  parameters: GetProjectPropertyKeys,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the value of the property with a given key from the project identified by the key or by the id. */
export async function getProjectProperty(
  client: Client,
  parameters: GetProjectProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the specified project's property. You can use this resource to store a custom data against the
 * project identified by the key or by the id. The user who stores the data is required to have permissions to
 * administer the project.
 */
export async function setProjectProperty(
  client: Client,
  parameters: SetProjectProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Removes the property from the project identified by the key or by the id. */
export async function deleteProjectProperty(
  client: Client,
  parameters: DeleteProjectProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Restores an archived project. In case of success restored project should be re-indexed. */
export async function restoreProject(
  client: Client,
  parameters: RestoreProject,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/restore`,
    method: 'PUT',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all roles in the given project Id or key, with links to full details on each role. */
export async function getProjectRoles(
  client: Client,
  parameters: GetProjectRolesParameters,
  options?: RequestOptions,
): Promise<GetProjectRoles> {
  const config: SendRequestOptions<GetProjectRoles> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/role`,
    method: 'GET',
    schema: GetProjectRolesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the details for a given project role in a project. */
export async function getProjectRole(
  client: Client,
  parameters: GetProjectRole,
  options?: RequestOptions,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'GET',
    schema: ProjectRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Adds an actor (user or group) to a project role. For user actors, their usernames should be used. */
export async function addActorUsers(
  client: Client,
  parameters: AddActorUsers,
  options?: RequestOptions,
): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'POST',
    body: {
      user: parameters.user,
      group: parameters.group,
    },
    schema: ProjectRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a project role to include the specified actors (users or groups). Can be also used to clear roles to not
 * include any users or groups. For user actors, their usernames should be used.
 */
export async function setActors(client: Client, parameters: SetActors, options?: RequestOptions): Promise<ProjectRole> {
  const config: SendRequestOptions<ProjectRole> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: ProjectRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes actors (users or groups) from a project role. */
export async function deleteActor(client: Client, parameters: DeleteActor, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      user: parameters.user,
      group: parameters.group,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get all issue types with valid status values for a project */
export async function getAllStatuses(
  client: Client,
  parameters: GetAllStatuses,
  options?: RequestOptions,
): Promise<IssueTypeWithStatusJson[]> {
  const config: SendRequestOptions<IssueTypeWithStatusJson[]> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/statuses`,
    method: 'GET',
    schema: z.array(IssueTypeWithStatusJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates the type of a project */
export async function updateProjectType(
  client: Client,
  parameters: UpdateProjectType,
  options?: RequestOptions,
): Promise<Project> {
  const config: SendRequestOptions<Project> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/type/${parameters.newProjectTypeKey}`,
    method: 'PUT',
    schema: ProjectSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all versions for the specified project. Results are paginated. Results can be ordered by the following
 * fields: sequence, name, startDate, releaseDate.
 */
export async function getProjectVersionsPaginated(
  client: Client,
  parameters: GetProjectVersionsPaginated,
  options?: RequestOptions,
): Promise<PagedResults> {
  const config: SendRequestOptions<PagedResults> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/version`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      maxResults: parameters.maxResults,
      orderBy: parameters.orderBy,
      startAt: parameters.startAt,
    },
    schema: PagedResultsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Contains a full representation of a the specified project's versions. */
export async function getProjectVersions(
  client: Client,
  parameters: GetProjectVersions,
  options?: RequestOptions,
): Promise<Version[]> {
  const config: SendRequestOptions<Version[]> = {
    url: `/rest/api/2/project/${parameters.projectIdOrKey}/versions`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: z.array(VersionSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the issue security scheme for project. */
export async function getProjectIssueSecurityScheme(
  client: Client,
  parameters: GetProjectIssueSecurityScheme,
  options?: RequestOptions,
): Promise<SecuritySchemeJson> {
  const config: SendRequestOptions<SecuritySchemeJson> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
    method: 'GET',
    schema: SecuritySchemeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Gets a notification scheme associated with the project. Follow the documentation of /notificationscheme/{id} resource
 * for all details about returned value.
 */
export async function getProjectNotificationScheme(
  client: Client,
  parameters: GetProjectNotificationScheme,
  options?: RequestOptions,
): Promise<NotificationScheme> {
  const config: SendRequestOptions<NotificationScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/notificationscheme`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: NotificationSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Gets a permission scheme assigned with a project */
export async function getAssignedPermissionScheme(
  client: Client,
  parameters: GetAssignedPermissionScheme,
  options?: RequestOptions,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: PermissionSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Assigns a permission scheme with a project */
export async function assignPermissionScheme(
  client: Client,
  parameters: AssignPermissionScheme,
  options?: RequestOptions,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      id: parameters.id,
    },
    schema: PermissionSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Gets a full representation of a priority scheme in JSON format used by specified project. User must be global
 * administrator or project administrator. All project keys associated with the priority scheme will only be returned if
 * additional query parameter is provided expand=projectKeys.
 */
export async function getAssignedPriorityScheme(
  client: Client,
  parameters: GetAssignedPriorityScheme,
  options?: RequestOptions,
): Promise<PriorityScheme> {
  const config: SendRequestOptions<PriorityScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/priorityscheme`,
    method: 'GET',
    schema: PrioritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Assigns project with priority scheme. Priority scheme assign with migration is possible from the UI. Operation will
 * fail if migration is needed as a result of operation eg. there are issues with priorities invalid in the destination
 * scheme. All project keys associated with the priority scheme will only be returned if additional query parameter is
 * provided expand=projectKeys.
 */
export async function assignPriorityScheme(
  client: Client,
  parameters: AssignPriorityScheme,
  options?: RequestOptions,
): Promise<PriorityScheme> {
  const config: SendRequestOptions<PriorityScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/priorityscheme`,
    method: 'PUT',
    body: {
      id: parameters.id,
    },
    schema: PrioritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Unassigns project from priority scheme. Operation will fail for defualt priority scheme, project is not found or
 * project is not associated with provided priority scheme. All project keys associated with the priority scheme will
 * only be returned if additional query parameter is provided expand=projectKeys.
 */
export async function unassignPriorityScheme(
  client: Client,
  parameters: UnassignPriorityScheme,
  options?: RequestOptions,
): Promise<PriorityScheme> {
  const config: SendRequestOptions<PriorityScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/priorityscheme/${parameters.schemeId}`,
    method: 'DELETE',
    schema: PrioritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all security levels for the project that the current logged in user has access to. If the user does not have
 * the Set Issue Security permission, the list will be empty.
 */
export async function getSecurityLevelsForProject(
  client: Client,
  parameters: GetSecurityLevelsForProject,
  options?: RequestOptions,
): Promise<SecurityListLevelJson> {
  const config: SendRequestOptions<SecurityListLevelJson> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/securitylevel`,
    method: 'GET',
    schema: SecurityListLevelJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the workflow scheme that is associated with requested project. */
export async function getWorkflowSchemeForProject(
  client: Client,
  parameters: GetWorkflowSchemeForProject,
  options?: RequestOptions,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/project/${parameters.projectKeyOrId}/workflowscheme`,
    method: 'GET',
    schema: WorkflowSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of projects visible to the user where project name and/or key is matching the given query. Passing an
 * empty (or whitespace only) query will match no projects. The project matches will contain a field with the query
 * highlighted. The number of projects returned can be controlled by passing a value for 'maxResults', but a hard limit
 * of no more than 100 projects is enforced. The projects are wrapped in a single response object that contains a header
 * for use in the picker, specifically 'Showing X of Y matching projects' and the total number of matches for the
 * query.
 */
export async function searchForProjects(
  client: Client,
  parameters?: SearchForProjects,
  options?: RequestOptions,
): Promise<ProjectPickerResultWrapper> {
  const config: SendRequestOptions<ProjectPickerResultWrapper> = {
    url: '/rest/api/2/projects/picker',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      allowEmptyQuery: parameters?.allowEmptyQuery,
    },
    schema: ProjectPickerResultWrapperSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
