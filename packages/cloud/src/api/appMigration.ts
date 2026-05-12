import { WorkflowRulesSearchDetailsSchema, type WorkflowRulesSearchDetails } from '#/models/workflowRulesSearchDetails';
import { type UpdateIssueFields } from '#/parameters/updateIssueFields';
import { type UpdateEntityPropertiesValue } from '#/parameters/updateEntityPropertiesValue';
import { type WorkflowRuleSearch } from '#/parameters/workflowRuleSearch';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Updates the value of a custom field added by Connect apps on one or more issues. The values of up to 200 custom
 * fields can be updated.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only
 * Connect apps can make this request
 */
export async function updateIssueFields(client: Client, parameters: UpdateIssueFields): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/atlassian-connect/1/migration/field',
    method: 'PUT',
    headers: {
      'Atlassian-Transfer-Id': parameters['Atlassian-Transfer-Id'],
    },
    body: {
      updateValueList: parameters.updateValueList,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates the values of multiple entity properties for an object, up to 50 updates per request. This operation is for
 * use by Connect apps during app migration.
 */
export async function updateEntityPropertiesValue(
  client: Client,
  parameters: UpdateEntityPropertiesValue,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/atlassian-connect/1/migration/properties/${parameters.entityType}`,
    method: 'PUT',
    headers: {
      'Atlassian-Transfer-Id': parameters['Atlassian-Transfer-Id'],
    },
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Returns configurations for workflow transition rules migrated from server to cloud and owned by the calling Connect
 * app.
 */
export async function workflowRuleSearch(
  client: Client,
  parameters: WorkflowRuleSearch,
): Promise<WorkflowRulesSearchDetails> {
  const config: SendRequestOptions<WorkflowRulesSearchDetails> = {
    url: '/rest/atlassian-connect/1/migration/workflow/rule/search',
    method: 'POST',
    headers: {
      'Atlassian-Transfer-Id': parameters['Atlassian-Transfer-Id'],
    },
    body: {
      expand: parameters.expand,
      ruleIds: parameters.ruleIds,
      workflowEntityId: parameters.workflowEntityId,
    },
    schema: WorkflowRulesSearchDetailsSchema,
  };

  return await client.sendRequest(config);
}
