import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { type GetIssueTypePropertyKeys } from '#/parameters/getIssueTypePropertyKeys';
import { type GetIssueTypeProperty } from '#/parameters/getIssueTypeProperty';
import { type SetIssueTypeProperty } from '#/parameters/setIssueTypeProperty';
import { type DeleteIssueTypeProperty } from '#/parameters/deleteIssueTypeProperty';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns all the [issue type
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
 * keys of the issue type.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the property keys of any
 *   issue type.
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) to get the property keys of any
 *   issue types associated with the projects the user has permission to browse.
 */
export async function getIssueTypePropertyKeys(
  client: Client,
  parameters: GetIssueTypePropertyKeys,
): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the key and value of the [issue type
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the details of any issue
 *   type.
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) to get the details of any issue
 *   types associated with the projects the user has permission to browse.
 */
export async function getIssueTypeProperty(client: Client, parameters: GetIssueTypeProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates or updates the value of the [issue type
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
 * Use this resource to store and update data against an issue type.
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setIssueTypeProperty(client: Client, parameters: SetIssueTypeProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the [issue type
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteIssueTypeProperty(client: Client, parameters: DeleteIssueTypeProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
