import * as Models from './models/index.mjs';
import * as Parameters from './parameters/index.mjs';
import { Callback } from '../callback.mjs';
import { Client } from '../clients/index.mjs';
import { paramSerializer } from '../paramSerializer.mjs';
import { RequestConfig } from '../requestConfig.mjs';

export class Workflows {
  constructor(private client: Client) {}

  /**
   * Creates a workflow. Workflow transitions are created with the default system transition rules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflow<T = Models.WorkflowId>(
    parameters: Parameters.CreateWorkflow,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a workflow. Workflow transitions are created with the default system transition rules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
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
        name: parameters.name,
        description: parameters.description,
        transitions: parameters.transitions,
        statuses: parameters.statuses,
      },
    };

    return this.client.sendRequest(config, callback);
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
    callback?: never,
  ): Promise<T>;
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
}
