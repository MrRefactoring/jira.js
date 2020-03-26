import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Workflows {
  constructor(private readonly client: Sender) { }

  public async getAllWorkflows(
    params?: {
      workflowName?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow',
      method: 'GET',
      params: {
        workflowName: params.workflowName,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getWorkflowsPaginated(
    params?: {
      startAt?: number;
      maxResults?: number;
      workflowName?: Array<string>;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow/search',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        workflowName: params.workflowName && params.workflowName.join(','),
        expand: params.expand,
      },
    };
    return this.client.sendRequest(request, callback);
  }
}
