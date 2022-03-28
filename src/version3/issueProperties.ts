import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueProperties {
  constructor(private client: Client) {}

  /**
   * Sets or updates a list of entity property values on issues. A list of up to 10 entity properties can be specified
   * along with up to 10,000 issues on which to set or update that list of entity properties.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON. The maximum
   * length of single issue property value is 32768 characters. This operation can be accessed anonymously.
   *
   * This operation is:
   *
   * - Transactional, either all properties are updated in all eligible issues or, when errors occur, no properties are updated.
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async bulkSetIssuesProperties<T = unknown>(
    parameters: Parameters.BulkSetIssuesProperties | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets or updates a list of entity property values on issues. A list of up to 10 entity properties can be specified
   * along with up to 10,000 issues on which to set or update that list of entity properties.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON. The maximum
   * length of single issue property value is 32768 characters. This operation can be accessed anonymously.
   *
   * This operation is:
   *
   * - Transactional, either all properties are updated in all eligible issues or, when errors occur, no properties are updated.
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async bulkSetIssuesProperties<T = unknown>(
    parameters?: Parameters.BulkSetIssuesProperties,
    callback?: never
  ): Promise<T>;
  async bulkSetIssuesProperties<T = unknown>(
    parameters?: Parameters.BulkSetIssuesProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issue/properties',
      method: 'POST',
      data: {
        entitiesIds: parameters?.entitiesIds,
        properties: parameters?.properties,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets or updates entity property values on issues. Up to 10 entity properties can be specified for each issue and up
   * to 100 issues included in the request.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON.
   *
   * This operation is:
   *
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   * - Non-transactional. Updating some entities may fail. Such information will available in the task result.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async bulkSetIssuePropertiesByIssue<T = unknown>(
    parameters: Parameters.BulkSetIssuePropertiesByIssue | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets or updates entity property values on issues. Up to 10 entity properties can be specified for each issue and up
   * to 100 issues included in the request.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON.
   *
   * This operation is:
   *
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   * - Non-transactional. Updating some entities may fail. Such information will available in the task result.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async bulkSetIssuePropertiesByIssue<T = unknown>(
    parameters?: Parameters.BulkSetIssuePropertiesByIssue,
    callback?: never
  ): Promise<T>;
  async bulkSetIssuePropertiesByIssue<T = unknown>(
    parameters?: Parameters.BulkSetIssuePropertiesByIssue,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issue/properties/multi',
      method: 'POST',
      data: {
        issues: parameters?.issues,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets a property value on multiple issues.
   *
   * The value set can be a constant or determined by a [Jira
   * expression](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/). Expressions must be computable
   * with constant complexity when applied to a set of issues. Expressions must also comply with the
   * [restrictions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions) that apply to
   * all Jira expressions.
   *
   * The issues to be updated can be specified by a filter.
   *
   * The filter identifies issues eligible for update using these criteria:
   *
   * - `entityIds` Only issues from this list are eligible.
   * - `currentValue` Only issues with the property set to this value are eligible.
   * - `hasProperty`:
   *
   *   - If _true_, only issues with the property are eligible.
   *   - If _false_, only issues without the property are eligible.
   *
   * If more than one criteria is specified, they are joined with the logical _AND_: only issues that satisfy all
   * criteria are eligible.
   *
   * If an invalid combination of criteria is provided, an error is returned. For example, specifying a `currentValue`
   * and `hasProperty` as _false_ would not match any issues (because without the property the property cannot have a value).
   *
   * The filter is optional. Without the filter all the issues visible to the user and where the user has the
   * EDIT_ISSUES permission for the issue are considered eligible.
   *
   * This operation is:
   *
   * - Transactional, either all eligible issues are updated or, when errors occur, none are updated.
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
   */
  async bulkSetIssueProperty<T = unknown>(
    parameters: Parameters.BulkSetIssueProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets a property value on multiple issues.
   *
   * The value set can be a constant or determined by a [Jira
   * expression](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/). Expressions must be computable
   * with constant complexity when applied to a set of issues. Expressions must also comply with the
   * [restrictions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions) that apply to
   * all Jira expressions.
   *
   * The issues to be updated can be specified by a filter.
   *
   * The filter identifies issues eligible for update using these criteria:
   *
   * - `entityIds` Only issues from this list are eligible.
   * - `currentValue` Only issues with the property set to this value are eligible.
   * - `hasProperty`:
   *
   *   - If _true_, only issues with the property are eligible.
   *   - If _false_, only issues without the property are eligible.
   *
   * If more than one criteria is specified, they are joined with the logical _AND_: only issues that satisfy all
   * criteria are eligible.
   *
   * If an invalid combination of criteria is provided, an error is returned. For example, specifying a `currentValue`
   * and `hasProperty` as _false_ would not match any issues (because without the property the property cannot have a value).
   *
   * The filter is optional. Without the filter all the issues visible to the user and where the user has the
   * EDIT_ISSUES permission for the issue are considered eligible.
   *
   * This operation is:
   *
   * - Transactional, either all eligible issues are updated or, when errors occur, none are updated.
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
   */
  async bulkSetIssueProperty<T = unknown>(parameters: Parameters.BulkSetIssueProperty, callback?: never): Promise<T>;
  async bulkSetIssueProperty<T = unknown>(
    parameters: Parameters.BulkSetIssueProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
      method: 'PUT',
      data: {
        value: parameters.value,
        expression: parameters.expression,
        filter: parameters.filter,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.
   *
   * The criteria the filter used to identify eligible issues are:
   *
   * - `entityIds` Only issues from this list are eligible.
   * - `currentValue` Only issues with the property set to this value are eligible.
   *
   * If both criteria is specified, they are joined with the logical _AND_: only issues that satisfy both criteria are
   * considered eligible.
   *
   * If no filter criteria are specified, all the issues visible to the user and where the user has the EDIT_ISSUES
   * permission for the issue are considered eligible.
   *
   * This operation is:
   *
   * - Transactional, either the property is deleted from all eligible issues or, when errors occur, no properties are deleted.
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
   */
  async bulkDeleteIssueProperty<T = unknown>(
    parameters: Parameters.BulkDeleteIssueProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.
   *
   * The criteria the filter used to identify eligible issues are:
   *
   * - `entityIds` Only issues from this list are eligible.
   * - `currentValue` Only issues with the property set to this value are eligible.
   *
   * If both criteria is specified, they are joined with the logical _AND_: only issues that satisfy both criteria are
   * considered eligible.
   *
   * If no filter criteria are specified, all the issues visible to the user and where the user has the EDIT_ISSUES
   * permission for the issue are considered eligible.
   *
   * This operation is:
   *
   * - Transactional, either the property is deleted from all eligible issues or, when errors occur, no properties are deleted.
   * - [asynchronous](#async). Follow the `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit issues_ [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
   */
  async bulkDeleteIssueProperty<T = unknown>(
    parameters: Parameters.BulkDeleteIssueProperty,
    callback?: never
  ): Promise<T>;
  async bulkDeleteIssueProperty<T = unknown>(
    parameters: Parameters.BulkDeleteIssueProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
      method: 'DELETE',
      data: {
        entityIds: parameters.entityIds,
        currentValue: parameters.currentValue,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the URLs and keys of an issue's properties.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Property details are only returned where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getIssuePropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetIssuePropertyKeys,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the URLs and keys of an issue's properties.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Property details are only returned where the user has:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getIssuePropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetIssuePropertyKeys,
    callback?: never
  ): Promise<T>;
  async getIssuePropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetIssuePropertyKeys,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the key and value of an issue's property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getIssueProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetIssueProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the key and value of an issue's property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getIssueProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetIssueProperty,
    callback?: never
  ): Promise<T>;
  async getIssueProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetIssueProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of an issue's property. Use this resource to store custom data against an issue.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async setIssueProperty<T = unknown>(parameters: Parameters.SetIssueProperty, callback: Callback<T>): Promise<void>;
  /**
   * Sets the value of an issue's property. Use this resource to store custom data against an issue.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async setIssueProperty<T = unknown>(parameters: Parameters.SetIssueProperty, callback?: never): Promise<T>;
  async setIssueProperty<T = unknown>(
    parameters: Parameters.SetIssueProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue's property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async deleteIssueProperty<T = void>(parameters: Parameters.DeleteIssueProperty, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue's property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ and _Edit issues_ [project permissions](https://confluence.atlassian.com/x/yodKLg) for the
   *   project containing the issue.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async deleteIssueProperty<T = void>(parameters: Parameters.DeleteIssueProperty, callback?: never): Promise<T>;
  async deleteIssueProperty<T = void>(
    parameters: Parameters.DeleteIssueProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
