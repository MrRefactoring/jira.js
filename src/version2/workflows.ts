import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Workflows {
  constructor(private client: Client) {}

  /**
   * @deprecated Returns all workflows in Jira or a workflow. Deprecated, use [Get workflows
   *   paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflows/#api-rest-api-2-workflow-search-get).
   *
   *   If the `workflowName` parameter is specified, the workflow is returned as an object (not in an array). Otherwise,
   *   an array of workflow objects is returned.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions)
   *   required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflows<T = Models.DeprecatedWorkflow[]>(
    parameters: Parameters.GetAllWorkflows | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Returns all workflows in Jira or a workflow. Deprecated, use [Get workflows
   *   paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflows/#api-rest-api-2-workflow-search-get).
   *
   *   If the `workflowName` parameter is specified, the workflow is returned as an object (not in an array). Otherwise,
   *   an array of workflow objects is returned.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions)
   *   required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllWorkflows<T = Models.DeprecatedWorkflow[]>(
    parameters?: Parameters.GetAllWorkflows,
    callback?: never
  ): Promise<T>;
  async getAllWorkflows<T = Models.DeprecatedWorkflow[]>(
    parameters?: Parameters.GetAllWorkflows,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflow',
      method: 'GET',
      params: {
        workflowName: parameters?.workflowName,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflows.getAllWorkflows' });
  }

  /**
   * Creates a workflow. Workflow transitions are created with the default system transition rules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a workflow. Workflow transitions are created with the default system transition rules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(parameters?: Parameters.CreateWorkflow, callback?: never): Promise<T>;
  async createWorkflow<T = Models.WorkflowId>(
    parameters?: Parameters.CreateWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflow',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        transitions: parameters?.transitions,
        statuses: parameters?.statuses,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflows.createWorkflow' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise,
   * all published classic workflows are returned.
   *
   * This operation does not return next-gen workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(
    parameters: Parameters.GetWorkflowsPaginated | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise,
   * all published classic workflows are returned.
   *
   * This operation does not return next-gen workflows.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(
    parameters?: Parameters.GetWorkflowsPaginated,
    callback?: never
  ): Promise<T>;
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(
    parameters?: Parameters.GetWorkflowsPaginated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/workflow/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        workflowName: parameters?.workflowName,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflows.getWorkflowsPaginated' });
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
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteInactiveWorkflow<T = void>(
    parameters: Parameters.DeleteInactiveWorkflow,
    callback: Callback<T>
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
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteInactiveWorkflow<T = void>(parameters: Parameters.DeleteInactiveWorkflow, callback?: never): Promise<T>;
  async deleteInactiveWorkflow<T = void>(
    parameters: Parameters.DeleteInactiveWorkflow,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/workflow/${parameters.entityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.workflows.deleteInactiveWorkflow' });
  }
}
