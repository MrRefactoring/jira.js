import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { type GetWorklogPropertyKeys } from '#/parameters/getWorklogPropertyKeys';
import { type GetWorklogProperty } from '#/parameters/getWorklogProperty';
import { type SetWorklogProperty } from '#/parameters/setWorklogProperty';
import { type DeleteWorklogProperty } from '#/parameters/deleteWorklogProperty';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns the keys of all properties for a worklog.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getWorklogPropertyKeys(
  client: Client,
  parameters: GetWorklogPropertyKeys,
): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of a worklog property.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getWorklogProperty(client: Client, parameters: GetWorklogProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of a worklog property. Use this operation to store custom data against the worklog.
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - _Edit all worklogs_[ project permission](https://confluence.atlassian.com/x/yodKLg) to update any worklog or _Edit
 *   own worklogs_ to update worklogs created by the user.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function setWorklogProperty(client: Client, parameters: SetWorklogProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a worklog property.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function deleteWorklogProperty(client: Client, parameters: DeleteWorklogProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issue/${parameters.issueIdOrKey}/worklog/${parameters.worklogId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
