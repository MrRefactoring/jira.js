import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Workflows {
  constructor(private client: Client) { }
  /**
     * Returns all workflows in Jira or a workflow. Deprecated, use [Get workflows paginated](#api-rest-api-3-workflow-search-get).
     *
     * If the `workflowName` parameter is specified, the workflow is returned as an object (not in an array). Otherwise, an array of workflow objects is returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllWorkflows<T = any>(parameters?: Parameters.GetAllWorkflows, callback?: Callback<T>): Promise<void>;
  /**
     * Returns all workflows in Jira or a workflow. Deprecated, use [Get workflows paginated](#api-rest-api-3-workflow-search-get).
     *
     * If the `workflowName` parameter is specified, the workflow is returned as an object (not in an array). Otherwise, an array of workflow objects is returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllWorkflows<T = any>(parameters?: Parameters.GetAllWorkflows, callback?: undefined): Promise<T>;
  async getAllWorkflows<T = any>(parameters?: Parameters.GetAllWorkflows, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/workflow',
      method: 'GET',
      params: {
        workflowName: parameters?.workflowName,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAllWorkflows' });
  }
  /**
     * Returns a [paginated](#pagination) list of published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise, all published classic workflows are returned.
     *
     * This operation does not return next-gen workflows.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters?: Parameters.GetWorkflowsPaginated, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of published classic workflows. When workflow names are specified, details of those workflows are returned. Otherwise, all published classic workflows are returned.
     *
     * This operation does not return next-gen workflows.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters?: Parameters.GetWorkflowsPaginated, callback?: undefined): Promise<T>;
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters?: Parameters.GetWorkflowsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/workflow/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        workflowName: parameters?.workflowName,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getWorkflowsPaginated' });
  }
}
