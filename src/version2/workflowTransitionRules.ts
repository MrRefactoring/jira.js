import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowTransitionRules {
  constructor(private client: Client) { }
  async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: Parameters.GetWorkflowTransitionRuleConfigurations, callback: Callback<T>): Promise<void>;
  async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: Parameters.GetWorkflowTransitionRuleConfigurations, callback?: undefined): Promise<T>;
  async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: Parameters.GetWorkflowTransitionRuleConfigurations, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflow/rule/config',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        types: parameters.types,
        keys: parameters.keys,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations, callback?: Callback<T>): Promise<void>;
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations, callback?: undefined): Promise<T>;
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflow/rule/config',
      method: 'PUT',
      data: {
        workflows: parameters?.workflows,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
