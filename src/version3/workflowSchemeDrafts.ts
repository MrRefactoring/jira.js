import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class WorkflowSchemeDrafts {
  constructor(private client: Client) {}

  /**
   * Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an
   * active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowSchemeDraftFromParent | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an
   * active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowSchemeDraftFromParent | string,
    callback?: never,
  ): Promise<T>;
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowSchemeDraftFromParent | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${id}/createdraft`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowSchemeDraft | string,
    callback: Callback<T>,
  ): Promise<void>;
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowSchemeDraft | string,
    callback?: never,
  ): Promise<T>;
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowSchemeDraft | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${id}/draft`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a
   * draft is created. Note that an active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowSchemeDraft,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a
   * draft is created. Note that an active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowSchemeDraft,
    callback?: never,
  ): Promise<T>;
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowSchemeDraft,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        defaultWorkflow: parameters.defaultWorkflow,
        issueTypeMappings: parameters.issueTypeMappings,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeDraft<T = void>(
    parameters: Parameters.DeleteWorkflowSchemeDraft | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeDraft<T = void>(
    parameters: Parameters.DeleteWorkflowSchemeDraft | string,
    callback?: never,
  ): Promise<T>;
  async deleteWorkflowSchemeDraft<T = void>(
    parameters: Parameters.DeleteWorkflowSchemeDraft | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${id}/draft`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned
   * any issue types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue
   * Types_ listed in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDraftDefaultWorkflow | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned
   * any issue types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue
   * Types_ listed in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDraftDefaultWorkflow | string,
    callback?: never,
  ): Promise<T>;
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDraftDefaultWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${id}/draft/default`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the default workflow for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDraftDefaultWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the default workflow for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDraftDefaultWorkflow,
    callback?: never,
  ): Promise<T>;
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDraftDefaultWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/default`,
      method: 'PUT',
      data: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system
   * workflow (the _jira_ workflow).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDraftDefaultWorkflow | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system
   * workflow (the _jira_ workflow).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDraftDefaultWorkflow | string,
    callback?: never,
  ): Promise<T>;
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDraftDefaultWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${id}/draft/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeDraftIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeDraftIssueType,
    callback?: never,
  ): Promise<T>;
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeDraftIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the workflow for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeDraftIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the workflow for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeDraftIssueType,
    callback?: never,
  ): Promise<T>;
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeDraftIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'PUT',
      data: parameters.details,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeDraftIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeDraftIssueType,
    callback?: never,
  ): Promise<T>;
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeDraftIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Publishes a draft workflow scheme.
   *
   * Where the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues
   * with the original workflow status to the new workflow status.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-3-task-taskId-get) to obtain updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async publishDraftWorkflowScheme<T = void>(
    parameters: Parameters.PublishDraftWorkflowScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Publishes a draft workflow scheme.
   *
   * Where the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues
   * with the original workflow status to the new workflow status.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-3-task-taskId-get) to obtain updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async publishDraftWorkflowScheme<T = void>(
    parameters: Parameters.PublishDraftWorkflowScheme | string,
    callback?: never,
  ): Promise<T>;
  async publishDraftWorkflowScheme<T = void>(
    parameters: Parameters.PublishDraftWorkflowScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${id}/draft/publish`,
      method: 'POST',
      params: {
        validateOnly: typeof parameters !== 'string' && parameters.validateOnly,
      },
      data: {
        statusMappings: typeof parameters !== 'string' && parameters.statusMappings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the workflow-issue type mappings for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetDraftWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the workflow-issue type mappings for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetDraftWorkflow,
    callback?: never,
  ): Promise<T>;
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetDraftWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'GET',
      params: {
        workflowName: parameters.workflowName,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default
   * workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDraftWorkflowMapping,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default
   * workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDraftWorkflowMapping,
    callback?: never,
  ): Promise<T>;
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDraftWorkflowMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'PUT',
      params: {
        workflowName: parameters.workflowName,
      },
      data: {
        defaultMapping: parameters.defaultMapping,
        issueTypes: parameters.issueTypes,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDraftWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteDraftWorkflowMapping,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDraftWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteDraftWorkflowMapping,
    callback?: never,
  ): Promise<T>;
  async deleteDraftWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteDraftWorkflowMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'DELETE',
      params: {
        workflowName: parameters.workflowName,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
