import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import { paramSerializer } from '../paramSerializer';
import type { RequestConfig } from '../requestConfig';

export class Workflows {
  constructor(private client: Client) {}

  /**
   * @deprecated This will be removed on [February 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2568); use [Bulk create
   *   workflows](#api-rest-api-3-workflows-create-post) to create both team and company-managed scoped workflows.
   *
   *   Creates a workflow. You can define transition rules using the shapes detailed in the following sections. If no
   *   transitional rules are specified the default system transition rules are used. Note: This only applies to
   *   company-managed scoped workflows. Use [bulk create
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-create-post)
   *   to create both team and company-managed scoped workflows.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This will be removed on [February 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2568); use [Bulk create
   *   workflows](#api-rest-api-3-workflows-create-post) to create both team and company-managed scoped workflows.
   *
   *   Creates a workflow. You can define transition rules using the shapes detailed in the following sections. If no
   *   transitional rules are specified the default system transition rules are used. Note: This only applies to
   *   company-managed scoped workflows. Use [bulk create
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-create-post)
   *   to create both team and company-managed scoped workflows.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(parameters: Parameters.CreateWorkflow, callback?: never): Promise<T>;
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow',
      method: 'POST',
      data: {
        description: parameters.description,
        name: parameters.name,
        statuses: parameters.statuses,
        transitions: parameters.transitions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a workflow and related statuses for a specified workflow id and version number.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async readWorkflowFromHistory<T = Models.WorkflowHistoryReadResponse>(
    parameters: Parameters.ReadWorkflowFromHistory,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a workflow and related statuses for a specified workflow id and version number.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async readWorkflowFromHistory<T = Models.WorkflowHistoryReadResponse>(
    parameters: Parameters.ReadWorkflowFromHistory,
    callback?: never,
  ): Promise<T>;
  async readWorkflowFromHistory<T = Models.WorkflowHistoryReadResponse>(
    parameters: Parameters.ReadWorkflowFromHistory,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow/history',
      method: 'POST',
      data: {
        version: parameters.version,
        workflowId: parameters.workflowId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of workflow history entries for a specified workflow id.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async listWorkflowHistory<T = Models.WorkflowHistoryListResponse>(
    parameters: Parameters.ListWorkflowHistory,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of workflow history entries for a specified workflow id.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async listWorkflowHistory<T = Models.WorkflowHistoryListResponse>(
    parameters: Parameters.ListWorkflowHistory,
    callback?: never,
  ): Promise<T>;
  async listWorkflowHistory<T = Models.WorkflowHistoryListResponse>(
    parameters: Parameters.ListWorkflowHistory,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow/history/list',
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        workflowId: parameters.workflowId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2569); use [Search
   *   workflows](#api-rest-api-3-workflows-search-get) instead.
   *
   *   Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   *   published classic workflows. When workflow names are specified, details of those workflows are returned.
   *   Otherwise, all published classic workflows are returned.
   *
   *   This operation does not return next-gen workflows.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters: Parameters.GetWorkflowsPaginated | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2569); use [Search
   *   workflows](#api-rest-api-3-workflows-search-get) instead.
   *
   *   Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   *   published classic workflows. When workflow names are specified, details of those workflows are returned.
   *   Otherwise, all published classic workflows are returned.
   *
   *   This operation does not return next-gen workflows.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters?: Parameters.GetWorkflowsPaginated,
    callback?: never,
  ): Promise<T>;
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters?: Parameters.GetWorkflowsPaginated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        workflowName: paramSerializer('workflowName', parameters?.workflowName),
        expand: parameters?.expand,
        queryString: parameters?.queryString,
        orderBy: parameters?.orderBy,
        isActive: parameters?.isActive,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a workflow.
   *
   * The workflow cannot be deleted if it is:
   *
   * - An active workflow.
   * - A system workflow.
   * - Associated with any workflow scheme.
   * - Associated with any draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteInactiveWorkflow<T = void>(
    parameters: Parameters.DeleteInactiveWorkflow | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a workflow.
   *
   * The workflow cannot be deleted if it is:
   *
   * - An active workflow.
   * - A system workflow.
   * - Associated with any workflow scheme.
   * - Associated with any draft workflow scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteInactiveWorkflow<T = void>(
    parameters: Parameters.DeleteInactiveWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const entityId = typeof parameters === 'string' ? parameters : parameters.entityId;

    const config: RequestConfig = {
      url: `/rest/api/3/workflow/${entityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a page of issue types using a given workflow within a project. */
  async getWorkflowProjectIssueTypeUsages<T = Models.WorkflowProjectIssueTypeUsage>(
    parameters: Parameters.GetWorkflowProjectIssueTypeUsages,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of issue types using a given workflow within a project. */
  async getWorkflowProjectIssueTypeUsages<T = Models.WorkflowProjectIssueTypeUsage>(
    parameters: Parameters.GetWorkflowProjectIssueTypeUsages,
    callback?: never,
  ): Promise<T>;
  async getWorkflowProjectIssueTypeUsages<T = Models.WorkflowProjectIssueTypeUsage>(
    parameters: Parameters.GetWorkflowProjectIssueTypeUsages,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/${parameters.workflowId}/project/${parameters.projectId}/issueTypeUsages`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a page of projects using a given workflow. */
  async getProjectUsagesForWorkflow<T = Models.WorkflowProjectUsage>(
    parameters: Parameters.GetProjectUsagesForWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of projects using a given workflow. */
  async getProjectUsagesForWorkflow<T = Models.WorkflowProjectUsage>(
    parameters: Parameters.GetProjectUsagesForWorkflow,
    callback?: never,
  ): Promise<T>;
  async getProjectUsagesForWorkflow<T = Models.WorkflowProjectUsage>(
    parameters: Parameters.GetProjectUsagesForWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/${parameters.workflowId}/projectUsages`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a page of workflow schemes using a given workflow. */
  async getWorkflowSchemeUsagesForWorkflow<T = Models.WorkflowSchemeUsage>(
    parameters: Parameters.GetWorkflowSchemeUsagesForWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of workflow schemes using a given workflow. */
  async getWorkflowSchemeUsagesForWorkflow<T = Models.WorkflowSchemeUsage>(
    parameters: Parameters.GetWorkflowSchemeUsagesForWorkflow,
    callback?: never,
  ): Promise<T>;
  async getWorkflowSchemeUsagesForWorkflow<T = Models.WorkflowSchemeUsage>(
    parameters: Parameters.GetWorkflowSchemeUsagesForWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/${parameters.workflowId}/workflowSchemes`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue
   * types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async readWorkflows<T = Models.WorkflowRead>(
    parameters: Parameters.ReadWorkflows | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue
   * types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async readWorkflows<T = Models.WorkflowRead>(parameters?: Parameters.ReadWorkflows, callback?: never): Promise<T>;
  async readWorkflows<T = Models.WorkflowRead>(
    parameters?: Parameters.ReadWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows',
      method: 'POST',
      params: {
        useTransitionLinksFormat: parameters?.useTransitionLinksFormat,
        useApprovalConfiguration: parameters?.useApprovalConfiguration,
      },
      data: {
        projectAndIssueTypes: parameters?.projectAndIssueTypes,
        workflowIds: parameters?.workflowIds,
        workflowNames: parameters?.workflowNames,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get the list of workflow capabilities for a specific workflow using either the workflow ID, or the project and
   * issue type ID pair. The response includes the scope of the workflow, defined as global/project-based, and a list of
   * project types that the workflow is scoped to. It also includes all rules organised into their broad categories
   * (conditions, validators, actions, triggers, screens) as well as the source location (Atlassian-provided, Connect,
   * Forge).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to access all, including global-scoped, workflows
   * - _Administer projects_ project permissions to access project-scoped workflows
   */
  async workflowCapabilities<T = Models.WorkflowCapabilities>(
    parameters: Parameters.WorkflowCapabilities | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Get the list of workflow capabilities for a specific workflow using either the workflow ID, or the project and
   * issue type ID pair. The response includes the scope of the workflow, defined as global/project-based, and a list of
   * project types that the workflow is scoped to. It also includes all rules organised into their broad categories
   * (conditions, validators, actions, triggers, screens) as well as the source location (Atlassian-provided, Connect,
   * Forge).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to access all, including global-scoped, workflows
   * - _Administer projects_ project permissions to access project-scoped workflows
   */
  async workflowCapabilities<T = Models.WorkflowCapabilities>(
    parameters?: Parameters.WorkflowCapabilities,
    callback?: never,
  ): Promise<T>;
  async workflowCapabilities<T = Models.WorkflowCapabilities>(
    parameters?: Parameters.WorkflowCapabilities,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/capabilities',
      method: 'GET',
      params: {
        workflowId: parameters?.workflowId,
        projectId: parameters?.projectId,
        issueTypeId: parameters?.issueTypeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Create workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async createWorkflows<T = Models.WorkflowCreate>(
    parameters: Parameters.CreateWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Create workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async createWorkflows<T = Models.WorkflowCreate>(
    parameters: Parameters.CreateWorkflows,
    callback?: never,
  ): Promise<T>;
  async createWorkflows<T = Models.WorkflowCreate>(
    parameters: Parameters.CreateWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/create',
      method: 'POST',
      data: {
        scope: parameters.scope,
        statuses: parameters.statuses,
        workflows: parameters.workflows,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Validate the payload for bulk create workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async validateCreateWorkflows<T = Models.WorkflowValidationErrorList>(
    parameters: Parameters.ValidateCreateWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Validate the payload for bulk create workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async validateCreateWorkflows<T = Models.WorkflowValidationErrorList>(
    parameters: Parameters.ValidateCreateWorkflows,
    callback?: never,
  ): Promise<T>;
  async validateCreateWorkflows<T = Models.WorkflowValidationErrorList>(
    parameters: Parameters.ValidateCreateWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/create/validation',
      method: 'POST',
      data: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get the user's default workflow editor. This can be either the new editor or the legacy editor. */
  async getDefaultEditor<T = Models.DefaultWorkflowEditorResponse>(callback: Callback<T>): Promise<void>;
  /** Get the user's default workflow editor. This can be either the new editor or the legacy editor. */
  async getDefaultEditor<T = Models.DefaultWorkflowEditorResponse>(callback?: never): Promise<T>;
  async getDefaultEditor<T = Models.DefaultWorkflowEditorResponse>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/defaultEditor',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a requested workflow within a given project. The response provides a read-only preview of the workflow,
   * omitting full configuration details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions
   */
  async readWorkflowPreviews<T = Models.WorkflowPreviewResponse>(
    parameters: Parameters.ReadWorkflowPreviews,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a requested workflow within a given project. The response provides a read-only preview of the workflow,
   * omitting full configuration details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions
   */
  async readWorkflowPreviews<T = Models.WorkflowPreviewResponse>(
    parameters: Parameters.ReadWorkflowPreviews,
    callback?: never,
  ): Promise<T>;
  async readWorkflowPreviews<T = Models.WorkflowPreviewResponse>(
    parameters: Parameters.ReadWorkflowPreviews,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/preview',
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
        projectId: parameters.projectId,
        workflowIds: parameters.workflowIds,
        workflowNames: parameters.workflowNames,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of global
   * and project workflows. If workflow names are specified in the query string, details of those workflows are
   * returned. Otherwise, all workflows are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async searchWorkflows<T = Models.WorkflowSearchResponse>(
    parameters: Parameters.SearchWorkflows | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of global
   * and project workflows. If workflow names are specified in the query string, details of those workflows are
   * returned. Otherwise, all workflows are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async searchWorkflows<T = Models.WorkflowSearchResponse>(
    parameters?: Parameters.SearchWorkflows,
    callback?: never,
  ): Promise<T>;
  async searchWorkflows<T = Models.WorkflowSearchResponse>(
    parameters?: Parameters.SearchWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
        queryString: parameters?.queryString,
        orderBy: parameters?.orderBy,
        scope: parameters?.scope,
        isActive: parameters?.isActive,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async updateWorkflows<T = Models.WorkflowUpdate>(
    parameters: Parameters.UpdateWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async updateWorkflows<T = Models.WorkflowUpdate>(
    parameters: Parameters.UpdateWorkflows,
    callback?: never,
  ): Promise<T>;
  async updateWorkflows<T = Models.WorkflowUpdate>(
    parameters: Parameters.UpdateWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/update',
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        statuses: parameters.statuses,
        workflows: parameters.workflows,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Validate the payload for bulk update workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async validateUpdateWorkflows<T = Models.WorkflowValidationErrorList>(
    parameters: Parameters.ValidateUpdateWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Validate the payload for bulk update workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async validateUpdateWorkflows<T = Models.WorkflowValidationErrorList>(
    parameters: Parameters.ValidateUpdateWorkflows,
    callback?: never,
  ): Promise<T>;
  async validateUpdateWorkflows<T = Models.WorkflowValidationErrorList>(
    parameters: Parameters.ValidateUpdateWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflows/update/validation',
      method: 'POST',
      data: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
