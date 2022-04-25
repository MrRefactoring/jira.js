import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class AppMigration {
  constructor(private client: Client) {}

  /**
   * Updates the value of a custom field added by Connect apps on one or more issues. The values of up to 200 custom
   * fields can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async updateIssueFields<T = unknown>(parameters: Parameters.UpdateIssueFields, callback: Callback<T>): Promise<void>;
  /**
   * Updates the value of a custom field added by Connect apps on one or more issues. The values of up to 200 custom
   * fields can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async updateIssueFields<T = unknown>(parameters: Parameters.UpdateIssueFields, callback?: never): Promise<T>;
  async updateIssueFields<T = unknown>(
    parameters: Parameters.UpdateIssueFields,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/atlassian-connect/1/migration/field',
      method: 'PUT',
      headers: {
        'Atlassian-Transfer-Id': parameters.transferId,
        'Atlassian-Account-Id': parameters.accountId,
      },
      data: {
        updateValueList: parameters.updateValueList,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the values of multiple entity properties for an object, up to 50 updates per request. This operation is for
   * use by Connect apps during app migration.
   */
  async updateEntityPropertiesValue<T = unknown>(
    parameters: Parameters.UpdateEntityPropertiesValue,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates the values of multiple entity properties for an object, up to 50 updates per request. This operation is for
   * use by Connect apps during app migration.
   */
  async updateEntityPropertiesValue<T = unknown>(
    parameters: Parameters.UpdateEntityPropertiesValue,
    callback?: never
  ): Promise<T>;
  async updateEntityPropertiesValue<T = unknown>(
    parameters: Parameters.UpdateEntityPropertiesValue,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/migration/properties/${parameters.entityType}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Atlassian-Transfer-Id': parameters.transferId,
        'Atlassian-Account-Id': parameters.accountId,
      },
      data: parameters.body ?? parameters.entities,
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns configurations for workflow transition rules migrated from server to cloud and owned by the calling Connect app. */
  async workflowRuleSearch<T = Models.WorkflowRulesSearchDetails>(
    parameters: Parameters.WorkflowRuleSearch,
    callback: Callback<T>
  ): Promise<void>;
  /** Returns configurations for workflow transition rules migrated from server to cloud and owned by the calling Connect app. */
  async workflowRuleSearch<T = Models.WorkflowRulesSearchDetails>(
    parameters: Parameters.WorkflowRuleSearch,
    callback?: never
  ): Promise<T>;
  async workflowRuleSearch<T = Models.WorkflowRulesSearchDetails>(
    parameters: Parameters.WorkflowRuleSearch,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/atlassian-connect/1/migration/workflow/rule/search',
      method: 'POST',
      headers: {
        'Atlassian-Transfer-Id': parameters.transferId,
      },
      data: {
        workflowEntityId: parameters.workflowEntityId,
        ruleIds: parameters.ruleIds,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
