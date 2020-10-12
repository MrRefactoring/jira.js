import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { WorkflowTransitionProperty as WorkflowTransitionPropertyResponse } from '../../models/v2';

export class WorkflowTransitionProperties {
  constructor(private readonly client: Client) { }

  async getWorkflowTransitionProperties(parameters: {
    transitionId: number;
    includeReservedKeys?: boolean;
    key?: string;
    workflowName: string;
    workflowMode?: string;
  }, callback?: Callback<WorkflowTransitionPropertyResponse>): Promise<WorkflowTransitionPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createWorkflowTransitionProperty(parameters: {
    transitionId: number;
    key: string;
    workflowName: string;
    workflowMode?: string;
  }, callback?: Callback<WorkflowTransitionPropertyResponse>): Promise<WorkflowTransitionPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateWorkflowTransitionProperty(parameters: {
    transitionId: number;
    key: string;
    workflowName: string;
    workflowMode?: string;
  }, callback?: Callback<WorkflowTransitionPropertyResponse>): Promise<WorkflowTransitionPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorkflowTransitionProperty(parameters: {
    transitionId: number;
    key: string;
    workflowName: string;
    workflowMode?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
