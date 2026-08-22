import { PropertyKeysSchema, type PropertyKeys } from '../models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import type { GetCommentPropertyKeys } from '../parameters/getCommentPropertyKeys';
import type { GetCommentProperty } from '../parameters/getCommentProperty';
import type { SetCommentProperty } from '../parameters/setCommentProperty';
import type { DeleteCommentProperty } from '../parameters/deleteCommentProperty';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the keys of all the properties of a comment.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getCommentPropertyKeys(
  client: Client,
  parameters: GetCommentPropertyKeys,
  options?: RequestOptions,
): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/api/3/comment/${parameters.commentId}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of a comment property.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.
 */
export async function getCommentProperty(
  client: Client,
  parameters: GetCommentProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates or updates the value of a property for a comment. Use this resource to store custom data against a comment.
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** either of:
 *
 * - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of
 *   a property on any comment.
 * - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to create or update the value of
 *   a property on a comment created by the user.
 */
export async function setCommentProperty(
  client: Client,
  parameters: SetCommentProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a comment property.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** either of:
 *
 * - _Edit All Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from any
 *   comment.
 * - _Edit Own Comments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete a property from a
 *   comment created by the user.
 */
export async function deleteCommentProperty(
  client: Client,
  parameters: DeleteCommentProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
