import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowTransitionProperties {
  constructor(private client: Client) { }
  async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(parameters: Parameters.GetWorkflowTransitionProperties, callback: Callback<T>): Promise<void>;
  async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(parameters: Parameters.GetWorkflowTransitionProperties, callback?: undefined): Promise<T>;
  async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(parameters: Parameters.GetWorkflowTransitionProperties, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'GET',
      params: {
        includeReservedKeys: parameters.includeReservedKeys,
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: Parameters.CreateWorkflowTransitionProperty, callback: Callback<T>): Promise<void>;
  async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: Parameters.CreateWorkflowTransitionProperty, callback?: undefined): Promise<T>;
  async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: Parameters.CreateWorkflowTransitionProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'POST',
      params: {
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
      data: {
        ...parameters,
        transitionId: undefined,
        key: undefined,
        workflowName: undefined,
        workflowMode: undefined,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: Parameters.UpdateWorkflowTransitionProperty, callback: Callback<T>): Promise<void>;
  async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: Parameters.UpdateWorkflowTransitionProperty, callback?: undefined): Promise<T>;
  async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: Parameters.UpdateWorkflowTransitionProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'PUT',
      params: {
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
      data: {
        ...parameters,
        transitionId: undefined,
        key: undefined,
        workflowName: undefined,
        workflowMode: undefined,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorkflowTransitionProperty<T = any>(parameters: Parameters.DeleteWorkflowTransitionProperty, callback: Callback<T>): Promise<void>;
  async deleteWorkflowTransitionProperty<T = any>(parameters: Parameters.DeleteWorkflowTransitionProperty, callback?: undefined): Promise<T>;
  async deleteWorkflowTransitionProperty<T = any>(parameters: Parameters.DeleteWorkflowTransitionProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
