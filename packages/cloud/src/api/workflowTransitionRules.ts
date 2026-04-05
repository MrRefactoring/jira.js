import {
  PageWorkflowTransitionRulesSchema,
  type PageWorkflowTransitionRules,
} from '#/models/pageWorkflowTransitionRules';
import {
  WorkflowTransitionRulesUpdateErrorsSchema,
  type WorkflowTransitionRulesUpdateErrors,
} from '#/models/workflowTransitionRulesUpdateErrors';
import { type GetWorkflowTransitionRuleConfigurations } from '#/parameters/getWorkflowTransitionRuleConfigurations';
import { type UpdateWorkflowTransitionRuleConfigurations } from '#/parameters/updateWorkflowTransitionRuleConfigurations';
import { type DeleteWorkflowTransitionRuleConfigurations } from '#/parameters/deleteWorkflowTransitionRuleConfigurations';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of workflows
 * with transition rules. The workflows can be filtered to return only those containing workflow transition rules:
 *
 * - Of one or more transition rule types, such as [workflow post
 *   functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).
 * - Matching one or more transition rule keys.
 *
 * Only workflows containing transition rules created by the calling
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) or
 * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps) app are returned.
 *
 * Due to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be
 * ignored.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) or
 * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps) apps can use this operation.
 */
export async function getWorkflowTransitionRuleConfigurations(
  client: Client,
  parameters: GetWorkflowTransitionRuleConfigurations,
): Promise<PageWorkflowTransitionRules> {
  const config: SendRequestOptions<PageWorkflowTransitionRules> = {
    url: '/rest/api/3/workflow/rule/config',
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      types: parameters.types,
      keys: parameters.keys,
      workflowNames: parameters.workflowNames,
      withTags: parameters.withTags,
      draft: parameters.draft,
      expand: parameters.expand,
    },
    schema: PageWorkflowTransitionRulesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates configuration of workflow transition rules. The following rule types are supported:
 *
 * - [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)
 * - [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)
 * - [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)
 *
 * Only rules created by the calling [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps)
 * or [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps) app can be updated.
 *
 * To assist with app migration, this operation can be used to:
 *
 * - Disable a rule.
 * - Add a `tag`. Use this to filter rules in the [Get workflow transition rule
 *   configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get).
 *
 * Rules are enabled if the `disabled` parameter is not provided.
 *
 * **Note:** The `draft` parameter in the request body WorkflowId is deprecated and will be removed from this API on
 * [November 2, 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * [Connect](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) or
 * [Forge](https://developer.atlassian.com/cloud/jira/platform/index/#forge-apps) apps can use this operation.
 */
export async function updateWorkflowTransitionRuleConfigurations(
  client: Client,
  parameters: UpdateWorkflowTransitionRuleConfigurations,
): Promise<WorkflowTransitionRulesUpdateErrors> {
  const config: SendRequestOptions<WorkflowTransitionRulesUpdateErrors> = {
    url: '/rest/api/3/workflow/rule/config',
    method: 'PUT',
    body: {
      workflows: parameters.workflows,
    },
    schema: WorkflowTransitionRulesUpdateErrorsSchema,
  };

  return await client.sendRequest(config);
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
 * **Note:** The `draft` parameter in the request body WorkflowId is deprecated and will be removed from this API on
 * [November 2, 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect apps can use this operation.
 */
export async function deleteWorkflowTransitionRuleConfigurations(
  client: Client,
  parameters: DeleteWorkflowTransitionRuleConfigurations,
): Promise<WorkflowTransitionRulesUpdateErrors> {
  const config: SendRequestOptions<WorkflowTransitionRulesUpdateErrors> = {
    url: '/rest/api/3/workflow/rule/config/delete',
    method: 'PUT',
    body: {
      workflows: parameters.workflows,
    },
    schema: WorkflowTransitionRulesUpdateErrorsSchema,
  };

  return await client.sendRequest(config);
}
