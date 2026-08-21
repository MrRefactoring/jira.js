import { WorkflowSchemeSchema, type WorkflowScheme } from '../models/workflowScheme';
import { IssueTypeMappingSchema, type IssueTypeMapping } from '../models/issueTypeMapping';
import { GetWorkflowSchema, type GetWorkflow } from '../models/getWorkflow';
import type { CreateScheme } from '../parameters/createScheme';
import type { GetById } from '../parameters/getById';
import type { UpdateWorkflowScheme } from '../parameters/updateWorkflowScheme';
import type { DeleteScheme } from '../parameters/deleteScheme';
import type { CreateDraftForParent } from '../parameters/createDraftForParent';
import type { GetDefault } from '../parameters/getDefault';
import type { UpdateDefault } from '../parameters/updateDefault';
import type { DeleteDefault } from '../parameters/deleteDefault';
import type { GetDraftById } from '../parameters/getDraftById';
import type { UpdateDraft } from '../parameters/updateDraft';
import type { DeleteDraftById } from '../parameters/deleteDraftById';
import type { GetDraftDefault } from '../parameters/getDraftDefault';
import type { UpdateDraftDefault } from '../parameters/updateDraftDefault';
import type { DeleteDraftDefault } from '../parameters/deleteDraftDefault';
import type { GetDraftIssueType } from '../parameters/getDraftIssueType';
import type { SetDraftIssueType } from '../parameters/setDraftIssueType';
import type { DeleteDraftIssueType } from '../parameters/deleteDraftIssueType';
import type { GetDraftWorkflow } from '../parameters/getDraftWorkflow';
import type { UpdateDraftWorkflowMapping } from '../parameters/updateDraftWorkflowMapping';
import type { DeleteDraftWorkflowMapping } from '../parameters/deleteDraftWorkflowMapping';
import type { GetWorkflowSchemeIssueType } from '../parameters/getWorkflowSchemeIssueType';
import type { SetIssueType } from '../parameters/setIssueType';
import type { DeleteWorkflowSchemeIssueType } from '../parameters/deleteWorkflowSchemeIssueType';
import type { GetWorkflow as GetWorkflowParameters } from '../parameters/getWorkflow';
import type { UpdateWorkflowMapping } from '../parameters/updateWorkflowMapping';
import type { DeleteWorkflowMapping } from '../parameters/deleteWorkflowMapping';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Create a new workflow scheme. The body contains a representation of the new scheme. Values not passed are assumed to
 * be set to their defaults.
 */
export async function createScheme(client: Client, parameters: CreateScheme): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: '/rest/api/2/workflowscheme',
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

/** Returns the requested workflow scheme to the caller. */
export async function getById(client: Client, parameters: GetById): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}`,
    method: 'GET',
    searchParams: {
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update the passed workflow scheme. The body of the request is a representation of the workflow scheme. Values not
 * passed are assumed to indicate no change for that field. The passed representation can have its updateDraftIfNeeded
 * flag set to true to indicate that the draft should be created and/or updated when the actual scheme cannot be edited
 * (e.g. when the scheme is being used by a project). Values not appearing the body will not be touched.
 */
export async function updateWorkflowScheme(client: Client, parameters: UpdateWorkflowScheme): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Delete the passed workflow scheme. */
export async function deleteScheme(client: Client, parameters: DeleteScheme): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Create a draft for the passed scheme. The draft will be a copy of the state of the parent. */
export async function createDraftForParent(client: Client, parameters: CreateDraftForParent): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/createdraft`,
    method: 'POST',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Return the default workflow from the passed workflow scheme. */
