import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueCustomFieldValuesApps {
  constructor(private client: Client) {}

  /**
   * Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should
   * be unique within the request.
   *
   * Apps can only perform this operation on [custom
   * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) and [custom
   * field types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
   * declared in their own manifests.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * the app that owns the custom field or custom field type can update its values with this operation.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateMultipleCustomFieldValues<T = void>(
    parameters: Parameters.UpdateMultipleCustomFieldValues,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should
   * be unique within the request.
   *
   * Apps can only perform this operation on [custom
   * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) and [custom
   * field types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
   * declared in their own manifests.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * the app that owns the custom field or custom field type can update its values with this operation.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateMultipleCustomFieldValues<T = void>(
    parameters: Parameters.UpdateMultipleCustomFieldValues,
    callback?: never,
  ): Promise<T>;
  async updateMultipleCustomFieldValues<T = void>(
    parameters: Parameters.UpdateMultipleCustomFieldValues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/app/field/value',
      method: 'POST',
      params: {
        generateChangelog: parameters.generateChangelog,
      },
      data: {
        updates: parameters.updates,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the value of a custom field on one or more issues.
   *
   * Apps can only perform this operation on [custom
   * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) and [custom
   * field types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
   * declared in their own manifests.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * the app that owns the custom field or custom field type can update its values with this operation.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateCustomFieldValue<T = void>(
    parameters: Parameters.UpdateCustomFieldValue,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the value of a custom field on one or more issues.
   *
   * Apps can only perform this operation on [custom
   * fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/) and [custom
   * field types](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type/)
   * declared in their own manifests.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * the app that owns the custom field or custom field type can update its values with this operation.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateCustomFieldValue<T = void>(parameters: Parameters.UpdateCustomFieldValue, callback?: never): Promise<T>;
  async updateCustomFieldValue<T = void>(
    parameters: Parameters.UpdateCustomFieldValue,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/app/field/${parameters.fieldIdOrKey}/value`,
      method: 'PUT',
      params: {
        generateChangelog: parameters.generateChangelog,
      },
      data: {
        updates: parameters.updates,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
