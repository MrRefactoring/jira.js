import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class WorkflowTransitionProperties {
  constructor(private readonly client: Sender) {}

  public async getWorkflowTransitionProperties(
    params: {
      transitionId: number;
      includeReservedKeys?: boolean;
      key?: string;
      workflowName: string;
      workflowMode?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${params.transitionId}/properties`,
      method: 'GET',
      params: {
        includeReservedKeys: params.includeReservedKeys,
        key: params.key,
        workflowName: params.workflowName,
        workflowMode: params.workflowMode
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateWorkflowTransitionProperty(
    params: {
      transitionId: number;
      key: string;
      workflowName: string;
      workflowMode?: string;
      value: string;
      id?: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${params.transitionId}/properties`,
      method: 'PUT',
      params: {
        key: params.key,
        workflowName: params.workflowName,
        workflowMode: params.workflowMode
      },
      data: {
        ...params,
        transitionId: undefined,
        key: undefined,
        workflowName: undefined,
        workflowMode: undefined
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createWorkflowTransitionProperty(
    params: {
      transitionId: number;
      key: string;
      workflowName: string;
      workflowMode?: string;
      value: string;
      id?: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${params.transitionId}/properties`,
      method: 'POST',
      params: {
        key: params.key,
        workflowName: params.workflowName,
        workflowMode: params.workflowMode
      },
      data: {
        ...params,
        transitionId: undefined,
        key: undefined,
        workflowName: undefined,
        workflowMode: undefined
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteWorkflowTransitionProperty(
    params: {
      transitionId: number;
      key: string;
      workflowName: string;
      workflowMode?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${params.transitionId}/properties`,
      method: 'DELETE',
      params: {
        key: params.key,
        workflowName: params.workflowName,
        workflowMode: params.workflowMode
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
