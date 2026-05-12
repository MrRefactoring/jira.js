import { PageWorkflowSchemeSchema, type PageWorkflowScheme } from '#/models/pageWorkflowScheme';
import { WorkflowSchemeSchema, type WorkflowScheme } from '#/models/workflowScheme';
import { WorkflowSchemeReadResponseSchema, type WorkflowSchemeReadResponse } from '#/models/workflowSchemeReadResponse';
import {
  WorkflowSchemeUpdateRequiredMappingsResponseSchema,
  type WorkflowSchemeUpdateRequiredMappingsResponse,
} from '#/models/workflowSchemeUpdateRequiredMappingsResponse';
import { DefaultWorkflowSchema, type DefaultWorkflow } from '#/models/defaultWorkflow';
import { IssueTypeWorkflowMappingSchema, type IssueTypeWorkflowMapping } from '#/models/issueTypeWorkflowMapping';
import { IssueTypesWorkflowMappingSchema, type IssueTypesWorkflowMapping } from '#/models/issueTypesWorkflowMapping';
import {
  WorkflowSchemeProjectUsageDTOSchema,
  type WorkflowSchemeProjectUsageDTO,
} from '#/models/workflowSchemeProjectUsageDTO';
import { type GetAllWorkflowSchemes } from '#/parameters/getAllWorkflowSchemes';
import { type CreateWorkflowScheme } from '#/parameters/createWorkflowScheme';
import { type ReadWorkflowSchemes } from '#/parameters/readWorkflowSchemes';
import { type UpdateSchemes } from '#/parameters/updateSchemes';
import { type GetRequiredWorkflowSchemeMappings } from '#/parameters/getRequiredWorkflowSchemeMappings';
import { type GetWorkflowScheme } from '#/parameters/getWorkflowScheme';
import { type UpdateWorkflowScheme } from '#/parameters/updateWorkflowScheme';
import { type DeleteWorkflowScheme } from '#/parameters/deleteWorkflowScheme';
import { type GetDefaultWorkflow } from '#/parameters/getDefaultWorkflow';
import { type UpdateDefaultWorkflow } from '#/parameters/updateDefaultWorkflow';
import { type DeleteDefaultWorkflow } from '#/parameters/deleteDefaultWorkflow';
import { type GetWorkflowSchemeIssueType } from '#/parameters/getWorkflowSchemeIssueType';
import { type SetWorkflowSchemeIssueType } from '#/parameters/setWorkflowSchemeIssueType';
import { type DeleteWorkflowSchemeIssueType } from '#/parameters/deleteWorkflowSchemeIssueType';
import { type GetWorkflow } from '#/parameters/getWorkflow';
import { type UpdateWorkflowMapping } from '#/parameters/updateWorkflowMapping';
import { type DeleteWorkflowMapping } from '#/parameters/deleteWorkflowMapping';
import { type GetProjectUsagesForWorkflowScheme } from '#/parameters/getProjectUsagesForWorkflowScheme';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * workflow schemes, not including draft workflow schemes.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAllWorkflowSchemes(
  client: Client,
  parameters?: GetAllWorkflowSchemes,
): Promise<PageWorkflowScheme> {
  const config: SendRequestOptions<PageWorkflowScheme> = {
    url: '/rest/api/3/workflowscheme',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
    },
    schema: PageWorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createWorkflowScheme(client: Client, parameters: CreateWorkflowScheme): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: '/rest/api/3/workflowscheme',
    method: 'POST',
    body: {
      defaultWorkflow: parameters.defaultWorkflow,
      description: parameters.description,
      draft: parameters.draft,
      id: parameters.id,
      issueTypeMappings: parameters.issueTypeMappings,
      issueTypes: parameters.issueTypes,
      lastModified: parameters.lastModified,
      lastModifiedUser: parameters.lastModifiedUser,
      name: parameters.name,
      originalDefaultWorkflow: parameters.originalDefaultWorkflow,
      originalIssueTypeMappings: parameters.originalIssueTypeMappings,
      self: parameters.self,
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of workflow schemes by providing workflow scheme IDs or project IDs.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ global permission to access all, including project-scoped, workflow schemes
 * - _Administer projects_ project permissions to access project-scoped workflow schemes
 */
export async function readWorkflowSchemes(
  client: Client,
  parameters: ReadWorkflowSchemes,
): Promise<WorkflowSchemeReadResponse[]> {
  const config: SendRequestOptions<WorkflowSchemeReadResponse[]> = {
    url: '/rest/api/3/workflowscheme/read',
    method: 'POST',
    body: {
      projectIds: parameters.projectIds,
      workflowSchemeIds: parameters.workflowSchemeIds,
    },
    schema: z.array(WorkflowSchemeReadResponseSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any
 * changes made to a workflow scheme are immediately available. When changing the available statuses for issue types, an
 * [asynchronous task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async) migrates the issues as
 * defined in the provided mappings.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ project permission to update all, including global-scoped, workflow schemes.
 * - _Administer projects_ project permission to update project-scoped workflow schemes.
 */
export async function updateSchemes(client: Client, parameters: UpdateSchemes): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/3/workflowscheme/update',
    method: 'POST',
    body: {
      defaultWorkflowId: parameters.defaultWorkflowId,
      description: parameters.description,
      id: parameters.id,
      name: parameters.name,
      statusMappingsByIssueTypeOverride: parameters.statusMappingsByIssueTypeOverride,
      statusMappingsByWorkflows: parameters.statusMappingsByWorkflows,
      version: parameters.version,
      workflowsForIssueTypes: parameters.workflowsForIssueTypes,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue
 * type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow, or
 * both.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ permission to update all, including global-scoped, workflow schemes.
 * - _Administer projects_ project permission to update project-scoped workflow schemes.
 */
export async function getRequiredWorkflowSchemeMappings(
  client: Client,
  parameters: GetRequiredWorkflowSchemeMappings,
): Promise<WorkflowSchemeUpdateRequiredMappingsResponse> {
  const config: SendRequestOptions<WorkflowSchemeUpdateRequiredMappingsResponse> = {
    url: '/rest/api/3/workflowscheme/update/mappings',
    method: 'POST',
    body: {
      defaultWorkflowId: parameters.defaultWorkflowId,
      id: parameters.id,
      workflowsForIssueTypes: parameters.workflowsForIssueTypes,
    },
    schema: WorkflowSchemeUpdateRequiredMappingsResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getWorkflowScheme(client: Client, parameters: GetWorkflowScheme): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}`,
    method: 'GET',
    searchParams: {
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a company-manged project workflow scheme, including the name, default workflow, issue type to project
 * mappings, and more. If the workflow scheme is active (that is, being used by at least one project), then a draft
 * workflow scheme is created or updated instead, provided that `updateDraftIfNeeded` is set to `true`.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateWorkflowScheme(client: Client, parameters: UpdateWorkflowScheme): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}`,
    method: 'PUT',
    body: {
      defaultWorkflow: parameters.defaultWorkflow,
      description: parameters.description,
      draft: parameters.draft,
      id: parameters.id,
      issueTypeMappings: parameters.issueTypeMappings,
      issueTypes: parameters.issueTypes,
      lastModified: parameters.lastModified,
      lastModifiedUser: parameters.lastModifiedUser,
      name: parameters.name,
      originalDefaultWorkflow: parameters.originalDefaultWorkflow,
      originalIssueTypeMappings: parameters.originalIssueTypeMappings,
      self: parameters.self,
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at
 * least one project).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteWorkflowScheme(client: Client, parameters: DeleteWorkflowScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue
 * types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue Types_ listed
 * in its issue types for the workflow scheme in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getDefaultWorkflow(client: Client, parameters: GetDefaultWorkflow): Promise<DefaultWorkflow> {
  const config: SendRequestOptions<DefaultWorkflow> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/default`,
    method: 'GET',
    searchParams: {
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: DefaultWorkflowSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default workflow for a workflow scheme.
 *
 * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
 * `true` in the request object and a draft workflow scheme is created or updated with the new default workflow. The
 * draft workflow scheme can be published in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateDefaultWorkflow(
  client: Client,
  parameters: UpdateDefaultWorkflow,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/default`,
    method: 'PUT',
    body: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      workflow: parameters.workflow,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow
 * (the _jira_ workflow).
 *
 * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
 * `true` and a draft workflow scheme is created or updated with the default workflow reset. The draft workflow scheme
 * can be published in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteDefaultWorkflow(
  client: Client,
  parameters: DeleteDefaultWorkflow,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/default`,
    method: 'DELETE',
    searchParams: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the issue type-workflow mapping for an issue type in a workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getWorkflowSchemeIssueType(
  client: Client,
  parameters: GetWorkflowSchemeIssueType,
): Promise<IssueTypeWorkflowMapping> {
  const config: SendRequestOptions<IssueTypeWorkflowMapping> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
    method: 'GET',
    searchParams: {
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: IssueTypeWorkflowMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the workflow for an issue type in a workflow scheme.
 *
 * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
 * `true` in the request body and a draft workflow scheme is created or updated with the new issue type-workflow
 * mapping. The draft workflow scheme can be published in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setWorkflowSchemeIssueType(
  client: Client,
  parameters: SetWorkflowSchemeIssueType,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
    method: 'PUT',
    body: {
      issueType: parameters.issueType,
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      workflow: parameters.workflow,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the issue type-workflow mapping for an issue type in a workflow scheme.
 *
 * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
 * `true` and a draft workflow scheme is created or updated with the issue type-workflow mapping deleted. The draft
 * workflow scheme can be published in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteWorkflowSchemeIssueType(
  client: Client,
  parameters: DeleteWorkflowSchemeIssueType,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
    method: 'DELETE',
    searchParams: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the workflow-issue type mappings for a workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getWorkflow(client: Client, parameters: GetWorkflow): Promise<IssueTypesWorkflowMapping> {
  const config: SendRequestOptions<IssueTypesWorkflowMapping> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/workflow`,
    method: 'GET',
    searchParams: {
      workflowName: parameters.workflowName,
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: IssueTypesWorkflowMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the issue types for a workflow in a workflow scheme. The workflow can also be set as the default workflow for
 * the workflow scheme. Unmapped issues types are mapped to the default workflow.
 *
 * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
 * `true` in the request body and a draft workflow scheme is created or updated with the new workflow-issue types
 * mappings. The draft workflow scheme can be published in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateWorkflowMapping(
  client: Client,
  parameters: UpdateWorkflowMapping,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/workflow`,
    method: 'PUT',
    searchParams: {
      workflowName: parameters.workflowName,
    },
    body: {
      defaultMapping: parameters.defaultMapping,
      issueTypes: parameters.issueTypes,
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      workflow: parameters.workflow,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the workflow-issue type mapping for a workflow in a workflow scheme.
 *
 * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
 * `true` and a draft workflow scheme is created or updated with the workflow-issue type mapping deleted. The draft
 * workflow scheme can be published in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteWorkflowMapping(client: Client, parameters: DeleteWorkflowMapping): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/workflow`,
    method: 'DELETE',
    searchParams: {
      workflowName: parameters.workflowName,
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
  };

  return await client.sendRequest(config);
}

/** Returns a page of projects using a given workflow scheme. */
export async function getProjectUsagesForWorkflowScheme(
  client: Client,
  parameters: GetProjectUsagesForWorkflowScheme,
): Promise<WorkflowSchemeProjectUsageDTO> {
  const config: SendRequestOptions<WorkflowSchemeProjectUsageDTO> = {
    url: `/rest/api/3/workflowscheme/${parameters.workflowSchemeId}/projectUsages`,
    method: 'GET',
    searchParams: {
      nextPageToken: parameters.nextPageToken,
      maxResults: parameters.maxResults,
    },
    schema: WorkflowSchemeProjectUsageDTOSchema,
  };

  return await client.sendRequest(config);
}
