import { PageIssueTypeScreenSchemeSchema, type PageIssueTypeScreenScheme } from '#/models/pageIssueTypeScreenScheme';
import { IssueTypeScreenSchemeIdSchema, type IssueTypeScreenSchemeId } from '#/models/issueTypeScreenSchemeId';
import {
  PageIssueTypeScreenSchemeItemSchema,
  type PageIssueTypeScreenSchemeItem,
} from '#/models/pageIssueTypeScreenSchemeItem';
import {
  PageIssueTypeScreenSchemesProjectsSchema,
  type PageIssueTypeScreenSchemesProjects,
} from '#/models/pageIssueTypeScreenSchemesProjects';
import { PageProjectDetailsSchema, type PageProjectDetails } from '#/models/pageProjectDetails';
import { type GetIssueTypeScreenSchemes } from '#/parameters/getIssueTypeScreenSchemes';
import { type CreateIssueTypeScreenScheme } from '#/parameters/createIssueTypeScreenScheme';
import { type GetIssueTypeScreenSchemeMappings } from '#/parameters/getIssueTypeScreenSchemeMappings';
import { type GetIssueTypeScreenSchemeProjectAssociations } from '#/parameters/getIssueTypeScreenSchemeProjectAssociations';
import { type AssignIssueTypeScreenSchemeToProject } from '#/parameters/assignIssueTypeScreenSchemeToProject';
import { type UpdateIssueTypeScreenScheme } from '#/parameters/updateIssueTypeScreenScheme';
import { type DeleteIssueTypeScreenScheme } from '#/parameters/deleteIssueTypeScreenScheme';
import { type AppendMappingsForIssueTypeScreenScheme } from '#/parameters/appendMappingsForIssueTypeScreenScheme';
import { type UpdateDefaultScreenScheme } from '#/parameters/updateDefaultScreenScheme';
import { type RemoveMappingsFromIssueTypeScreenScheme } from '#/parameters/removeMappingsFromIssueTypeScreenScheme';
import { type GetProjectsForIssueTypeScreenScheme } from '#/parameters/getProjectsForIssueTypeScreenScheme';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of issue
 * type screen schemes.
 *
 * Only issue type screen schemes used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueTypeScreenSchemes(
  client: Client,
  parameters?: GetIssueTypeScreenSchemes,
): Promise<PageIssueTypeScreenScheme> {
  const config: SendRequestOptions<PageIssueTypeScreenScheme> = {
    url: '/rest/api/3/issuetypescreenscheme',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      id: parameters?.id,
      queryString: parameters?.queryString,
      orderBy: parameters?.orderBy,
      expand: parameters?.expand,
    },
    schema: PageIssueTypeScreenSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue type screen scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createIssueTypeScreenScheme(
  client: Client,
  parameters: CreateIssueTypeScreenScheme,
): Promise<IssueTypeScreenSchemeId> {
  const config: SendRequestOptions<IssueTypeScreenSchemeId> = {
    url: '/rest/api/3/issuetypescreenscheme',
    method: 'POST',
    body: {
      description: parameters.description,
      issueTypeMappings: parameters.issueTypeMappings,
      name: parameters.name,
    },
    schema: IssueTypeScreenSchemeIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of issue
 * type screen scheme items.
 *
 * Only issue type screen schemes used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueTypeScreenSchemeMappings(
  client: Client,
  parameters?: GetIssueTypeScreenSchemeMappings,
): Promise<PageIssueTypeScreenSchemeItem> {
  const config: SendRequestOptions<PageIssueTypeScreenSchemeItem> = {
    url: '/rest/api/3/issuetypescreenscheme/mapping',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
    },
    schema: PageIssueTypeScreenSchemeItemSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of issue
 * type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
 *
 * Only issue type screen schemes used in classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueTypeScreenSchemeProjectAssociations(
  client: Client,
  parameters: GetIssueTypeScreenSchemeProjectAssociations,
): Promise<PageIssueTypeScreenSchemesProjects> {
  const config: SendRequestOptions<PageIssueTypeScreenSchemesProjects> = {
    url: '/rest/api/3/issuetypescreenscheme/project',
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      projectId: parameters.projectId,
    },
    schema: PageIssueTypeScreenSchemesProjectsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Assigns an issue type screen scheme to a project.
 *
 * Issue type screen schemes can only be assigned to classic projects.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function assignIssueTypeScreenSchemeToProject(
  client: Client,
  parameters: AssignIssueTypeScreenSchemeToProject,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/issuetypescreenscheme/project',
    method: 'PUT',
    body: {
      issueTypeScreenSchemeId: parameters.issueTypeScreenSchemeId,
      projectId: parameters.projectId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates an issue type screen scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateIssueTypeScreenScheme(
  client: Client,
  parameters: UpdateIssueTypeScreenScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
    method: 'PUT',
    body: {
      description: parameters.description,
      name: parameters.name,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue type screen scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteIssueTypeScreenScheme(
  client: Client,
  parameters: DeleteIssueTypeScreenScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Appends issue type to screen scheme mappings to an issue type screen scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function appendMappingsForIssueTypeScreenScheme(
  client: Client,
  parameters: AppendMappingsForIssueTypeScreenScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
    method: 'PUT',
    body: {
      issueTypeMappings: parameters.issueTypeMappings,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all unmapped
 * issue types.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateDefaultScreenScheme(client: Client, parameters: UpdateDefaultScreenScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/default`,
    method: 'PUT',
    body: {
      screenSchemeId: parameters.screenSchemeId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Removes issue type to screen scheme mappings from an issue type screen scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function removeMappingsFromIssueTypeScreenScheme(
  client: Client,
  parameters: RemoveMappingsFromIssueTypeScreenScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/remove`,
    method: 'POST',
    body: {
      issueTypeIds: parameters.issueTypeIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of projects
 * associated with an issue type screen scheme.
 *
 * Only company-managed projects associated with an issue type screen scheme are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getProjectsForIssueTypeScreenScheme(
  client: Client,
  parameters: GetProjectsForIssueTypeScreenScheme,
): Promise<PageProjectDetails> {
  const config: SendRequestOptions<PageProjectDetails> = {
    url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/project`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      query: parameters.query,
    },
    schema: PageProjectDetailsSchema,
  };

  return await client.sendRequest(config);
}
