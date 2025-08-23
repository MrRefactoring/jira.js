import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateWorkflowSchemeDraftFromParentParameters } from './parameters/createWorkflowSchemeDraftFromParentParameters';
import type { DeleteWorkflowSchemeDraftParameters } from './parameters/deleteWorkflowSchemeDraftParameters';
import type { GetWorkflowSchemeDraftParameters } from './parameters/getWorkflowSchemeDraftParameters';
import type { UpdateWorkflowSchemeDraftParameters } from './parameters/updateWorkflowSchemeDraftParameters';
import type { DeleteDraftDefaultWorkflowParameters } from './parameters/deleteDraftDefaultWorkflowParameters';
import type { GetDraftDefaultWorkflowParameters } from './parameters/getDraftDefaultWorkflowParameters';
import type { UpdateDraftDefaultWorkflowParameters } from './parameters/updateDraftDefaultWorkflowParameters';
import type { DeleteWorkflowSchemeDraftIssueTypeParameters } from './parameters/deleteWorkflowSchemeDraftIssueTypeParameters';
import type { GetWorkflowSchemeDraftIssueTypeParameters } from './parameters/getWorkflowSchemeDraftIssueTypeParameters';
import type { SetWorkflowSchemeDraftIssueTypeParameters } from './parameters/setWorkflowSchemeDraftIssueTypeParameters';
import type { PublishDraftWorkflowSchemeParameters } from './parameters/publishDraftWorkflowSchemeParameters';
import type { DeleteDraftWorkflowMappingParameters } from './parameters/deleteDraftWorkflowMappingParameters';
import type { GetDraftWorkflowParameters } from './parameters/getDraftWorkflowParameters';
import type { UpdateDraftWorkflowMappingParameters } from './parameters/updateDraftWorkflowMappingParameters';

export class WorkflowSchemeDrafts {
  constructor(private client: Client) {}
  /**
   * Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an
   * active workflow scheme can only have one draft workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowSchemeDraftFromParent(parameters: CreateWorkflowSchemeDraftFromParentParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/createdraft`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a draft workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeDraft(parameters: DeleteWorkflowSchemeDraftParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to
   * the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is
   * modified, then the changes in the draft are copied back to the active workflow scheme. See [Configuring workflow
   * schemes](https://confluence.atlassian.com/x/tohKLg) for more information.
   *
   * - Note that:
   * -
   * - - Only active workflow schemes can have draft workflow schemes.
   * - - An active workflow scheme can only have one draft workflow scheme.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeDraft(parameters: GetWorkflowSchemeDraftParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a
   * draft is created. Note that an active workflow scheme can only have one draft workflow scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowSchemeDraft(parameters: UpdateWorkflowSchemeDraftParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
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
   * Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system
   * workflow (the _jira_ workflow). *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDraftDefaultWorkflow(parameters: DeleteDraftDefaultWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned
   * any issue types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue
   * Types_ listed in its issue types for the workflow scheme in Jira. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDraftDefaultWorkflow(parameters: GetDraftDefaultWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the default workflow for a workflow scheme's draft. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDraftDefaultWorkflow(parameters: UpdateDraftDefaultWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'PUT',
      body: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeDraftIssueType(parameters: DeleteWorkflowSchemeDraftIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeDraftIssueType(parameters: GetWorkflowSchemeDraftIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the workflow for an issue type in a workflow scheme's draft. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeDraftIssueType(parameters: SetWorkflowSchemeDraftIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
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
   * Publishes a draft workflow scheme. *
   *
   * - Where the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues
   *   with the original workflow status to the new workflow status.
   * -
   * - This operation is
   *   [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async publishDraftWorkflowScheme(parameters: PublishDraftWorkflowSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/publish`,
      method: 'POST',
      query: {
        validateOnly: parameters.validateOnly,
      },
      body: {
        statusMappings: parameters.statusMappings,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDraftWorkflowMapping(parameters: DeleteDraftWorkflowMappingParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'DELETE',
      query: {
        workflowName: parameters.workflowName,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the workflow-issue type mappings for a workflow scheme's draft. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDraftWorkflow(parameters: GetDraftWorkflowParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'GET',
      query: {
        workflowName: parameters.workflowName,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default
   * workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDraftWorkflowMapping(parameters: UpdateDraftWorkflowMappingParameters) {
    const request: Request = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
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
}
