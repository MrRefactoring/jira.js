import { type UpdateMultipleCustomFieldValues } from '#/parameters/updateMultipleCustomFieldValues';
import { type UpdateCustomFieldValue } from '#/parameters/updateCustomFieldValue';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should
 * be unique within the request.
 *
 * Apps can only perform this operation on [custom
 * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) and [custom
 * field types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
 * declared in their own manifests.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only the
 * app that owns the custom field or custom field type can update its values with this operation.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function updateMultipleCustomFieldValues(
  client: Client,
  parameters: UpdateMultipleCustomFieldValues,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/app/field/value',
    method: 'POST',
    searchParams: {
      generateChangelog: parameters.generateChangelog,
    },
    body: {
      updates: parameters.updates,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Updates the value of a custom field on one or more issues.
 *
 * Apps can only perform this operation on [custom
 * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) and [custom
 * field types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
 * declared in their own manifests.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only the
 * app that owns the custom field or custom field type can update its values with this operation.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function updateCustomFieldValue(client: Client, parameters: UpdateCustomFieldValue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/app/field/${parameters.fieldIdOrKey}/value`,
    method: 'PUT',
    searchParams: {
      generateChangelog: parameters.generateChangelog,
    },
    body: {
      updates: parameters.updates,
    },
  };

  return await client.sendRequest(config);
}
