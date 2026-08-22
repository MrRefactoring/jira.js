import { IssueTypeJsonSchema, type IssueTypeJson } from '../models/issueTypeJson';
import { AvatarSchema, type Avatar } from '../models/avatar';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import type { CreateIssueType } from '../parameters/createIssueType';
import type { GetPaginatedIssueTypes } from '../parameters/getPaginatedIssueTypes';
import type { GetIssueType } from '../parameters/getIssueType';
import type { UpdateIssueType } from '../parameters/updateIssueType';
import type { DeleteIssueType } from '../parameters/deleteIssueType';
import type { GetAlternativeIssueTypes } from '../parameters/getAlternativeIssueTypes';
import type { CreateIssueTypeAvatarFromTemporary } from '../parameters/createIssueTypeAvatarFromTemporary';
import type { StoreTemporaryIssueTypeAvatarUsingMultiPart } from '../parameters/storeTemporaryIssueTypeAvatarUsingMultiPart';
import type { GetIssueTypePropertyKeys } from '../parameters/getIssueTypePropertyKeys';
import type { GetIssueTypeProperty } from '../parameters/getIssueTypeProperty';
import type { SetIssueTypeProperty } from '../parameters/setIssueTypeProperty';
import type { DeleteIssueTypeProperty } from '../parameters/deleteIssueTypeProperty';
import { type Client, type RequestOptions, type SendRequestOptions, toFormDataFile } from '#/core';
import { z } from 'zod';

/** Returns a list of all issue types visible to the user */
export async function getIssueAllTypes(client: Client, options?: RequestOptions): Promise<IssueTypeJson[]> {
  const config: SendRequestOptions<IssueTypeJson[]> = {
    url: '/rest/api/2/issuetype',
    method: 'GET',
    schema: z.array(IssueTypeJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue type from a JSON representation and adds the issue newly created issue type to the default issue
 * type scheme.
 */
export async function createIssueType(
  client: Client,
  parameters: CreateIssueType,
  options?: RequestOptions,
): Promise<IssueTypeJson> {
  const config: SendRequestOptions<IssueTypeJson> = {
    url: '/rest/api/2/issuetype',
    method: 'POST',
    body: {
      description: parameters.description,
      name: parameters.name,
      type: parameters.type,
    },
    schema: IssueTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns paginated list of filtered issue types */
export async function getPaginatedIssueTypes(
  client: Client,
  parameters?: GetPaginatedIssueTypes,
  options?: RequestOptions,
): Promise<IssueTypeJson> {
  const config: SendRequestOptions<IssueTypeJson> = {
    url: '/rest/api/2/issuetype/page',
    method: 'GET',
    headers: {
      ...(parameters?.['X-Requested-With'] === undefined ? {} : { 'X-Requested-With': parameters['X-Requested-With'] }),
    },
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      projectIds: parameters?.projectIds,
      startAt: parameters?.startAt,
    },
    schema: IssueTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a full representation of the issue type that has the given id. */
export async function getIssueType(
  client: Client,
  parameters: GetIssueType,
  options?: RequestOptions,
): Promise<IssueTypeJson> {
  const config: SendRequestOptions<IssueTypeJson> = {
    url: `/rest/api/2/issuetype/${parameters.id}`,
    method: 'GET',
    schema: IssueTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates the specified issue type from a JSON representation. */
export async function updateIssueType(
  client: Client,
  parameters: UpdateIssueType,
  options?: RequestOptions,
): Promise<IssueTypeJson> {
  const config: SendRequestOptions<IssueTypeJson> = {
    url: `/rest/api/2/issuetype/${parameters.id}`,
    method: 'PUT',
    body: {
      avatarId: parameters.avatarId,
      description: parameters.description,
      name: parameters.name,
    },
    schema: IssueTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the specified issue type. If the issue type has any associated issues, these issues will be migrated to the
 * alternative issue type specified in the parameter.
 */
export async function deleteIssueType(
  client: Client,
  parameters: DeleteIssueType,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetype/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      alternativeIssueTypeId: parameters.alternativeIssueTypeId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a list of all alternative issue types for the given issue type id. */
export async function getAlternativeIssueTypes(
  client: Client,
  parameters: GetAlternativeIssueTypes,
  options?: RequestOptions,
): Promise<IssueTypeJson[]> {
  const config: SendRequestOptions<IssueTypeJson[]> = {
    url: `/rest/api/2/issuetype/${parameters.id}/alternatives`,
    method: 'GET',
    schema: z.array(IssueTypeJsonSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Converts temporary avatar into a real avatar */
export async function createIssueTypeAvatarFromTemporary(
  client: Client,
  parameters: CreateIssueTypeAvatarFromTemporary,
  options?: RequestOptions,
): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: `/rest/api/2/issuetype/${parameters.id}/avatar`,
    method: 'POST',
    body: {
      cropperOffsetX: parameters.cropperOffsetX,
      cropperOffsetY: parameters.cropperOffsetY,
      cropperWidth: parameters.cropperWidth,
      needsCropping: parameters.needsCropping,
      url: parameters.url,
    },
    schema: AvatarSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates temporary avatar using multipart. The response is sent back as JSON stored in a textarea. This is because the
 * client uses remote iframing to submit avatars using multipart. So we must send them a valid HTML page back from which
 * the client parses the JSON from. Creating a temporary avatar is part of a 3-step process in uploading a new avatar
 * for an issue type: upload, crop, confirm. This endpoint allows you to use a multipart upload instead of sending the
 * image directly as the request body. You _must_ use "avatar" as the name of the upload parameter: curl -c
 * cookiejar.txt -X POST -u admin:admin -H "X-Atlassian-Token: no-check"\
 * -F "avatar=@mynewavatar.png;type=image/png"\
 * 'http://localhost:8090/jira/rest/api/2/issuetype/1/avatar/temporary'
 */
export async function storeTemporaryIssueTypeAvatarUsingMultiPart(
  client: Client,
  parameters: StoreTemporaryIssueTypeAvatarUsingMultiPart,
  options?: RequestOptions,
): Promise<unknown> {
  const formData = new FormData();
  const items = Array.isArray(parameters.avatar) ? parameters.avatar : [parameters.avatar];

  for (const attachment of items) {
    formData.append('avatar', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/2/issuetype/${parameters.id}/avatar/temporary`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the keys of all properties for the issue type identified by the id */
export async function getIssueTypePropertyKeys(
  client: Client,
  parameters: GetIssueTypePropertyKeys,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the value of the property with a given key from the issue type identified by the id */
export async function getIssueTypeProperty(
  client: Client,
  parameters: GetIssueTypeProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Sets the value of the specified issue type's property */
export async function setIssueTypeProperty(
  client: Client,
  parameters: SetIssueTypeProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Removes the property from the issue type identified by the id */
export async function deleteIssueTypeProperty(
  client: Client,
  parameters: DeleteIssueTypeProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
