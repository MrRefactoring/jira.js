import { WorkflowSchemeSchema, type WorkflowScheme } from '#/models/workflowScheme';
import { DefaultWorkflowSchema, type DefaultWorkflow } from '#/models/defaultWorkflow';
import { IssueTypeWorkflowMappingSchema, type IssueTypeWorkflowMapping } from '#/models/issueTypeWorkflowMapping';
import { IssueTypesWorkflowMappingSchema, type IssueTypesWorkflowMapping } from '#/models/issueTypesWorkflowMapping';
import { type CreateWorkflowSchemeDraftFromParent } from '#/parameters/createWorkflowSchemeDraftFromParent';
import { type GetWorkflowSchemeDraft } from '#/parameters/getWorkflowSchemeDraft';
import { type UpdateWorkflowSchemeDraft } from '#/parameters/updateWorkflowSchemeDraft';
import { type DeleteWorkflowSchemeDraft } from '#/parameters/deleteWorkflowSchemeDraft';
import { type GetDraftDefaultWorkflow } from '#/parameters/getDraftDefaultWorkflow';
import { type UpdateDraftDefaultWorkflow } from '#/parameters/updateDraftDefaultWorkflow';
import { type DeleteDraftDefaultWorkflow } from '#/parameters/deleteDraftDefaultWorkflow';
import { type GetWorkflowSchemeDraftIssueType } from '#/parameters/getWorkflowSchemeDraftIssueType';
import { type SetWorkflowSchemeDraftIssueType } from '#/parameters/setWorkflowSchemeDraftIssueType';
import { type DeleteWorkflowSchemeDraftIssueType } from '#/parameters/deleteWorkflowSchemeDraftIssueType';
import { type PublishDraftWorkflowScheme } from '#/parameters/publishDraftWorkflowScheme';
import { type GetDraftWorkflow } from '#/parameters/getDraftWorkflow';
import { type UpdateDraftWorkflowMapping } from '#/parameters/updateDraftWorkflowMapping';
import { type DeleteDraftWorkflowMapping } from '#/parameters/deleteDraftWorkflowMapping';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an
 * active workflow scheme can only have one draft workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createWorkflowSchemeDraftFromParent(
  client: Client,
  parameters: CreateWorkflowSchemeDraftFromParent,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/createdraft`,
    method: 'POST',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to
 * the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is
 * modified, then the changes in the draft are copied back to the active workflow scheme. See [Configuring workflow
 * schemes](https://confluence.atlassian.com/x/tohKLg) for more information.\
 * Note that:
 *
 * - Only active workflow schemes can have draft workflow schemes.
 * - An active workflow scheme can only have one draft workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getWorkflowSchemeDraft(
  client: Client,
  parameters: GetWorkflowSchemeDraft,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft`,
    method: 'GET',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a
 * draft is created. Note that an active workflow scheme can only have one draft workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateWorkflowSchemeDraft(
  client: Client,
  parameters: UpdateWorkflowSchemeDraft,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft`,
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
 * Deletes a draft workflow scheme.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteWorkflowSchemeDraft(client: Client, parameters: DeleteWorkflowSchemeDraft): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned any
 * issue types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue Types_
 * listed in its issue types for the workflow scheme in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getDraftDefaultWorkflow(
  client: Client,
  parameters: GetDraftDefaultWorkflow,
): Promise<DefaultWorkflow> {
  const config: SendRequestOptions<DefaultWorkflow> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/default`,
    method: 'GET',
    schema: DefaultWorkflowSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default workflow for a workflow scheme's draft.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateDraftDefaultWorkflow(
  client: Client,
  parameters: UpdateDraftDefaultWorkflow,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/default`,
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
 * Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system
 * workflow (the _jira_ workflow).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteDraftDefaultWorkflow(
  client: Client,
  parameters: DeleteDraftDefaultWorkflow,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/default`,
    method: 'DELETE',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getWorkflowSchemeDraftIssueType(
  client: Client,
  parameters: GetWorkflowSchemeDraftIssueType,
): Promise<IssueTypeWorkflowMapping> {
  const config: SendRequestOptions<IssueTypeWorkflowMapping> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
    method: 'GET',
    schema: IssueTypeWorkflowMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the workflow for an issue type in a workflow scheme's draft.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setWorkflowSchemeDraftIssueType(
  client: Client,
  parameters: SetWorkflowSchemeDraftIssueType,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
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
 * Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteWorkflowSchemeDraftIssueType(
  client: Client,
  parameters: DeleteWorkflowSchemeDraftIssueType,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
    method: 'DELETE',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Publishes a draft workflow scheme.
 *
 * Where the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues
 * with the original workflow status to the new workflow status.
 *
 * This operation is [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async). Follow the
 * `location` link in the response to determine the status of the task and use [Get
 * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-task/#api-rest-api-3-task-taskId-get) to
 * obtain updates.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function publishDraftWorkflowScheme(
  client: Client,
  parameters: PublishDraftWorkflowScheme,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/publish`,
    method: 'POST',
    searchParams: {
      validateOnly: parameters.validateOnly,
    },
    body: {
      statusMappings: parameters.statusMappings,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the workflow-issue type mappings for a workflow scheme's draft.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getDraftWorkflow(
  client: Client,
  parameters: GetDraftWorkflow,
): Promise<IssueTypesWorkflowMapping> {
  const config: SendRequestOptions<IssueTypesWorkflowMapping> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/workflow`,
    method: 'GET',
    searchParams: {
      workflowName: parameters.workflowName,
    },
    schema: IssueTypesWorkflowMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default
 * workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateDraftWorkflowMapping(
  client: Client,
  parameters: UpdateDraftWorkflowMapping,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/workflow`,
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
 * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteDraftWorkflowMapping(
  client: Client,
  parameters: DeleteDraftWorkflowMapping,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/workflowscheme/${parameters.id}/draft/workflow`,
    method: 'DELETE',
    searchParams: {
      workflowName: parameters.workflowName,
    },
  };

  return await client.sendRequest(config);
}
