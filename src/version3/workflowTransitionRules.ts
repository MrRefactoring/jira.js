import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class WorkflowTransitionRules {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:
   *
   * - Of one or more transition rule types, such as [workflow post
   *   functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).
   * - Matching one or more transition rule keys.
   *
   * Only workflows containing transition rules created by the calling Connect app are returned. However, if a workflow
   * is returned all transition rules that match the filters are returned for that workflow.
   *
   * Due to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can use this operation.
   */
  async getWorkflowTransitionRuleConfigurations<T = Models.PageWorkflowTransitionRules>(
    parameters: Parameters.GetWorkflowTransitionRuleConfigurations,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:
   *
   * - Of one or more transition rule types, such as [workflow post
   *   functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).
   * - Matching one or more transition rule keys.
   *
   * Only workflows containing transition rules created by the calling Connect app are returned. However, if a workflow
   * is returned all transition rules that match the filters are returned for that workflow.
   *
   * Due to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can use this operation.
   */
  async getWorkflowTransitionRuleConfigurations<T = Models.PageWorkflowTransitionRules>(
    parameters: Parameters.GetWorkflowTransitionRuleConfigurations,
    callback?: never
  ): Promise<T>;
  async getWorkflowTransitionRuleConfigurations<T = Models.PageWorkflowTransitionRules>(
    parameters: Parameters.GetWorkflowTransitionRuleConfigurations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow/rule/config',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        types: parameters.types,
        keys: parameters.keys,
        workflowNames: parameters.workflowNames,
        withTags: parameters.withTags,
        draft: parameters.draft,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates configuration of workflow transition rules. The following rule types are supported:
   *
   * - [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
   * - [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
   * - [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
   *
   * Only rules created by the calling Connect app can be updated.
   *
   * To assist with app migration, this operation can be used to:
   *
   * - Disable a rule.
   * - Add a `tag`. Use this to filter rules in the [Get workflow transition rule
   *   configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
   *
   * Rules are enabled if the `disabled` parameter is not provided.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can use this operation.
   */
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(
    parameters: Parameters.UpdateWorkflowTransitionRuleConfigurations | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates configuration of workflow transition rules. The following rule types are supported:
   *
   * - [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
   * - [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
   * - [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
   *
   * Only rules created by the calling Connect app can be updated.
   *
   * To assist with app migration, this operation can be used to:
   *
   * - Disable a rule.
   * - Add a `tag`. Use this to filter rules in the [Get workflow transition rule
   *   configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
   *
   * Rules are enabled if the `disabled` parameter is not provided.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can use this operation.
   */
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(
    parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations,
    callback?: never
  ): Promise<T>;
  async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(
    parameters?: Parameters.UpdateWorkflowTransitionRuleConfigurations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow/rule/config',
      method: 'PUT',
      data: {
        workflows: parameters?.workflows,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes workflow transition rules from one or more workflows. These rule types are supported:
   *
   * - [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
   * - [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
   * - [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
   *
   * Only rules created by the calling Connect app can be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can use this operation.
   */
  async deleteWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(
    parameters: Parameters.DeleteWorkflowTransitionRuleConfigurations | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes workflow transition rules from one or more workflows. These rule types are supported:
   *
   * - [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
   * - [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
   * - [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
   *
   * Only rules created by the calling Connect app can be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can use this operation.
   */
  async deleteWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(
    parameters?: Parameters.DeleteWorkflowTransitionRuleConfigurations,
    callback?: never
  ): Promise<T>;
  async deleteWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(
    parameters?: Parameters.DeleteWorkflowTransitionRuleConfigurations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/workflow/rule/config/delete',
      method: 'PUT',
      data: {
        workflows: parameters?.workflows,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
