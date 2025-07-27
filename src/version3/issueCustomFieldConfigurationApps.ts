import { paramSerializer } from '../paramSerializer';
import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { Request } from '../request';

export class IssueCustomFieldConfigurationApps {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * configurations for list of custom fields of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
   *
   * The result can be filtered by one of these criteria:
   *
   * - `id`.
   * - `fieldContextId`.
   * - `issueId`.
   * - `projectKeyOrId` and `issueTypeId`.
   *
   * Otherwise, all configurations for the provided list of custom fields are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that provided the custom field type.
   */
  async getCustomFieldsConfigurations<T = Models.PageBulkContextualConfiguration>(
    parameters: Parameters.GetCustomFieldsConfigurations | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * configurations for list of custom fields of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
   *
   * The result can be filtered by one of these criteria:
   *
   * - `id`.
   * - `fieldContextId`.
   * - `issueId`.
   * - `projectKeyOrId` and `issueTypeId`.
   *
   * Otherwise, all configurations for the provided list of custom fields are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that provided the custom field type.
   */
  async getCustomFieldsConfigurations<T = Models.PageBulkContextualConfiguration>(
    parameters?: Parameters.GetCustomFieldsConfigurations,
    callback?: never,
  ): Promise<T>;
  async getCustomFieldsConfigurations<T = Models.PageBulkContextualConfiguration>(
    parameters?: Parameters.GetCustomFieldsConfigurations,
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/app/field/context/configuration/list',
      method: 'POST',
      query: {
        id: parameters?.id,
        fieldContextId: paramSerializer('fieldContextId', parameters?.fieldContextId),
        issueId: parameters?.issueId,
        projectKeyOrId: parameters?.projectKeyOrId,
        issueTypeId: parameters?.issueTypeId,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
      body: {
        fieldIdsOrKeys: parameters?.fieldIdsOrKeys,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * configurations for a custom field of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
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
   * for the Forge app that provided the custom field type.
   */
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * configurations for a custom field of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
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
   * for the Forge app that provided the custom field type.
   */
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration | string,
    callback?: never,
  ): Promise<T>;
  async getCustomFieldConfiguration<T = Models.PageContextualConfiguration>(
    parameters: Parameters.GetCustomFieldConfiguration | string,
  ): Promise<void | T> {
    const fieldIdOrKey = typeof parameters === 'string' ? parameters : parameters.fieldIdOrKey;

    const config: Request = {
      url: `/rest/api/3/app/field/${fieldIdOrKey}/context/configuration`,
      method: 'GET',
      query: {
        id: typeof parameters !== 'string' && parameters.id,
        fieldContextId: typeof parameters !== 'string' && parameters.fieldContextId,
        issueId: typeof parameters !== 'string' && parameters.issueId,
        projectKeyOrId: typeof parameters !== 'string' && parameters.projectKeyOrId,
        issueTypeId: typeof parameters !== 'string' && parameters.issueTypeId,
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Update the configuration for contexts of a custom field of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that created the custom field type.
   */
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update the configuration for contexts of a custom field of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
   * for the Forge app that created the custom field type.
   */
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
    callback?: never,
  ): Promise<T>;
  async updateCustomFieldConfiguration<T = unknown>(
    parameters: Parameters.UpdateCustomFieldConfiguration,
  ): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/app/field/${parameters.fieldIdOrKey}/context/configuration`,
      method: 'PUT',
      body: {
        configurations: parameters.configurations,
      },
    };

    return this.client.sendRequest(config);
  }
}
