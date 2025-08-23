import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAddonPropertiesParameters } from './parameters/getAddonPropertiesParameters';
import type { DeleteAddonPropertyParameters } from './parameters/deleteAddonPropertyParameters';
import type { GetAddonPropertyParameters } from './parameters/getAddonPropertyParameters';
import type { PutAddonPropertyParameters } from './parameters/putAddonPropertyParameters';
import type { DeleteForgeAppPropertyParameters } from './parameters/deleteForgeAppPropertyParameters';
import type { PutForgeAppPropertyParameters } from './parameters/putForgeAppPropertyParameters';

export class AppProperties {
  constructor(private client: Client) {}
  /**
   * Gets all the properties of an app. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   *   Connect app whose key matches `addonKey` can make this request.
   * - Additionally, Forge apps can access Connect app properties (stored against the same `app.connect.key`).
   */
  async getAddonProperties(parameters: GetAddonPropertiesParameters) {
    const request: Request = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an app's property. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   *   Connect app whose key matches `addonKey` can make this request.
   * - Additionally, Forge apps can access Connect app properties (stored against the same `app.connect.key`).
   */
  async deleteAddonProperty(parameters: DeleteAddonPropertyParameters) {
    const request: Request = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the key and value of an app's property. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   *   Connect app whose key matches `addonKey` can make this request.
   * - Additionally, Forge apps can access Connect app properties (stored against the same `app.connect.key`).
   */
  async getAddonProperty(parameters: GetAddonPropertyParameters) {
    const request: Request = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the value of an app's property. Use this resource to store custom data for your app. *
   *
   * - The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   *   maximum length is 32768 characters.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only a
   *   Connect app whose key matches `addonKey` can make this request.
   * - Additionally, Forge apps can access Connect app properties (stored against the same `app.connect.key`).
   */
  async putAddonProperty(parameters: PutAddonPropertyParameters) {
    const request: Request = {
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a Forge app's property. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Forge apps can make this request.
   * -
   * - The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async deleteForgeAppProperty(parameters: DeleteForgeAppPropertyParameters) {
    const request: Request = {
      url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the value of a Forge app's property.
   *
   * - These values can be retrieved in [Jira expressions](/cloud/jira/platform/jira-expressions/)
   * - Through the `app` [context variable](/cloud/jira/platform/jira-expressions/#context-variables).
   * - They are also available in [entity property display
   *   conditions](/platform/forge/manifest-reference/display-conditions/entity-property-conditions/).
   * -
   * - For other use cases, use the [Storage API](/platform/forge/runtime-reference/storage-api/).
   * -
   * - The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   *   maximum length is 32768 characters.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Forge apps can make this request.
   * -
   * - The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async putForgeAppProperty(parameters: PutForgeAppPropertyParameters) {
    const request: Request = {
      url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }
}
