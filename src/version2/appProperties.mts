import * as Models from './models/index.mjs';
import * as Parameters from './parameters/index.mjs';
import type { Callback } from '@/callback.mjs';
import type { Client } from '../clients/index.mjs';
import type { RequestConfig } from '@/requestConfig.mjs';

export class AppProperties {
  constructor(private client: Client) {}

  /**
   * Gets all the properties of an app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps published on the
   * Marketplace can access properties of Connect apps they were [migrated
   * from](https://developer.atlassian.com/platform/forge/build-a-connect-on-forge-app/).
   */
  async getAddonProperties<T = Models.PropertyKeys>(
    parameters: Parameters.GetAddonProperties | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Gets all the properties of an app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps published on the
   * Marketplace can access properties of Connect apps they were [migrated
   * from](https://developer.atlassian.com/platform/forge/build-a-connect-on-forge-app/).
   */
  async getAddonProperties<T = Models.PropertyKeys>(
    parameters: Parameters.GetAddonProperties | string,
    callback?: never,
  ): Promise<T>;
  async getAddonProperties<T = Models.PropertyKeys>(
    parameters: Parameters.GetAddonProperties | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const addonKey = typeof parameters === 'string' ? parameters : parameters.addonKey;

    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${addonKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the key and value of an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps published on the
   * Marketplace can access properties of Connect apps they were [migrated
   * from](https://developer.atlassian.com/platform/forge/build-a-connect-on-forge-app/).
   */
  async getAddonProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetAddonProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the key and value of an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps published on the
   * Marketplace can access properties of Connect apps they were [migrated
   * from](https://developer.atlassian.com/platform/forge/build-a-connect-on-forge-app/).
   */
  async getAddonProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetAddonProperty,
    callback?: never,
  ): Promise<T>;
  async getAddonProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetAddonProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of an app's property. Use this resource to store custom data for your app.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async putAddonProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAddonProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the value of an app's property. Use this resource to store custom data for your app.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async putAddonProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAddonProperty,
    callback?: never,
  ): Promise<T>;
  async putAddonProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAddonProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
      data: parameters.propertyValue,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async deleteAddonProperty<T = void>(parameters: Parameters.DeleteAddonProperty, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async deleteAddonProperty<T = void>(parameters: Parameters.DeleteAddonProperty, callback?: never): Promise<T>;
  async deleteAddonProperty<T = void>(
    parameters: Parameters.DeleteAddonProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of a Forge app's property. These values can be retrieved in [Jira
   * expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/) through the `app` [context
   * variable](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables).
   *
   * For other use cases, use the [Storage
   * API](https://developer.atlassian.com/platform/forge/runtime-reference/storage-api/).
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Forge apps can make this request.
   */
  async putAppProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAppProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the value of a Forge app's property. These values can be retrieved in [Jira
   * expressions](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/) through the `app` [context
   * variable](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables).
   *
   * For other use cases, use the [Storage
   * API](https://developer.atlassian.com/platform/forge/runtime-reference/storage-api/).
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Forge apps can make this request.
   */
  async putAppProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAppProperty,
    callback?: never,
  ): Promise<T>;
  async putAppProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAppProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    // todo
    const config: RequestConfig = {
      url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
      method: 'PUT',
      data: parameters.propertyValue,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a Forge app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Forge apps can make this request.
   */
  async deleteAppProperty<T = void>(parameters: Parameters.DeleteAppProperty, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a Forge app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Forge apps can make this request.
   */
  async deleteAppProperty<T = void>(parameters: Parameters.DeleteAppProperty, callback?: never): Promise<T>;
  async deleteAppProperty<T = void>(
    parameters: Parameters.DeleteAppProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
