import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldValuesApps {
  constructor(private client: Client) {}

  /**
   * Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should
   * be unique within the request. Custom fields can only be updated by the Forge app that created them.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * the app that created the custom field can update its values with this operation.
   */
  async updateMultipleCustomFieldValues<T = void>(
    parameters: Parameters.UpdateMultipleCustomFieldValues | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates the value of one or more custom fields on one or more issues. Combinations of custom field and issue should
   * be unique within the request. Custom fields can only be updated by the Forge app that created them.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * the app that created the custom field can update its values with this operation.
   */
  async updateMultipleCustomFieldValues<T = void>(
    parameters?: Parameters.UpdateMultipleCustomFieldValues,
    callback?: never
  ): Promise<T>;
  async updateMultipleCustomFieldValues<T = void>(
    parameters?: Parameters.UpdateMultipleCustomFieldValues,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/app/field/value',
      method: 'POST',
      params: {
        generateChangelog: parameters?.generateChangelog,
      },
      data: {
        updates: parameters?.updates,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the value of a custom field on one or more issues. Custom fields can only be updated by the Forge app that
   * created them.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * the app that created the custom field can update its values with this operation.
   */
  async updateCustomFieldValue<T = void>(
    parameters: Parameters.UpdateCustomFieldValue,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates the value of a custom field on one or more issues. Custom fields can only be updated by the Forge app that
   * created them.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * the app that created the custom field can update its values with this operation.
   */
  async updateCustomFieldValue<T = void>(parameters: Parameters.UpdateCustomFieldValue, callback?: never): Promise<T>;
  async updateCustomFieldValue<T = void>(
    parameters: Parameters.UpdateCustomFieldValue,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/app/field/${parameters.fieldIdOrKey}/value`,
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
