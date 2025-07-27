import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import { paramSerializer } from '../paramSerializer';
import type { Request } from '../request';

export class Workflows {
  constructor(private client: Client) {}

  /**
   * Creates a workflow. You can define transition rules using the shapes detailed in the following sections. If no
   * transitional rules are specified the default system transition rules are used. Note: This only applies to
   * company-managed scoped workflows. Use [bulk create
   * workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-create-post)
   * to create both team and company-managed scoped workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a workflow. You can define transition rules using the shapes detailed in the following sections. If no
   * transitional rules are specified the default system transition rules are used. Note: This only applies to
   * company-managed scoped workflows. Use [bulk create
   * workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-create-post)
   * to create both team and company-managed scoped workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(parameters: Parameters.CreateWorkflow, callback?: never): Promise<T>;
  async createWorkflow<T = Models.WorkflowId>(parameters: Parameters.CreateWorkflow): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflow',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
        statuses: parameters.statuses,
        transitions: parameters.transitions,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise,
   * all published classic workflows are returned.
   *
   * This operation does not return next-gen workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters: Parameters.GetWorkflowsPaginated | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise,
   * all published classic workflows are returned.
   *
   * This operation does not return next-gen workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters?: Parameters.GetWorkflowsPaginated,
    callback?: never,
  ): Promise<T>;
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters?: Parameters.GetWorkflowsPaginated,
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflow/search',
      method: 'GET',
      query: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        workflowName: paramSerializer('workflowName', parameters?.workflowName),
        expand: parameters?.expand,
        queryString: parameters?.queryString,
        orderBy: parameters?.orderBy,
        isActive: parameters?.isActive,
      },
    };

    return this.client.sendRequest(config);
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
  async deleteInactiveWorkflow<T = void>(parameters: Parameters.DeleteInactiveWorkflow | string): Promise<void | T> {
    const entityId = typeof parameters === 'string' ? parameters : parameters.entityId;

    const config: Request = {
      url: `/rest/api/3/workflow/${entityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config);
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
  ): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/workflow/${parameters.workflowId}/project/${parameters.projectId}/issueTypeUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config);
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
  ): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/workflow/${parameters.workflowId}/projectUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config);
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
  ): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/workflow/${parameters.workflowId}/workflowSchemes`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config);
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
  async readWorkflows<T = Models.WorkflowRead>(parameters?: Parameters.ReadWorkflows): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows',
      method: 'POST',
      query: {
        useTransitionLinksFormat: parameters?.useTransitionLinksFormat,
        useApprovalConfiguration: parameters?.useApprovalConfiguration,
      },
      body: {
        projectAndIssueTypes: parameters?.projectAndIssueTypes,
        workflowIds: parameters?.workflowIds,
        workflowNames: parameters?.workflowNames,
      },
    };

    return this.client.sendRequest(config);
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
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows/capabilities',
      method: 'GET',
      query: {
        workflowId: parameters?.workflowId,
        projectId: parameters?.projectId,
        issueTypeId: parameters?.issueTypeId,
      },
    };

    return this.client.sendRequest(config);
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
  async createWorkflows<T = Models.WorkflowCreate>(parameters: Parameters.CreateWorkflows): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows/create',
      method: 'POST',
      body: {
        scope: parameters.scope,
        statuses: parameters.statuses,
        workflows: parameters.workflows,
      },
    };

    return this.client.sendRequest(config);
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
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows/create/validation',
      method: 'POST',
      body: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of global
   * and project workflows. If workflow names are specified in query string, details of those workflows are returned.
   * Otherwise, all workflows are returned.
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
   * and project workflows. If workflow names are specified in query string, details of those workflows are returned.
   * Otherwise, all workflows are returned.
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
  async searchWorkflows<T = Models.WorkflowSearchResponse>(parameters?: Parameters.SearchWorkflows): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows/search',
      method: 'GET',
      query: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
        queryString: parameters?.queryString,
        orderBy: parameters?.orderBy,
        scope: parameters?.scope,
        isActive: parameters?.isActive,
      },
    };

    return this.client.sendRequest(config);
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
  async updateWorkflows<T = Models.WorkflowUpdate>(parameters: Parameters.UpdateWorkflows): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows/update',
      method: 'POST',
      query: {
        expand: parameters.expand,
      },
      body: {
        statuses: parameters.statuses,
        workflows: parameters.workflows,
      },
    };

    return this.client.sendRequest(config);
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
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/workflows/update/validation',
      method: 'POST',
      body: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(config);
  }
}
