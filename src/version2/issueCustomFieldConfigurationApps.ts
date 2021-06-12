import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldConfigurationApps {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of configurations for a custom field. The result can be filtered by
   * `contextId` or `issueId`, otherwise all configurations are returned. Invalid IDs are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global
   * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app that created
   * the custom field.
   */
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of configurations for a custom field. The result can be filtered by
   * `contextId` or `issueId`, otherwise all configurations are returned. Invalid IDs are ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global
   * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app that created
   * the custom field.
   */
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration,
    callback?: never
  ): Promise<T>;
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/app/field/${parameters.fieldIdOrKey}/context/configuration`,
      method: 'GET',
      params: {
        contextId: parameters.contextId,
        issueId: parameters.issueId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueCustomFieldConfigurationApps.getCustomFieldConfiguration',
    });
  }

  /**
   * Update the configuration for contexts of a custom field.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global
   * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app that created
   * the custom field.
   */
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Update the configuration for contexts of a custom field.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global
   * permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app that created
   * the custom field.
   */
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
    callback?: never
  ): Promise<T>;
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/app/field/${parameters.fieldIdOrKey}/context/configuration`,
      method: 'PUT',
      data: {
        configurations: parameters.configurations,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueCustomFieldConfigurationApps.updateCustomFieldConfiguration',
    });
  }
}
