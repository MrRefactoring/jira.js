import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldConfigurationApps {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * configurations for a custom field created by a [Forge app](https://developer.atlassian.com/platform/forge/).
   *
   * The result can be filtered by one of these criteria:
   *
   * - `id`.
   * - `fieldContextId`.
   * - `issueId`.
   * - `projectKeyOrId` and `issueTypeId`.
   *
   * Otherwise, all configurations are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that created the custom field.
   */
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * configurations for a custom field created by a [Forge app](https://developer.atlassian.com/platform/forge/).
   *
   * The result can be filtered by one of these criteria:
   *
   * - `id`.
   * - `fieldContextId`.
   * - `issueId`.
   * - `projectKeyOrId` and `issueTypeId`.
   *
   * Otherwise, all configurations are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that created the custom field.
   */
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration | string,
    callback?: never
  ): Promise<T>;
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldIdOrKey = typeof parameters === 'string' ? parameters : parameters.fieldIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/3/app/field/${fieldIdOrKey}/context/configuration`,
      method: 'GET',
      params: {
        id: typeof parameters !== 'string' && parameters.id,
        contextId: typeof parameters !== 'string' && parameters.contextId,
        fieldContextId: typeof parameters !== 'string' && parameters.fieldContextId,
        issueId: typeof parameters !== 'string' && parameters.issueId,
        projectKeyOrId: typeof parameters !== 'string' && parameters.projectKeyOrId,
        issueTypeId: typeof parameters !== 'string' && parameters.issueTypeId,
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update the configuration for contexts of a custom field created by a [Forge
   * app](https://developer.atlassian.com/platform/forge/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that created the custom field.
   */
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Update the configuration for contexts of a custom field created by a [Forge
   * app](https://developer.atlassian.com/platform/forge/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that created the custom field.
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
      url: `/rest/api/3/app/field/${parameters.fieldIdOrKey}/context/configuration`,
      method: 'PUT',
      data: {
        configurations: parameters.configurations,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
