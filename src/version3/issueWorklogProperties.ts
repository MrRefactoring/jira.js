import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueWorklogProperties {
  constructor(private client: Client) {}

  /**
   * Returns the keys of all properties for a worklog.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklogPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetWorklogPropertyKeys,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the keys of all properties for a worklog.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklogPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetWorklogPropertyKeys,
    callback?: never,
  ): Promise<T>;
  async getWorklogPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetWorklogPropertyKeys,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the value of a worklog property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklogProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetWorklogProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the value of a worklog property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async getWorklogProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetWorklogProperty,
    callback?: never,
  ): Promise<T>;
  async getWorklogProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetWorklogProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of a worklog property. Use this operation to store custom data against the worklog.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
   *   own worklogs_ to update worklogs created by the user.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async setWorklogProperty<T = unknown>(
    parameters: Parameters.SetWorklogProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the value of a worklog property. Use this operation to store custom data against the worklog.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
   *   own worklogs_ to update worklogs created by the user.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async setWorklogProperty<T = unknown>(parameters: Parameters.SetWorklogProperty, callback?: never): Promise<T>;
  async setWorklogProperty<T = unknown>(
    parameters: Parameters.SetWorklogProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a worklog property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async deleteWorklogProperty<T = void>(
    parameters: Parameters.DeleteWorklogProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a worklog property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
   */
  async deleteWorklogProperty<T = void>(parameters: Parameters.DeleteWorklogProperty, callback?: never): Promise<T>;
  async deleteWorklogProperty<T = void>(
    parameters: Parameters.DeleteWorklogProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
