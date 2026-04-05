import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { OperationMessageSchema, type OperationMessage } from '#/models/operationMessage';
import { type GetAddonProperties } from '#/parameters/getAddonProperties';
import { type GetAddonProperty } from '#/parameters/getAddonProperty';
import { type PutAddonProperty } from '#/parameters/putAddonProperty';
import { type DeleteAddonProperty } from '#/parameters/deleteAddonProperty';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Gets all the properties of an app. The reserved key `connect_client_key_019cdff3-8bfb-71fe-9628-875b700aebb8` is not
 * returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only a
 * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps can access Connect app
 * properties (stored against the same `app.connect.key`).
 */
export async function getAddonProperties(client: Client, parameters: GetAddonProperties): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the key and value of an app's property. The property key
 * `connect_client_key_019cdff3-8bfb-71fe-9628-875b700aebb8` is reserved. It returns a synthetic, read-only property
 * containing the Connect `clientKey` for the requested tenant. This is intended for Forge apps with `app.connect.key`
 * to retrieve the Connect client key during migration.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only a
 * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps can access Connect app
 * properties (stored against the same `app.connect.key`).
 */
export async function getAddonProperty(client: Client, parameters: GetAddonProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of an app's property. Use this resource to store custom data for your app.
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only a
 * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps can access Connect app
 * properties (stored against the same `app.connect.key`).
 */
export async function putAddonProperty(client: Client, parameters: PutAddonProperty): Promise<OperationMessage> {
  const config: SendRequestOptions<OperationMessage> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    schema: OperationMessageSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an app's property.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only a
 * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps can access Connect app
 * properties (stored against the same `app.connect.key`).
 */
export async function deleteAddonProperty(client: Client, parameters: DeleteAddonProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
