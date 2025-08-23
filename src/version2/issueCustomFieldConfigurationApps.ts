import type { Client } from '../client';
import type { Request } from '../request';
import type { GetCustomFieldsConfigurationsParameters } from './parameters/getCustomFieldsConfigurationsParameters';
import type { GetCustomFieldConfigurationParameters } from './parameters/getCustomFieldConfigurationParameters';
import type { UpdateCustomFieldConfigurationParameters } from './parameters/updateCustomFieldConfigurationParameters';

export class IssueCustomFieldConfigurationApps {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * configurations for list of custom fields of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/). *
   *
   * - The result can be filtered by one of these criteria:
   * -
   * - - `id`.
   * - - `fieldContextId`.
   * - - `issueId`.
   * - - `projectKeyOrId` and `issueTypeId`.
   * -
   * - Otherwise, all configurations for the provided list of custom fields are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not
   *   required for the Forge app that provided the custom field type.
   */
  async getCustomFieldsConfigurations(parameters: GetCustomFieldsConfigurationsParameters) {
    const request: Request = {
      url: '/rest/api/2/app/field/context/configuration/list',
      method: 'POST',
      query: {
        id: parameters.id,
        fieldContextId: parameters.fieldContextId,
        issueId: parameters.issueId,
        projectKeyOrId: parameters.projectKeyOrId,
        issueTypeId: parameters.issueTypeId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
      body: {
        fieldIdsOrKeys: parameters.fieldIdsOrKeys,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * configurations for a custom field of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/). *
   *
   * - The result can be filtered by one of these criteria:
   * -
   * - - `id`.
   * - - `fieldContextId`.
   * - - `issueId`.
   * - - `projectKeyOrId` and `issueTypeId`.
   * -
   * - Otherwise, all configurations are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not
   *   required for the Forge app that provided the custom field type.
   */
  async getCustomFieldConfiguration(parameters: GetCustomFieldConfigurationParameters) {
    const request: Request = {
      url: `/rest/api/2/app/field/${parameters.fieldIdOrKey}/context/configuration`,
      method: 'GET',
      query: {
        id: parameters.id,
        fieldContextId: parameters.fieldContextId,
        issueId: parameters.issueId,
        projectKeyOrId: parameters.projectKeyOrId,
        issueTypeId: parameters.issueTypeId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Update the configuration for contexts of a custom field of a
   * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created
   * by a [Forge app](https://developer.atlassian.com/platform/forge/). *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not
   *   required for the Forge app that created the custom field type.
   */
  async updateCustomFieldConfiguration(parameters: UpdateCustomFieldConfigurationParameters) {
    const request: Request = {
      url: `/rest/api/2/app/field/${parameters.fieldIdOrKey}/context/configuration`,
      method: 'PUT',
      body: {
        configurations: parameters.configurations,
      },
    };

    return this.client.sendRequest(request);
  }
}
