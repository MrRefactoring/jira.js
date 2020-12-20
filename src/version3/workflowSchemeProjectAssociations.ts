import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemeProjectAssociations {
  constructor(private client: Client) { }
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback: Callback<T>): Promise<void>;
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback?: undefined): Promise<T>;
  async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: Parameters.GetWorkflowSchemeProjectAssociations, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/workflowscheme/project',
      method: 'GET',
      params: {
        projectId: parameters.projectId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async associateSchemeWithProject<T = any>(parameters?: Parameters.AssociateSchemeWithProject, callback?: Callback<T>): Promise<void>;
  async associateSchemeWithProject<T = any>(parameters?: Parameters.AssociateSchemeWithProject, callback?: undefined): Promise<T>;
  async associateSchemeWithProject<T = any>(parameters?: Parameters.AssociateSchemeWithProject, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/workflowscheme/project',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
