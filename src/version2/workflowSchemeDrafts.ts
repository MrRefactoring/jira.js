import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemeDrafts {
  constructor(private client: Client) {
  }

  /**
   * Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(parameters: Parameters.CreateWorkflowSchemeDraftFromParent, callback: Callback<T>): Promise<void>;
  /**
   * Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(parameters: Parameters.CreateWorkflowSchemeDraftFromParent, callback?: never): Promise<T>;
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(parameters: Parameters.CreateWorkflowSchemeDraftFromParent, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/createdraft`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.createWorkflowSchemeDraftFromParent' });
  }

  /**
   * Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is modified, then the changes in the draft are copied back to the active workflow scheme. See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.
   * Note that:
   *
   *  *  Only active workflow schemes can have draft workflow schemes.
   *  *  An active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowSchemeDraft, callback: Callback<T>): Promise<void>;
  /**
   * Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is modified, then the changes in the draft are copied back to the active workflow scheme. See [Configuring workflow schemes](https://confluence.atlassian.com/x/tohKLg) for more information.
   * Note that:
   *
   *  *  Only active workflow schemes can have draft workflow schemes.
   *  *  An active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowSchemeDraft, callback?: never): Promise<T>;
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowSchemeDraft, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.getWorkflowSchemeDraft' });
  }

  /**
   * Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a draft is created. Note that an active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowSchemeDraft, callback: Callback<T>): Promise<void>;
  /**
   * Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a draft is created. Note that an active workflow scheme can only have one draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowSchemeDraft, callback?: never): Promise<T>;
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowSchemeDraft, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        defaultWorkflow: parameters.defaultWorkflow,
        issueTypeMappings: parameters.issueTypeMappings,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.updateWorkflowSchemeDraft' });
  }

  /**
   * Deletes a draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteWorkflowSchemeDraft<T = void>(parameters: Parameters.DeleteWorkflowSchemeDraft, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteWorkflowSchemeDraft<T = void>(parameters: Parameters.DeleteWorkflowSchemeDraft, callback?: never): Promise<T>;
  async deleteWorkflowSchemeDraft<T = void>(parameters: Parameters.DeleteWorkflowSchemeDraft, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.deleteWorkflowSchemeDraft' });
  }

  /**
   * Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned any issue types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDraftDefaultWorkflow, callback: Callback<T>): Promise<void>;
  /**
   * Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned any issue types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDraftDefaultWorkflow, callback?: never): Promise<T>;
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDraftDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.getDraftDefaultWorkflow' });
  }

  /**
   * Sets the default workflow for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftDefaultWorkflow, callback: Callback<T>): Promise<void>;
  /**
   * Sets the default workflow for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftDefaultWorkflow, callback?: never): Promise<T>;
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'PUT',
      data: {
        workflow: parameters.workflow,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.updateDraftDefaultWorkflow' });
  }

  /**
   * Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system workflow (the *jira* workflow).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDraftDefaultWorkflow, callback: Callback<T>): Promise<void>;
  /**
   * Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system workflow (the *jira* workflow).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDraftDefaultWorkflow, callback?: never): Promise<T>;
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDraftDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.deleteDraftDefaultWorkflow' });
  }

  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeDraftIssueType, callback: Callback<T>): Promise<void>;
  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeDraftIssueType, callback?: never): Promise<T>;
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeDraftIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.getWorkflowSchemeDraftIssueType' });
  }

  /**
   * Sets the workflow for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeDraftIssueType, callback: Callback<T>): Promise<void>;
  /**
   * Sets the workflow for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeDraftIssueType, callback?: never): Promise<T>;
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeDraftIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'PUT',
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.setWorkflowSchemeDraftIssueType' });
  }

  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeDraftIssueType, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeDraftIssueType, callback?: never): Promise<T>;
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeDraftIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.deleteWorkflowSchemeDraftIssueType' });
  }

  /**
   * Returns the workflow-issue type mappings for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetDraftWorkflow, callback: Callback<T>): Promise<void>;
  /**
   * Returns the workflow-issue type mappings for a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetDraftWorkflow, callback?: never): Promise<T>;
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetDraftWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'GET',
      params: {
        workflowName: parameters.workflowName,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.getDraftWorkflow' });
  }

  /**
   * Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftWorkflowMapping, callback: Callback<T>): Promise<void>;
  /**
   * Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftWorkflowMapping, callback?: never): Promise<T>;
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftWorkflowMapping, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'PUT',
      params: {
        workflowName: parameters.workflowName,
      },
      data: {
        workflow: parameters.workflow,
        issueTypes: parameters.issueTypes,
        defaultMapping: parameters.defaultMapping,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.updateDraftWorkflowMapping' });
  }

  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteDraftWorkflowMapping<T = unknown>(parameters: Parameters.DeleteDraftWorkflowMapping, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteDraftWorkflowMapping<T = unknown>(parameters: Parameters.DeleteDraftWorkflowMapping, callback?: never): Promise<T>;
  async deleteDraftWorkflowMapping<T = unknown>(parameters: Parameters.DeleteDraftWorkflowMapping, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'DELETE',
      params: {
        workflowName: parameters.workflowName,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflowSchemeDrafts.deleteDraftWorkflowMapping' });
  }
}
