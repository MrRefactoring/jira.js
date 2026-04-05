import {
  PageContextualConfigurationSchema,
  type PageContextualConfiguration,
} from '#/models/pageContextualConfiguration';
import { type GetCustomFieldConfiguration } from '#/parameters/getCustomFieldConfiguration';
import { type UpdateCustomFieldConfiguration } from '#/parameters/updateCustomFieldConfiguration';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of
 * configurations for a custom field of a
 * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created by
 * a [Forge app](https://developer.atlassian.com/platform/forge/).
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
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the Forge app that provided the custom field type.
 */
export async function getCustomFieldConfiguration(
  client: Client,
  parameters: GetCustomFieldConfiguration,
): Promise<PageContextualConfiguration> {
  const config: SendRequestOptions<PageContextualConfiguration> = {
    url: `/rest/api/3/app/field/${parameters.fieldIdOrKey}/context/configuration`,
    method: 'GET',
    searchParams: {
      id: parameters.id,
      fieldContextId: parameters.fieldContextId,
      issueId: parameters.issueId,
      projectKeyOrId: parameters.projectKeyOrId,
      issueTypeId: parameters.issueTypeId,
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: PageContextualConfigurationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update the configuration for contexts of a custom field of a
 * [type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/) created by
 * a [Forge app](https://developer.atlassian.com/platform/forge/).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required
 * for the Forge app that created the custom field type.
 */
export async function updateCustomFieldConfiguration(
  client: Client,
  parameters: UpdateCustomFieldConfiguration,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/app/field/${parameters.fieldIdOrKey}/context/configuration`,
    method: 'PUT',
    body: {
      configurations: parameters.configurations,
    },
  };

  return await client.sendRequest(config);
}
