import { PageIssueTypeSchemeSchema, type PageIssueTypeScheme } from '#/models/pageIssueTypeScheme';
import { IssueTypeSchemeIDSchema, type IssueTypeSchemeID } from '#/models/issueTypeSchemeID';
import { PageIssueTypeSchemeMappingSchema, type PageIssueTypeSchemeMapping } from '#/models/pageIssueTypeSchemeMapping';
import {
  PageIssueTypeSchemeProjectsSchema,
  type PageIssueTypeSchemeProjects,
} from '#/models/pageIssueTypeSchemeProjects';
import { type GetAllIssueTypeSchemes } from '#/parameters/getAllIssueTypeSchemes';
import { type CreateIssueTypeScheme } from '#/parameters/createIssueTypeScheme';
import { type GetIssueTypeSchemesMapping } from '#/parameters/getIssueTypeSchemesMapping';
import { type GetIssueTypeSchemeForProjects } from '#/parameters/getIssueTypeSchemeForProjects';
import { type AssignIssueTypeSchemeToProject } from '#/parameters/assignIssueTypeSchemeToProject';
import { type UpdateIssueTypeScheme } from '#/parameters/updateIssueTypeScheme';
import { type DeleteIssueTypeScheme } from '#/parameters/deleteIssueTypeScheme';
import { type AddIssueTypesToIssueTypeScheme } from '#/parameters/addIssueTypesToIssueTypeScheme';
import { type ReorderIssueTypesInIssueTypeScheme } from '#/parameters/reorderIssueTypesInIssueTypeScheme';
import { type RemoveIssueTypeFromIssueTypeScheme } from '#/parameters/removeIssueTypeFromIssueTypeScheme';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of issue
 * type schemes.
 *
 * Only issue type schemes used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllIssueTypeSchemes(
  client: Client,
  parameters?: GetAllIssueTypeSchemes,
): Promise<PageIssueTypeScheme> {
  const config: SendRequestOptions<PageIssueTypeScheme> = {
    url: '/rest/api/3/issuetypescheme',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      orderBy: parameters?.orderBy,
      expand: parameters?.expand,
      queryString: parameters?.queryString,
    },
    schema: PageIssueTypeSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue type scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createIssueTypeScheme(
  client: Client,
  parameters: CreateIssueTypeScheme,
): Promise<IssueTypeSchemeID> {
  const config: SendRequestOptions<IssueTypeSchemeID> = {
    url: '/rest/api/3/issuetypescheme',
    method: 'POST',
    body: {
      defaultIssueTypeId: parameters.defaultIssueTypeId,
      description: parameters.description,
      issueTypeIds: parameters.issueTypeIds,
      name: parameters.name,
    },
    schema: IssueTypeSchemeIDSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of issue
 * type scheme items.
 *
 * Only issue type scheme items used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueTypeSchemesMapping(
  client: Client,
  parameters?: GetIssueTypeSchemesMapping,
): Promise<PageIssueTypeSchemeMapping> {
  const config: SendRequestOptions<PageIssueTypeSchemeMapping> = {
    url: '/rest/api/3/issuetypescheme/mapping',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      issueTypeSchemeId: parameters?.issueTypeSchemeId,
    },
    schema: PageIssueTypeSchemeMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of issue
 * type schemes and, for each issue type scheme, a list of the projects that use it.
 *
 * Only issue type schemes used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueTypeSchemeForProjects(
  client: Client,
  parameters: GetIssueTypeSchemeForProjects,
): Promise<PageIssueTypeSchemeProjects> {
  const config: SendRequestOptions<PageIssueTypeSchemeProjects> = {
    url: '/rest/api/3/issuetypescheme/project',
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      projectId: parameters.projectId,
    },
    schema: PageIssueTypeSchemeProjectsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Assigns an issue type scheme to a project.
 *
 * If any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To
 * complete the assignment those issues must be updated to use issue types in the new scheme.
 *
 * Issue type schemes can only be assigned to classic projects.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function assignIssueTypeSchemeToProject(
  client: Client,
  parameters: AssignIssueTypeSchemeToProject,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/issuetypescheme/project',
    method: 'PUT',
    body: {
      issueTypeSchemeId: parameters.issueTypeSchemeId,
      projectId: parameters.projectId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates an issue type scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateIssueTypeScheme(client: Client, parameters: UpdateIssueTypeScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
    method: 'PUT',
    body: {
      defaultIssueTypeId: parameters.defaultIssueTypeId,
      description: parameters.description,
      name: parameters.name,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue type scheme.
 *
 * Only issue type schemes used in classic projects can be deleted. Only issue type schemes not associated with a
 * project can be deleted
 *
 * A validation error will be returned if the specified scheme is associated with one or more projects. Use [Get issue
 * type scheme
 * API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-get)
 * (with the projects expand, and id query parameter) to get a list of projects. Then, use [Assign issue type scheme to
 * project
 * API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-project-put)
 * to associate all projects to another scheme before deleting.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteIssueTypeScheme(client: Client, parameters: DeleteIssueTypeScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Adds issue types to an issue type scheme.
 *
 * The added issue types are appended to the issue types list.
 *
 * If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function addIssueTypesToIssueTypeScheme(
  client: Client,
  parameters: AddIssueTypesToIssueTypeScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
    method: 'PUT',
    body: {
      issueTypeIds: parameters.issueTypeIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Changes the order of issue types in an issue type scheme.
 *
 * The request body parameters must meet the following requirements:
 *
 * - All of the issue types must belong to the issue type scheme.
 * - Either `after` or `position` must be provided.
 * - The issue type in `after` must not be in the issue type list.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function reorderIssueTypesInIssueTypeScheme(
  client: Client,
  parameters: ReorderIssueTypesInIssueTypeScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
    method: 'PUT',
    body: {
      after: parameters.after,
      issueTypeIds: parameters.issueTypeIds,
      position: parameters.position,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes an issue type from an issue type scheme.
 *
 * This operation cannot remove:
 *
 * - Any issue type used by issues.
 * - Any issue types from the default issue type scheme.
 * - The last standard issue type from an issue type scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeIssueTypeFromIssueTypeScheme(
  client: Client,
  parameters: RemoveIssueTypeFromIssueTypeScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
