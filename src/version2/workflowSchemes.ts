import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllWorkflowSchemesParameters } from './parameters/getAllWorkflowSchemesParameters';
import type { CreateWorkflowSchemeParameters } from './parameters/createWorkflowSchemeParameters';
import type { ReadWorkflowSchemesParameters } from './parameters/readWorkflowSchemesParameters';
import type { UpdateSchemesParameters } from './parameters/updateSchemesParameters';
import type { UpdateWorkflowSchemeMappingsParameters } from './parameters/updateWorkflowSchemeMappingsParameters';
import type { DeleteWorkflowSchemeParameters } from './parameters/deleteWorkflowSchemeParameters';
import type { GetWorkflowSchemeParameters } from './parameters/getWorkflowSchemeParameters';
import type { UpdateWorkflowSchemeParameters } from './parameters/updateWorkflowSchemeParameters';
import type { DeleteDefaultWorkflowParameters } from './parameters/deleteDefaultWorkflowParameters';
import type { GetDefaultWorkflowParameters } from './parameters/getDefaultWorkflowParameters';
import type { UpdateDefaultWorkflowParameters } from './parameters/updateDefaultWorkflowParameters';
import type { DeleteWorkflowSchemeIssueTypeParameters } from './parameters/deleteWorkflowSchemeIssueTypeParameters';
import type { GetWorkflowSchemeIssueTypeParameters } from './parameters/getWorkflowSchemeIssueTypeParameters';
import type { SetWorkflowSchemeIssueTypeParameters } from './parameters/setWorkflowSchemeIssueTypeParameters';
import type { DeleteWorkflowMappingParameters } from './parameters/deleteWorkflowMappingParameters';
import type { GetWorkflowParameters } from './parameters/getWorkflowParameters';
import type { UpdateWorkflowMappingParameters } from './parameters/updateWorkflowMappingParameters';
import type { GetProjectUsagesForWorkflowSchemeParameters } from './parameters/getProjectUsagesForWorkflowSchemeParameters';

export class WorkflowSchemes {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * workflow schemes, not including draft workflow schemes. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflowSchemes(parameters: GetAllWorkflowSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/workflowscheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowScheme(parameters: CreateWorkflowSchemeParameters) {
    const request: Request = {
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
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of workflow schemes by providing workflow scheme IDs or project IDs. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ global permission to access all, including project-scoped, workflow schemes
   * - - _Administer projects_ project permissions to access project-scoped workflow schemes
   */
  async readWorkflowSchemes(parameters: ReadWorkflowSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/workflowscheme/read',
      method: 'POST',
      body: {
        projectIds: parameters.projectIds,
        workflowSchemeIds: parameters.workflowSchemeIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any
   * changes made to a workflow scheme are immediately available. When changing the available statuses for issue types,
   * an [asynchronous task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations)
   * migrates the issues as defined in the provided mappings. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ project permission to update all, including global-scoped, workflow schemes.
   * - - _Administer projects_ project permission to update project-scoped workflow schemes.
   */
  async updateSchemes(parameters: UpdateSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/workflowscheme/update',
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

    return this.client.sendRequest(request);
  }

  /**
   * Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue
   * type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow,
   * or both. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ permission to update all, including global-scoped, workflow schemes.
   * - - _Administer projects_ project permission to update project-scoped workflow schemes.
   */
  async updateWorkflowSchemeMappings(parameters: UpdateWorkflowSchemeMappingsParameters) {
    const request: Request = {
      url: '/rest/api/2/workflowscheme/update/mappings',
      method: 'POST',
      body: {
        defaultWorkflowId: parameters.defaultWorkflowId,
        id: parameters.id,
        workflowsForIssueTypes: parameters.workflowsForIssueTypes,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at
   * least one project). *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowScheme(parameters: DeleteWorkflowSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowScheme(parameters: GetWorkflowSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'GET',
      query: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a company-manged project workflow scheme, including the name, default workflow, issue type to project
   * mappings, and more. If the workflow scheme is active (that is, being used by at least one project), then a draft
   * workflow scheme is created or updated instead, provided that `updateDraftIfNeeded` is set to `true`. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowScheme(parameters: UpdateWorkflowSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
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
    };

    return this.client.sendRequest(request);
  }

  /**
   * Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow
   * (the _jira_ workflow). *
   *
   * - Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   *   `true` and a draft workflow scheme is created or updated with the default workflow reset. The draft workflow
   *   scheme can be published in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDefaultWorkflow(parameters: DeleteDefaultWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'DELETE',
      query: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue
   * types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue Types_ listed
   * in its issue types for the workflow scheme in Jira. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultWorkflow(parameters: GetDefaultWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'GET',
      query: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the default workflow for a workflow scheme. *
   *
   * - Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   *   `true` in the request object and a draft workflow scheme is created or updated with the new default workflow. The
   *   draft workflow scheme can be published in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultWorkflow(parameters: UpdateDefaultWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'PUT',
      body: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme. *
   *
   * - Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   *   `true` and a draft workflow scheme is created or updated with the issue type-workflow mapping deleted. The draft
   *   workflow scheme can be published in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeIssueType(parameters: DeleteWorkflowSchemeIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'DELETE',
      query: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeIssueType(parameters: GetWorkflowSchemeIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'GET',
      query: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the workflow for an issue type in a workflow scheme. *
   *
   * - Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   *   `true` in the request body and a draft workflow scheme is created or updated with the new issue type-workflow
   *   mapping. The draft workflow scheme can be published in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeIssueType(parameters: SetWorkflowSchemeIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'PUT',
      body: {
        issueType: parameters.issueType,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme. *
   *
   * - Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   *   `true` and a draft workflow scheme is created or updated with the workflow-issue type mapping deleted. The draft
   *   workflow scheme can be published in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowMapping(parameters: DeleteWorkflowMappingParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'DELETE',
      query: {
        workflowName: parameters.workflowName,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the workflow-issue type mappings for a workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflow(parameters: GetWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'GET',
      query: {
        workflowName: parameters.workflowName,
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the issue types for a workflow in a workflow scheme. The workflow can also be set as the default workflow for
   * the workflow scheme. Unmapped issues types are mapped to the default workflow. *
   *
   * - Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   *   `true` in the request body and a draft workflow scheme is created or updated with the new workflow-issue types
   *   mappings. The draft workflow scheme can be published in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowMapping(parameters: UpdateWorkflowMappingParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'PUT',
      query: {
        workflowName: parameters.workflowName,
      },
      body: {
        defaultMapping: parameters.defaultMapping,
        issueTypes: parameters.issueTypes,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of projects using a given workflow scheme. */
  async getProjectUsagesForWorkflowScheme(parameters: GetProjectUsagesForWorkflowSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.workflowSchemeId}/projectUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }
}
