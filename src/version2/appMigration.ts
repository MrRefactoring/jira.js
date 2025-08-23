import type { Client } from '../client';
import type { Request } from '../request';
import type { UpdateIssueFieldsParameters } from './parameters/updateIssueFieldsParameters';
import type { UpdateEntityPropertiesValueParameters } from './parameters/updateEntityPropertiesValueParameters';
import type { WorkflowRuleSearchParameters } from './parameters/workflowRuleSearchParameters';

export class AppMigration {
  constructor(private client: Client) {}
  /**
   * Updates the value of a custom field added by Connect apps on one or more issues.
   *
   * - The values of up to 200 custom fields can be updated.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Connect apps can make this request
   */
  async updateIssueFields(parameters: UpdateIssueFieldsParameters) {
    const request: Request = {
      url: '/rest/atlassian-connect/1/migration/field',
      method: 'PUT',
      body: {
        updateValueList: parameters.updateValueList,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the values of multiple entity properties for an object, up to 50 updates per request. This operation is for
   * use by Connect apps during app migration.
   */
  async updateEntityPropertiesValue(parameters: UpdateEntityPropertiesValueParameters) {
    const request: Request = {
      url: `/rest/atlassian-connect/1/migration/properties/${parameters.entityType}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns configurations for workflow transition rules migrated from server to cloud and owned by the calling Connect
   * app.
   */
  async workflowRuleSearch(parameters: WorkflowRuleSearchParameters) {
    const request: Request = {
      url: '/rest/atlassian-connect/1/migration/workflow/rule/search',
      method: 'POST',
      body: {
        expand: parameters.expand,
        ruleIds: parameters.ruleIds,
        workflowEntityId: parameters.workflowEntityId,
      },
    };

    return this.client.sendRequest(request);
  }
}
