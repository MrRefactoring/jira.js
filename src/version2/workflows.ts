import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Workflows {
  constructor(private client: Client) { }
  async getAllWorkflows<T = any>(parameters?: Parameters.GetAllWorkflows, callback?: Callback<T>): Promise<void>;
  async getAllWorkflows<T = any>(parameters?: Parameters.GetAllWorkflows, callback?: undefined): Promise<T>;
  async getAllWorkflows<T = any>(parameters?: Parameters.GetAllWorkflows, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflow',
      method: 'GET',
      params: {
        workflowName: parameters?.workflowName,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters?: Parameters.GetWorkflowsPaginated, callback?: Callback<T>): Promise<void>;
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters?: Parameters.GetWorkflowsPaginated, callback?: undefined): Promise<T>;
  async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters?: Parameters.GetWorkflowsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflow/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        workflowName: parameters?.workflowName,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
