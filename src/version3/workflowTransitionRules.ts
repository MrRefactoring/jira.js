import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowTransitionRules {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:
     *
     *  *  of one or more transition rule types, such as [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).
     *  *  matching one or more transition rule keys.
     *
     * Only workflows containing transition rules created by the calling Connect app are returned. However, if a workflow is returned all transition rules that match the filters are returned for that workflow.
     *
     * Due to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be ignored.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can use this operation. */
  async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: Parameters.GetWorkflowTransitionRuleConfigurations, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:
     *
     *  *  of one or more transition rule types, such as [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).
     *  *  matching one or more transition rule keys.
     *
     * Only workflows containing transition rules created by the calling Connect app are returned. However, if a workflow is returned all transition rules that match the filters are returned for that workflow.
     *
     * Due to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be ignored.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can use this operation. */
  async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: Parameters.GetWorkflowTransitionRuleConfigurations, callback?: never): Promise<T>;
  async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: Parameters.GetWorkflowTransitionRuleConfigurations, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/workflow/rule/config',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        types: parameters.types,
        keys: parameters.keys,
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getWorkflowTransitionRuleConfigurations' });
  }
  /**
     * Updates configuration of workflow transition rules. The following rule types are supported:
     *
     *  *  [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
     *  *  [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
     *  *  [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
     *
     * Only rules created by the calling Connect app can be updated.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can use this operation. */
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters: Parameters.UpdateWorkflowTransitionRuleConfigurations | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Updates configuration of workflow transition rules. The following rule types are supported:
     *
     *  *  [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
     *  *  [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
     *  *  [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
     *
     * Only rules created by the calling Connect app can be updated.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can use this operation. */
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations, callback?: never): Promise<T>;
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/workflow/rule/config',
      method: 'PUT',
      data: {
        workflows: parameters?.workflows,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateWorkflowTransitionRuleConfigurations' });
  }
}
