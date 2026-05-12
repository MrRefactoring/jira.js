import { JiraStatusSchema, type JiraStatus } from '#/models/jiraStatus';
import { PageOfStatusesSchema, type PageOfStatuses } from '#/models/pageOfStatuses';
import {
  StatusProjectIssueTypeUsageDTOSchema,
  type StatusProjectIssueTypeUsageDTO,
} from '#/models/statusProjectIssueTypeUsageDTO';
import { StatusProjectUsageDTOSchema, type StatusProjectUsageDTO } from '#/models/statusProjectUsageDTO';
import { StatusWorkflowUsageDTOSchema, type StatusWorkflowUsageDTO } from '#/models/statusWorkflowUsageDTO';
import { type GetStatusesById } from '#/parameters/getStatusesById';
import { type CreateStatuses } from '#/parameters/createStatuses';
import { type UpdateStatuses } from '#/parameters/updateStatuses';
import { type DeleteStatusesById } from '#/parameters/deleteStatusesById';
import { type GetStatusesByName } from '#/parameters/getStatusesByName';
import { type Search } from '#/parameters/search';
import { type GetProjectIssueTypeUsagesForStatus } from '#/parameters/getProjectIssueTypeUsagesForStatus';
import { type GetProjectUsagesForStatus } from '#/parameters/getProjectUsagesForStatus';
import { type GetWorkflowUsagesForStatus } from '#/parameters/getWorkflowUsagesForStatus';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a list of the statuses specified by one or more status IDs.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function getStatusesById(client: Client, parameters: GetStatusesById): Promise<JiraStatus[]> {
  const config: SendRequestOptions<JiraStatus[]> = {
    url: '/rest/api/3/statuses',
    method: 'GET',
    searchParams: {
      id: parameters.id,
    },
    schema: z.array(JiraStatusSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Creates statuses for a global or project scope.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function createStatuses(client: Client, parameters: CreateStatuses): Promise<JiraStatus[]> {
  const config: SendRequestOptions<JiraStatus[]> = {
    url: '/rest/api/3/statuses',
    method: 'POST',
    body: {
      scope: parameters.scope,
      statuses: parameters.statuses,
    },
    schema: z.array(JiraStatusSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Updates statuses by ID.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function updateStatuses(client: Client, parameters: UpdateStatuses): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/statuses',
    method: 'PUT',
    body: {
      statuses: parameters.statuses,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes statuses by ID.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function deleteStatusesById(client: Client, parameters: DeleteStatusesById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/statuses',
    method: 'DELETE',
    searchParams: {
      id: parameters.id,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of the statuses specified by one or more status names.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function getStatusesByName(client: Client, parameters: GetStatusesByName): Promise<JiraStatus[]> {
  const config: SendRequestOptions<JiraStatus[]> = {
    url: '/rest/api/3/statuses/byNames',
    method: 'GET',
    searchParams: {
      name: parameters.name,
      projectId: parameters.projectId,
    },
    schema: z.array(JiraStatusSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of statuses
 * that match a search on name or project.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
 */
export async function search(client: Client, parameters?: Search): Promise<PageOfStatuses> {
  const config: SendRequestOptions<PageOfStatuses> = {
    url: '/rest/api/3/statuses/search',
    method: 'GET',
    searchParams: {
      projectId: parameters?.projectId,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      searchString: parameters?.searchString,
      statusCategory: parameters?.statusCategory,
    },
    schema: PageOfStatusesSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a page of issue types in a project using a given status. */
export async function getProjectIssueTypeUsagesForStatus(
  client: Client,
  parameters: GetProjectIssueTypeUsagesForStatus,
): Promise<StatusProjectIssueTypeUsageDTO> {
  const config: SendRequestOptions<StatusProjectIssueTypeUsageDTO> = {
    url: `/rest/api/3/statuses/${parameters.statusId}/project/${parameters.projectId}/issueTypeUsages`,
    method: 'GET',
    searchParams: {
      nextPageToken: parameters.nextPageToken,
      maxResults: parameters.maxResults,
    },
    schema: StatusProjectIssueTypeUsageDTOSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a page of projects using a given status. */
export async function getProjectUsagesForStatus(
  client: Client,
  parameters: GetProjectUsagesForStatus,
): Promise<StatusProjectUsageDTO> {
  const config: SendRequestOptions<StatusProjectUsageDTO> = {
    url: `/rest/api/3/statuses/${parameters.statusId}/projectUsages`,
    method: 'GET',
    searchParams: {
      nextPageToken: parameters.nextPageToken,
      maxResults: parameters.maxResults,
    },
    schema: StatusProjectUsageDTOSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a page of workflows using a given status. */
export async function getWorkflowUsagesForStatus(
  client: Client,
  parameters: GetWorkflowUsagesForStatus,
): Promise<StatusWorkflowUsageDTO> {
  const config: SendRequestOptions<StatusWorkflowUsageDTO> = {
    url: `/rest/api/3/statuses/${parameters.statusId}/workflowUsages`,
    method: 'GET',
    searchParams: {
      nextPageToken: parameters.nextPageToken,
      maxResults: parameters.maxResults,
    },
    schema: StatusWorkflowUsageDTOSchema,
  };

  return await client.sendRequest(config);
}
