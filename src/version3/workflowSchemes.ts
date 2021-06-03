import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * workflow schemes, not including draft workflow schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(
    parameters: Parameters.GetAllWorkflowSchemes | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * workflow schemes, not including draft workflow schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(
    parameters?: Parameters.GetAllWorkflowSchemes,
    callback?: never
  ): Promise<T>;
  async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(
    parameters?: Parameters.GetAllWorkflowSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflowscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.getAllWorkflowSchemes' });
  }

  /**
   * Creates a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowScheme | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowScheme<T = Models.WorkflowScheme>(
    parameters?: Parameters.CreateWorkflowScheme,
    callback?: never
  ): Promise<T>;
  async createWorkflowScheme<T = Models.WorkflowScheme>(
    parameters?: Parameters.CreateWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflowscheme',
      method: 'POST',
      data: {
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
        defaultWorkflow: parameters?.defaultWorkflow,
        issueTypeMappings: parameters?.issueTypeMappings,
        originalDefaultWorkflow: parameters?.originalDefaultWorkflow,
        originalIssueTypeMappings: parameters?.originalIssueTypeMappings,
        draft: parameters?.draft,
        lastModifiedUser: parameters?.lastModifiedUser,
        lastModified: parameters?.lastModified,
        self: parameters?.self,
        updateDraftIfNeeded: parameters?.updateDraftIfNeeded,
        issueTypes: parameters?.issueTypes,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.createWorkflowScheme' });
  }

  /**
   * Returns a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowScheme,
    callback?: never
  ): Promise<T>;
  async getWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.getWorkflowScheme' });
  }

  /**
   * Updates a workflow scheme, including the name, default workflow, issue type to project mappings, and more. If the
   * workflow scheme is active (that is, being used by at least one project), then a draft workflow scheme is created or
   * updated instead, provided that `updateDraftIfNeeded` is set to `true`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a workflow scheme, including the name, default workflow, issue type to project mappings, and more. If the
   * workflow scheme is active (that is, being used by at least one project), then a draft workflow scheme is created or
   * updated instead, provided that `updateDraftIfNeeded` is set to `true`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowScheme,
    callback?: never
  ): Promise<T>;
  async updateWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        defaultWorkflow: parameters.defaultWorkflow,
        issueTypeMappings: parameters.issueTypeMappings,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.updateWorkflowScheme' });
  }

  /**
   * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at
   * least one project).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowScheme<T = void>(
    parameters: Parameters.DeleteWorkflowScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at
   * least one project).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowScheme<T = void>(parameters: Parameters.DeleteWorkflowScheme, callback?: never): Promise<T>;
  async deleteWorkflowScheme<T = void>(
    parameters: Parameters.DeleteWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.deleteWorkflowScheme' });
  }

  /**
   * Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue
   * types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed
   * in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDefaultWorkflow,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue
   * types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed
   * in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDefaultWorkflow,
    callback?: never
  ): Promise<T>;
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDefaultWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/default`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.getDefaultWorkflow' });
  }

  /**
   * Sets the default workflow for a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request object and a draft workflow scheme is created or updated with the new default workflow. The
   * draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDefaultWorkflow,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the default workflow for a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request object and a draft workflow scheme is created or updated with the new default workflow. The
   * draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDefaultWorkflow,
    callback?: never
  ): Promise<T>;
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDefaultWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/default`,
      method: 'PUT',
      data: {
        workflow: parameters.workflow,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.updateDefaultWorkflow' });
  }

  /**
   * Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow
   * (the *jira* workflow).
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the default workflow reset. The draft workflow scheme
   * can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDefaultWorkflow,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow
   * (the *jira* workflow).
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the default workflow reset. The draft workflow scheme
   * can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDefaultWorkflow,
    callback?: never
  ): Promise<T>;
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDefaultWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/default`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.deleteDefaultWorkflow' });
  }

  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeIssueType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeIssueType,
    callback?: never
  ): Promise<T>;
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.workflowSchemes.getWorkflowSchemeIssueType',
    });
  }

  /**
   * Sets the workflow for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new issue type-workflow
   * mapping. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeIssueType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the workflow for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new issue type-workflow
   * mapping. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeIssueType,
    callback?: never
  ): Promise<T>;
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'PUT',
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.workflowSchemes.setWorkflowSchemeIssueType',
    });
  }

  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the issue type-workflow mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeIssueType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the issue type-workflow mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeIssueType,
    callback?: never
  ): Promise<T>;
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.workflowSchemes.deleteWorkflowSchemeIssueType',
    });
  }

  /**
   * Returns the workflow-issue type mappings for a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetWorkflow,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the workflow-issue type mappings for a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetWorkflow,
    callback?: never
  ): Promise<T>;
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/workflow`,
      method: 'GET',
      params: {
        workflowName: parameters.workflowName,
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.getWorkflow' });
  }

  /**
   * Sets the issue types for a workflow in a workflow scheme. The workflow can also be set as the default workflow for
   * the workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new workflow-issue types
   * mappings. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowMapping,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the issue types for a workflow in a workflow scheme. The workflow can also be set as the default workflow for
   * the workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new workflow-issue types
   * mappings. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowMapping,
    callback?: never
  ): Promise<T>;
  async updateWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/workflow`,
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.updateWorkflowMapping' });
  }

  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the workflow-issue type mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteWorkflowMapping,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the workflow-issue type mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowMapping<T = unknown>(parameters: Parameters.DeleteWorkflowMapping, callback?: never): Promise<T>;
  async deleteWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteWorkflowMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflowscheme/${parameters.id}/workflow`,
      method: 'DELETE',
      params: {
        workflowName: parameters.workflowName,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.workflowSchemes.deleteWorkflowMapping' });
  }
}
