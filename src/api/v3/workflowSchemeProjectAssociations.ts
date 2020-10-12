import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { ContainerOfWorkflowSchemeAssociations as ContainerOfWorkflowSchemeAssociationsResponse } from '../../models/v3';

export class WorkflowSchemeProjectAssociations {
  constructor(private readonly client: Client) { }

  async getWorkflowSchemeProjectAssociations(parameters: {
    projectId: number[];
  }, callback?: Callback<ContainerOfWorkflowSchemeAssociationsResponse>): Promise<ContainerOfWorkflowSchemeAssociationsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/workflowscheme/project',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async associateSchemeWithProject(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/workflowscheme/project',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
