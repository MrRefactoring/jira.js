import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class WorkflowTransitionRules {
  constructor(private readonly client: Sender) { }

  public async getWorkflowTransitionRuleConfigurations(
    params: {
      startAt?: number;
      maxResults?: number;
      types: Array<string>;
      keys?: Array<string>;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow/rule/config',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        types: params.types && params.types.join(','),
        keys: params.keys && params.keys.join(','),
        expand: params.expand,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateWorkflowTransitionRuleConfigurations(
    params?: {
      workflows?: Array<any>;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow/rule/config',
      method: 'PUT',
      data: {
        workflows: params.workflows,
      },
    };
    return this.client.sendRequest(request, callback);
  }
}
