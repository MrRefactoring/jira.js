import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class AppProperties {
  constructor(private client: Client) {}

  /**
   * Gets all the properties of an app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async getAddonProperties<T = Models.PropertyKeys>(
    parameters: Parameters.GetAddonProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Gets all the properties of an app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async getAddonProperties<T = Models.PropertyKeys>(
    parameters: Parameters.GetAddonProperties,
    callback?: never
  ): Promise<T>;
  async getAddonProperties<T = Models.PropertyKeys>(
    parameters: Parameters.GetAddonProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.appProperties.getAddonProperties' });
  }

  /**
   * Returns the key and value of an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async getAddonProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetAddonProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the key and value of an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async getAddonProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetAddonProperty,
    callback?: never
  ): Promise<T>;
  async getAddonProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetAddonProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.appProperties.getAddonProperty' });
  }

  /**
   * Sets the value of an app's property. Use this resource to store custom data for your app.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async putAddonProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAddonProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the value of an app's property. Use this resource to store custom data for your app.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async putAddonProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAddonProperty,
    callback?: never
  ): Promise<T>;
  async putAddonProperty<T = Models.OperationMessage>(
    parameters: Parameters.PutAddonProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.appProperties.putAddonProperty' });
  }

  /**
   * Deletes an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
   * Connect app whose key matches `addonKey` can make this request.
   */
  async deleteAddonProperty<T = void>(parameters: Parameters.DeleteAddonProperty, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an app's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only a
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.appProperties.deleteAddonProperty' });
  }
}
