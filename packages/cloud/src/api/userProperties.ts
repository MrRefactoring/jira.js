import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { type GetUserPropertyKeys } from '#/parameters/getUserPropertyKeys';
import { type GetUserProperty } from '#/parameters/getUserProperty';
import { type SetUserProperty } from '#/parameters/setUserProperty';
import { type DeleteUserProperty } from '#/parameters/deleteUserProperty';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the keys of all properties for a user.
 *
 * Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
 * maintained in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to access the property keys on any
 *   user.
 * - Access to Jira, to access the calling user's property keys.
 */
export async function getUserPropertyKeys(client: Client, parameters?: GetUserPropertyKeys): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: '/rest/api/3/user/properties',
    method: 'GET',
    searchParams: {
      accountId: parameters?.accountId,
    },
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of a user's property. If no property key is provided [Get user property
 * keys](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user/#api-rest-api-3-user-properties-get)
 * is called.
 *
 * Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
 * maintained in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from any user.
 * - Access to Jira, to get a property from the calling user's record.
 */
export async function getUserProperty(client: Client, parameters: GetUserProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
    },
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of a user's property. Use this resource to store custom data against a user.
 *
 * Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
 * maintained in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on any user.
 * - Access to Jira, to set a property on the calling user's record.
 */
export async function setUserProperty(client: Client, parameters: SetUserProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
    method: 'PUT',
    searchParams: {
      accountId: parameters.accountId,
    },
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a property from a user.
 *
 * Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
 * maintained in Jira.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to delete a property from any user.
 * - Access to Jira, to delete a property from the calling user's record.
 */
export async function deleteUserProperty(client: Client, parameters: DeleteUserProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
    },
  };

  return await client.sendRequest(config);
}
