import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanWorkflowTransitionRules as PageBeanWorkflowTransitionRulesResponse, WorkflowTransitionRulesUpdateErrors as WorkflowTransitionRulesUpdateErrorsResponse } from '../../models/v2';

export class WorkflowTransitionRules {
  constructor(private readonly client: Client) { }

  async getWorkflowTransitionRuleConfigurations(parameters: {
    startAt?: number;
    maxResults?: number;
    types: string[];
    keys?: string[];
    expand?: string;
  }, callback?: Callback<PageBeanWorkflowTransitionRulesResponse>): Promise<PageBeanWorkflowTransitionRulesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow/rule/config',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateWorkflowTransitionRuleConfigurations(parameters?: any, callback?: Callback<WorkflowTransitionRulesUpdateErrorsResponse>): Promise<WorkflowTransitionRulesUpdateErrorsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflow/rule/config',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
