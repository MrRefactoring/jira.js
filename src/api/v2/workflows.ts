import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanWorkflow as PageBeanWorkflowResponse } from '../../models/v2';

export class Workflows {
  constructor(private readonly client: Client) { }

  async getAllWorkflows(parameters?: {
    workflowName?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorkflowsPaginated(parameters?: {
    startAt?: number;
    maxResults?: number;
    workflowName?: string[];
    expand?: string;
  }, callback?: Callback<PageBeanWorkflowResponse>): Promise<PageBeanWorkflowResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
