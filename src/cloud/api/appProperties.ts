import { PropertyKeysSchema, type PropertyKeys } from '../models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import { OperationMessageSchema, type OperationMessage } from '../models/operationMessage';
import { GetForgeAppPropertyKeysSchema, type GetForgeAppPropertyKeys } from '../models/getForgeAppPropertyKeys';
import { GetForgeAppPropertySchema, type GetForgeAppProperty } from '../models/getForgeAppProperty';
import type { GetAddonProperties } from '../parameters/getAddonProperties';
import type { GetAddonProperty } from '../parameters/getAddonProperty';
import type { PutAddonProperty } from '../parameters/putAddonProperty';
import type { DeleteAddonProperty } from '../parameters/deleteAddonProperty';
import type { GetForgeAppProperty as GetForgeAppPropertyParameters } from '../parameters/getForgeAppProperty';
import type { PutForgeAppProperty } from '../parameters/putForgeAppProperty';
import type { DeleteForgeAppProperty } from '../parameters/deleteForgeAppProperty';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Gets all the properties of an app. The reserved key `connect_client_key_019cdff3-8bfb-71fe-9628-875b700aebb8` is not
 * returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only a
 * Connect app whose key matches `addonKey` can make this request. Additionally, Forge apps can access Connect app
 * properties (stored against the same `app.connect.key`).
 */
export async function getAddonProperties(
  client: Client,
  parameters: GetAddonProperties,
  options?: RequestOptions,
): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
    signal: options?.signal,
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
export async function getAddonProperty(
  client: Client,
  parameters: GetAddonProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
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
export async function putAddonProperty(
  client: Client,
  parameters: PutAddonProperty,
  options?: RequestOptions,
): Promise<OperationMessage> {
  const config: SendRequestOptions<OperationMessage> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    schema: OperationMessageSchema,
    signal: options?.signal,
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
export async function deleteAddonProperty(
  client: Client,
  parameters: DeleteAddonProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all property keys for the Forge app.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only Forge
 * apps can make this request. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestjira/#method-signature)**
 * requests from Forge.
 */
export async function getForgeAppPropertyKeys(
  client: Client,
  options?: RequestOptions,
): Promise<GetForgeAppPropertyKeys> {
  const config: SendRequestOptions<GetForgeAppPropertyKeys> = {
    url: '/rest/forge/1/app/properties',
    method: 'GET',
    schema: GetForgeAppPropertyKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of a Forge app's property.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only Forge
 * apps can make this request. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestjira/#method-signature)**
 * requests from Forge.
 */
export async function getForgeAppProperty(
  client: Client,
  parameters: GetForgeAppPropertyParameters,
  options?: RequestOptions,
): Promise<GetForgeAppProperty> {
  const config: SendRequestOptions<GetForgeAppProperty> = {
    url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: GetForgeAppPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of a Forge app's property. These values can be retrieved in [Jira
 * expressions](/cloud/jira/platform/jira-expressions/) through the `app` [context
 * variable](/cloud/jira/platform/jira-expressions/#context-variables). They are also available in [entity property
 * display conditions](/platform/forge/manifest-reference/display-conditions/entity-property-conditions/).
 *
 * For other use cases, use the [Storage API](/platform/forge/runtime-reference/storage-api/).
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only Forge
 * apps can make this request. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestjira/#method-signature)**
 * requests from Forge.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function putForgeAppProperty(
  client: Client,
  parameters: PutForgeAppProperty,
  options?: RequestOptions,
): Promise<OperationMessage> {
  const config: SendRequestOptions<OperationMessage> = {
    url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    schema: OperationMessageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a Forge app's property.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Only Forge
 * apps can make this request. This API can only be accessed using
 * **[asApp()](https://developer.atlassian.com/platform/forge/apis-reference/fetch-api-product.requestjira/#method-signature)**
 * requests from Forge.
 *
 * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
 * recommend adding it to your app's scope list because we will eventually make it mandatory.
 */
export async function deleteForgeAppProperty(
  client: Client,
  parameters: DeleteForgeAppProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/forge/1/app/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
