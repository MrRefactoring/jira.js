import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { type GetProjectPropertyKeys } from '#/parameters/getProjectPropertyKeys';
import { type GetProjectProperty } from '#/parameters/getProjectProperty';
import { type SetProjectProperty } from '#/parameters/setProjectProperty';
import { type DeleteProjectProperty } from '#/parameters/deleteProjectProperty';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns all [project
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
 * keys for the project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectPropertyKeys(
  client: Client,
  parameters: GetProjectPropertyKeys,
): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of a [project
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.
 */
export async function getProjectProperty(client: Client, parameters: GetProjectProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the [project
 * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
 * You can use project properties to store custom data against the project.
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the property is created.
 */
export async function setProjectProperty(client: Client, parameters: SetProjectProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the
 * [property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
 * from a project.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.
 */
export async function deleteProjectProperty(client: Client, parameters: DeleteProjectProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
