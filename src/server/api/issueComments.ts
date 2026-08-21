import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import type { GetCommentPropertyKeys } from '../parameters/getCommentPropertyKeys';
import type { GetCommentProperty } from '../parameters/getCommentProperty';
import type { SetCommentProperty } from '../parameters/setCommentProperty';
import type { DeleteCommentProperty } from '../parameters/deleteCommentProperty';
import type { Client, SendRequestOptions } from '#/core';

/** Returns the keys of all properties for the comment identified by the key or by the id. */
export async function getCommentPropertyKeys(
  client: Client,
  parameters: GetCommentPropertyKeys,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/api/2/comment/${parameters.commentId}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of the property with a given key from the comment identified by the key or by the id. The user who
 * retrieves the property is required to have permissions to read the comment.
 */
export async function getCommentProperty(client: Client, parameters: GetCommentProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/** Sets the value of the specified comment's property. */
export async function setCommentProperty(client: Client, parameters: SetCommentProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the property from the comment identified by the key or by the id. Ths user removing the property is required
 * to have permissions to administer the comment.
 */
export async function deleteCommentProperty(client: Client, parameters: DeleteCommentProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