export async function getDefault(client: Client, parameters: GetDefault): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
    method: 'GET',
    searchParams: {
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Set the default workflow for the passed workflow scheme. The passed representation can have its updateDraftIfNeeded
 * flag set to true to indicate that the draft should be created/updated when the actual scheme cannot be edited.
 */
export async function updateDefault(client: Client, parameters: UpdateDefault): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
    method: 'PUT',
    body: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      workflow: parameters.workflow,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Remove the default workflow from the passed workflow scheme. */
export async function deleteDefault(client: Client, parameters: DeleteDefault): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
    method: 'DELETE',
    searchParams: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the requested draft workflow scheme to the caller. */
export async function getDraftById(client: Client, parameters: GetDraftById): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
    method: 'GET',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a draft workflow scheme. The draft will created if necessary. The body of the request is a representation of
 * the workflow scheme. Values not passed are assumed to indicate no change for that field.
 */
export async function updateDraft(client: Client, parameters: UpdateDraft): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
    method: 'PUT',
    body: parameters.body,
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Delete the passed draft workflow scheme. */
export async function deleteDraftById(client: Client, parameters: DeleteDraftById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Return the default workflow from the passed draft workflow scheme to the caller. */
export async function getDraftDefault(client: Client, parameters: GetDraftDefault): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
    method: 'GET',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Set the default workflow for the passed draft workflow scheme. */
export async function updateDraftDefault(client: Client, parameters: UpdateDraftDefault): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
    method: 'PUT',
    body: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      workflow: parameters.workflow,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Remove the default workflow from the passed draft workflow scheme. */
export async function deleteDraftDefault(client: Client, parameters: DeleteDraftDefault): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
    method: 'DELETE',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the issue type mapping for the passed draft workflow scheme. */
export async function getDraftIssueType(client: Client, parameters: GetDraftIssueType): Promise<IssueTypeMapping> {
  const config: SendRequestOptions<IssueTypeMapping> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
    method: 'GET',
    schema: IssueTypeMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Set the issue type mapping for the passed draft scheme. The passed representation can have its updateDraftIfNeeded
 * flag set to true to indicate that the draft should be created/updated when the actual scheme cannot be edited.
 */
export async function setDraftIssueType(client: Client, parameters: SetDraftIssueType): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
    method: 'PUT',
    body: parameters.body,
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Remove the specified issue type mapping from the draft scheme. */
export async function deleteDraftIssueType(client: Client, parameters: DeleteDraftIssueType): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
    method: 'DELETE',
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the draft workflow mappings or requested mapping to the caller. */
export async function getDraftWorkflow(client: Client, parameters: GetDraftWorkflow): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
    method: 'GET',
    searchParams: {
      workflowName: parameters.workflowName,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update the draft scheme to include the passed mapping. The body is a representation of the workflow mapping. Values
 * not passed are assumed to indicate no change for that field.
 */
export async function updateDraftWorkflowMapping(
  client: Client,
  parameters: UpdateDraftWorkflowMapping,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
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

/** Delete the passed workflow from the draft workflow scheme. */
export async function deleteDraftWorkflowMapping(
  client: Client,
  parameters: DeleteDraftWorkflowMapping,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
    method: 'DELETE',
    searchParams: {
      workflowName: parameters.workflowName,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the issue type mapping for the passed workflow scheme. */
export async function getWorkflowSchemeIssueType(
  client: Client,
  parameters: GetWorkflowSchemeIssueType,
): Promise<IssueTypeMapping> {
  const config: SendRequestOptions<IssueTypeMapping> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
    method: 'GET',
    searchParams: {
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: IssueTypeMappingSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Set the issue type mapping for the passed scheme. The passed representation can have its updateDraftIfNeeded flag set
 * to true to indicate that the draft should be created/updated when the actual scheme cannot be edited.
 */
export async function setIssueType(client: Client, parameters: SetIssueType): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
    method: 'PUT',
    body: parameters.body,
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Remove the specified issue type mapping from the scheme. */
export async function deleteWorkflowSchemeIssueType(
  client: Client,
  parameters: DeleteWorkflowSchemeIssueType,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
    method: 'DELETE',
    searchParams: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the workflow mappings or requested mapping to the caller for the passed scheme. */
export async function getWorkflow(client: Client, parameters: GetWorkflowParameters): Promise<GetWorkflow> {
  const config: SendRequestOptions<GetWorkflow> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
    method: 'GET',
    searchParams: {
      workflowName: parameters.workflowName,
      returnDraftIfExists: parameters.returnDraftIfExists,
    },
    schema: GetWorkflowSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update the scheme to include the passed mapping. The body is a representation of the workflow mapping. Values not
 * passed are assumed to indicate no change for that field. The passed representation can have its updateDraftIfNeeded
 * flag set to true to indicate that the draft should be created/updated when the actual scheme cannot be edited.
 */
export async function updateWorkflowMapping(
  client: Client,
  parameters: UpdateWorkflowMapping,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
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

/** Delete the passed workflow from the workflow scheme. */
export async function deleteWorkflowMapping(
  client: Client,
  parameters: DeleteWorkflowMapping,
): Promise<WorkflowScheme> {
  const config: SendRequestOptions<WorkflowScheme> = {
    url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
    method: 'DELETE',
    searchParams: {
      updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      workflowName: parameters.workflowName,
    },
    schema: WorkflowSchemeSchema,
  };

  return await client.sendRequest(config);
}
