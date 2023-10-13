import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { paramSerializer } from '../paramSerializer';
import { RequestConfig } from '../requestConfig';

export class Workflows {
  constructor(private client: Client) {}

  /**
   * Creates a workflow. Workflow transitions are created with the default system transition rules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a workflow. Workflow transitions are created with the default system transition rules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(parameters: Parameters.CreateWorkflow, callback?: never): Promise<T>;
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflow',
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
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise,
   * all published classic workflows are returned.
   *
   * This operation does not return next-gen workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageWorkflow>(
    parameters: Parameters.GetWorkflowsPaginated | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise,
   * all published classic workflows are returned.
   *
   * This operation does not return next-gen workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
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
      url: '/rest/api/2/workflow/search',
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteInactiveWorkflow<T = void>(
    parameters: Parameters.DeleteInactiveWorkflow | string,
    callback?: never,
  ): Promise<T>;
  async deleteInactiveWorkflow<T = void>(
    parameters: Parameters.DeleteInactiveWorkflow | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const entityId = typeof parameters === 'string' ? parameters : parameters.entityId;

    const config: RequestConfig = {
      url: `/rest/api/2/workflow/${entityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue
   * types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async readWorkflows<T = Models.WorkflowRead>(
    parameters: Parameters.ReadWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue
   * types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ global permission to access all, including project-scoped, workflows
   * - At least one of the _Administer projects_ and _View (read-only) workflow_ project permissions to access
   *   project-scoped workflows
   */
  async readWorkflows<T = Models.WorkflowRead>(parameters: Parameters.ReadWorkflows, callback?: never): Promise<T>;
  async readWorkflows<T = Models.WorkflowRead>(
    parameters: Parameters.ReadWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflows',
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: {
        projectAndIssueTypes: parameters.projectAndIssueTypes,
        workflowIds: parameters.workflowIds,
        workflowNames: parameters.workflowNames,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Get the list of workflow capabilities for a specific workflow using either the workflow ID, or the project and
   * issue type ID pair. The response includes the scope of the workflow, defined as global/project-based, and a list of
   * project types that the workflow is scoped to. It also includes all rules organized into their broad categories
   * (conditions, validators, actions, triggers, screens) as well as the source location (Atlassian-provided, Connect,
   * Forge).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to access all, including global-scoped, workflows
   * - _Administer projects_ project permissions to access project-scoped workflows
   */
  async workflowCapabilities<T = Models.WorkflowCapabilities>(
    parameters: Parameters.WorkflowCapabilities,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Get the list of workflow capabilities for a specific workflow using either the workflow ID, or the project and
   * issue type ID pair. The response includes the scope of the workflow, defined as global/project-based, and a list of
   * project types that the workflow is scoped to. It also includes all rules organized into their broad categories
   * (conditions, validators, actions, triggers, screens) as well as the source location (Atlassian-provided, Connect,
   * Forge).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to access all, including global-scoped, workflows
   * - _Administer projects_ project permissions to access project-scoped workflows
   */
  async workflowCapabilities<T = Models.WorkflowCapabilities>(
    parameters: Parameters.WorkflowCapabilities,
    callback?: never,
  ): Promise<T>;
  async workflowCapabilities<T = Models.WorkflowCapabilities>(
    parameters: Parameters.WorkflowCapabilities,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflows/capabilities',
      method: 'GET',
      params: {
        workflowId: parameters.workflowId,
        projectId: parameters.projectId,
        issueTypeId: parameters.issueTypeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Create workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async createWorkflows<T = Models.WorkflowCreateResponse>(
    parameters: Parameters.CreateWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Create workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async createWorkflows<T = Models.WorkflowCreateResponse>(
    parameters: Parameters.CreateWorkflows,
    callback?: never,
  ): Promise<T>;
  async createWorkflows<T = Models.WorkflowCreateResponse>(
    parameters: Parameters.CreateWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflows/create',
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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
      url: '/rest/api/2/workflows/create/validation',
      method: 'POST',
      data: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async updateWorkflows<T = Models.WorkflowUpdateResponse>(
    parameters: Parameters.UpdateWorkflows,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update workflows and related statuses.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ project permission to create all, including global-scoped, workflows
   * - _Administer projects_ project permissions to create project-scoped workflows
   */
  async updateWorkflows<T = Models.WorkflowUpdateResponse>(
    parameters: Parameters.UpdateWorkflows,
    callback?: never,
  ): Promise<T>;
  async updateWorkflows<T = Models.WorkflowUpdateResponse>(
    parameters: Parameters.UpdateWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflows/update',
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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
      url: '/rest/api/2/workflows/update/validation',
      method: 'POST',
      data: {
        payload: parameters.payload,
        validationOptions: parameters.validationOptions,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
