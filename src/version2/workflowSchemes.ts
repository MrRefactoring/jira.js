import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class WorkflowSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * workflow schemes, not including draft workflow schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflowSchemes<T = Models.PageWorkflowScheme>(
    parameters: Parameters.GetAllWorkflowSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * workflow schemes, not including draft workflow schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflowSchemes<T = Models.PageWorkflowScheme>(
    parameters?: Parameters.GetAllWorkflowSchemes,
    callback?: never,
  ): Promise<T>;
  async getAllWorkflowSchemes<T = Models.PageWorkflowScheme>(
    parameters?: Parameters.GetAllWorkflowSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflowscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowScheme,
    callback?: never,
  ): Promise<T>;
  async createWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.CreateWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflowscheme',
      method: 'POST',
      data: {
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

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of workflow schemes by providing workflow scheme IDs or project IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflow schemes
   * - _Administer projects_ project permissions to access project-scoped workflow schemes
   */
  async readWorkflowSchemes<T = Models.WorkflowSchemeReadResponse[]>(
    parameters: Parameters.ReadWorkflowSchemes,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of workflow schemes by providing workflow scheme IDs or project IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflow schemes
   * - _Administer projects_ project permissions to access project-scoped workflow schemes
   */
  async readWorkflowSchemes<T = Models.WorkflowSchemeReadResponse[]>(
    parameters: Parameters.ReadWorkflowSchemes,
    callback?: never,
  ): Promise<T>;
  async readWorkflowSchemes<T = Models.WorkflowSchemeReadResponse[]>(
    parameters: Parameters.ReadWorkflowSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflowscheme/read',
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        projectIds: parameters.projectIds,
        workflowSchemeIds: parameters.workflowSchemeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any
   * changes made to a workflow scheme are immediately available. When changing the available statuses for issue types,
   * an [asynchronous task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations)
   * migrates the issues as defined in the provided mappings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to update all, including global-scoped, workflow schemes.
   * - _Administer projects_ project permission to update project-scoped workflow schemes.
   */
  async updateSchemes<T = unknown>(parameters: Parameters.UpdateSchemes, callback: Callback<T>): Promise<void>;
  /**
   * Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any
   * changes made to a workflow scheme are immediately available. When changing the available statuses for issue types,
   * an [asynchronous task](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations)
   * migrates the issues as defined in the provided mappings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to update all, including global-scoped, workflow schemes.
   * - _Administer projects_ project permission to update project-scoped workflow schemes.
   */
  async updateSchemes<T = unknown>(parameters: Parameters.UpdateSchemes, callback?: never): Promise<T>;
  async updateSchemes<T = unknown>(parameters: Parameters.UpdateSchemes, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflowscheme/update',
      method: 'POST',
      data: {
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

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue
   * type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow,
   * or both.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ permission to update all, including global-scoped, workflow schemes.
   * - _Administer projects_ project permission to update project-scoped workflow schemes.
   */
  async updateWorkflowSchemeMappings<T = Models.WorkflowSchemeUpdateRequiredMappingsResponse>(
    parameters: Parameters.UpdateWorkflowSchemeMappings,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue
   * type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow,
   * or both.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ permission to update all, including global-scoped, workflow schemes.
   * - _Administer projects_ project permission to update project-scoped workflow schemes.
   */
  async updateWorkflowSchemeMappings<T = Models.WorkflowSchemeUpdateRequiredMappingsResponse>(
    parameters: Parameters.UpdateWorkflowSchemeMappings,
    callback?: never,
  ): Promise<T>;
  async updateWorkflowSchemeMappings<T = Models.WorkflowSchemeUpdateRequiredMappingsResponse>(
    parameters: Parameters.UpdateWorkflowSchemeMappings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflowscheme/update/mappings',
      method: 'POST',
      data: {
        defaultWorkflowId: parameters.defaultWorkflowId,
        id: parameters.id,
        workflowsForIssueTypes: parameters.workflowsForIssueTypes,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowScheme | string,
    callback?: never,
  ): Promise<T>;
  async getWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.GetWorkflowScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${id}`,
      method: 'GET',
      params: {
        returnDraftIfExists: typeof parameters !== 'string' && parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a company-manged project workflow scheme, including the name, default workflow, issue type to project
   * mappings, and more. If the workflow scheme is active (that is, being used by at least one project), then a draft
   * workflow scheme is created or updated instead, provided that `updateDraftIfNeeded` is set to `true`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a company-manged project workflow scheme, including the name, default workflow, issue type to project
   * mappings, and more. If the workflow scheme is active (that is, being used by at least one project), then a draft
   * workflow scheme is created or updated instead, provided that `updateDraftIfNeeded` is set to `true`.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowScheme,
    callback?: never,
  ): Promise<T>;
  async updateWorkflowScheme<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
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
   * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at
   * least one project).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowScheme<T = void>(
    parameters: Parameters.DeleteWorkflowScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at
   * least one project).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowScheme<T = void>(
    parameters: Parameters.DeleteWorkflowScheme | string,
    callback?: never,
  ): Promise<T>;
  async deleteWorkflowScheme<T = void>(
    parameters: Parameters.DeleteWorkflowScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue
   * types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue Types_ listed
   * in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDefaultWorkflow | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the default workflow for a workflow scheme. The default workflow is the workflow that is assigned any issue
   * types that have not been mapped to any other workflow. The default workflow has _All Unassigned Issue Types_ listed
   * in its issue types for the workflow scheme in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDefaultWorkflow | string,
    callback?: never,
  ): Promise<T>;
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(
    parameters: Parameters.GetDefaultWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${id}/default`,
      method: 'GET',
      params: {
        returnDraftIfExists: typeof parameters !== 'string' && parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the default workflow for a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request object and a draft workflow scheme is created or updated with the new default workflow. The
   * draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDefaultWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the default workflow for a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request object and a draft workflow scheme is created or updated with the new default workflow. The
   * draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDefaultWorkflow,
    callback?: never,
  ): Promise<T>;
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateDefaultWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'PUT',
      data: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
        workflow: parameters.workflow,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow
   * (the _jira_ workflow).
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the default workflow reset. The draft workflow scheme
   * can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDefaultWorkflow | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow
   * (the _jira_ workflow).
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the default workflow reset. The draft workflow scheme
   * can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDefaultWorkflow | string,
    callback?: never,
  ): Promise<T>;
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteDefaultWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${id}/default`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: typeof parameters !== 'string' && parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeIssueType,
    callback?: never,
  ): Promise<T>;
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(
    parameters: Parameters.GetWorkflowSchemeIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the workflow for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new issue type-workflow
   * mapping. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the workflow for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new issue type-workflow
   * mapping. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeIssueType,
    callback?: never,
  ): Promise<T>;
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.SetWorkflowSchemeIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'PUT',
      data: parameters.details,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the issue type-workflow mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes the issue type-workflow mapping for an issue type in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the issue type-workflow mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeIssueType,
    callback?: never,
  ): Promise<T>;
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(
    parameters: Parameters.DeleteWorkflowSchemeIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the workflow-issue type mappings for a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetWorkflow | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the workflow-issue type mappings for a workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetWorkflow | string,
    callback?: never,
  ): Promise<T>;
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(
    parameters: Parameters.GetWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${id}/workflow`,
      method: 'GET',
      params: {
        workflowName: typeof parameters !== 'string' && parameters.workflowName,
        returnDraftIfExists: typeof parameters !== 'string' && parameters.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the issue types for a workflow in a workflow scheme. The workflow can also be set as the default workflow for
   * the workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new workflow-issue types
   * mappings. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowMapping,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the issue types for a workflow in a workflow scheme. The workflow can also be set as the default workflow for
   * the workflow scheme. Unmapped issues types are mapped to the default workflow.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` in the request body and a draft workflow scheme is created or updated with the new workflow-issue types
   * mappings. The draft workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowMapping,
    callback?: never,
  ): Promise<T>;
  async updateWorkflowMapping<T = Models.WorkflowScheme>(
    parameters: Parameters.UpdateWorkflowMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
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
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the workflow-issue type mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteWorkflowMapping | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes the workflow-issue type mapping for a workflow in a workflow scheme.
   *
   * Note that active workflow schemes cannot be edited. If the workflow scheme is active, set `updateDraftIfNeeded` to
   * `true` and a draft workflow scheme is created or updated with the workflow-issue type mapping deleted. The draft
   * workflow scheme can be published in Jira.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteWorkflowMapping | string,
    callback?: never,
  ): Promise<T>;
  async deleteWorkflowMapping<T = unknown>(
    parameters: Parameters.DeleteWorkflowMapping | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${id}/workflow`,
      method: 'DELETE',
      params: {
        workflowName: typeof parameters !== 'string' && parameters.workflowName,
        updateDraftIfNeeded: typeof parameters !== 'string' && parameters.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a page of projects using a given workflow scheme. */
  async getProjectUsagesForWorkflowScheme<T = Models.WorkflowSchemeProjectUsage>(
    parameters: Parameters.GetProjectUsagesForWorkflowScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of projects using a given workflow scheme. */
  async getProjectUsagesForWorkflowScheme<T = Models.WorkflowSchemeProjectUsage>(
    parameters: Parameters.GetProjectUsagesForWorkflowScheme,
    callback?: never,
  ): Promise<T>;
  async getProjectUsagesForWorkflowScheme<T = Models.WorkflowSchemeProjectUsage>(
    parameters: Parameters.GetProjectUsagesForWorkflowScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.workflowSchemeId}/projectUsages`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Switches a workflow scheme for a project.
   *
   * Workflow schemes can only be assigned to classic projects.
   *
   * **Calculating required mappings:** If statuses from the current workflow scheme won't exist in the target workflow
   * scheme, you must provide `mappingsByIssueTypeOverride` to specify how issues with those statuses should be
   * migrated. Use [the required workflow scheme mappings API](#api-rest-api-2-workflowscheme-update-mappings-post) to
   * determine which statuses and issue types require mappings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async switchWorkflowSchemeForProject<T = unknown>(
    parameters: Parameters.SwitchWorkflowSchemeForProject,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Switches a workflow scheme for a project.
   *
   * Workflow schemes can only be assigned to classic projects.
   *
   * **Calculating required mappings:** If statuses from the current workflow scheme won't exist in the target workflow
   * scheme, you must provide `mappingsByIssueTypeOverride` to specify how issues with those statuses should be
   * migrated. Use [the required workflow scheme mappings API](#api-rest-api-2-workflowscheme-update-mappings-post) to
   * determine which statuses and issue types require mappings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async switchWorkflowSchemeForProject<T = unknown>(
    parameters: Parameters.SwitchWorkflowSchemeForProject,
    callback?: never,
  ): Promise<T>;
  async switchWorkflowSchemeForProject<T = unknown>(
    parameters: Parameters.SwitchWorkflowSchemeForProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflowscheme/project/switch',
      method: 'POST',
      data: {
        mappingsByIssueTypeOverride: parameters.mappingsByIssueTypeOverride,
        projectId: parameters.projectId,
        targetSchemeId: parameters.targetSchemeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
