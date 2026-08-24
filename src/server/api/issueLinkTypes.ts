import { IssueLinkTypesSchema, type IssueLinkTypes } from '../models/issueLinkTypes';
import { IssueLinkTypeJsonSchema, type IssueLinkTypeJson } from '../models/issueLinkTypeJson';
import type { CreateIssueLinkType } from '../parameters/createIssueLinkType';
import type { ResetOrder } from '../parameters/resetOrder';
import type { GetIssueLinkType } from '../parameters/getIssueLinkType';
import type { UpdateIssueLinkType } from '../parameters/updateIssueLinkType';
import type { DeleteIssueLinkType } from '../parameters/deleteIssueLinkType';
import type { MoveIssueLinkType } from '../parameters/moveIssueLinkType';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns a list of available issue link types, if issue linking is enabled. */
export async function getIssueLinkTypes(client: Client, options?: RequestOptions): Promise<IssueLinkTypes> {
  const config: SendRequestOptions<IssueLinkTypes> = {
    url: '/rest/api/2/issueLinkType',
    method: 'GET',
    schema: IssueLinkTypesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a new issue link type. */
export async function createIssueLinkType(
  client: Client,
  parameters: CreateIssueLinkType,
  options?: RequestOptions,
): Promise<IssueLinkTypeJson> {
  const config: SendRequestOptions<IssueLinkTypeJson> = {
    url: '/rest/api/2/issueLinkType',
    method: 'POST',
    body: {
      id: parameters.id,
      inward: parameters.inward,
      name: parameters.name,
      outward: parameters.outward,
      self: parameters.self,
    },
    schema: IssueLinkTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Resets the order of issue link types alphabetically.
 *
 * Available since Jira Data Center 10.4.
 */
export async function resetOrder(
  client: Client,
  parameters: ResetOrder,
  options?: RequestOptions,
): Promise<IssueLinkTypes> {
  const config: SendRequestOptions<IssueLinkTypes> = {
    url: '/rest/api/2/issueLinkType/order',
    method: 'PUT',
    body: {
      direction: parameters.direction,
    },
    schema: IssueLinkTypesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns for a given issue link type id all information about this issue link type. */
export async function getIssueLinkType(
  client: Client,
  parameters: GetIssueLinkType,
  options?: RequestOptions,
): Promise<IssueLinkTypeJson> {
  const config: SendRequestOptions<IssueLinkTypeJson> = {
    url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
    method: 'GET',
    schema: IssueLinkTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Update the specified issue link type. */
export async function updateIssueLinkType(
  client: Client,
  parameters: UpdateIssueLinkType,
  options?: RequestOptions,
): Promise<IssueLinkTypeJson> {
  const config: SendRequestOptions<IssueLinkTypeJson> = {
    url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
    method: 'PUT',
    body: {
      id: parameters.id,
      inward: parameters.inward,
      name: parameters.name,
      outward: parameters.outward,
      self: parameters.self,
    },
    schema: IssueLinkTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Delete the specified issue link type. */
export async function deleteIssueLinkType(
  client: Client,
  parameters: DeleteIssueLinkType,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Moves the issue link type to a new position within the list.
 *
 * Available since Jira Data Center 10.4.
 */
export async function moveIssueLinkType(
  client: Client,
  parameters: MoveIssueLinkType,
  options?: RequestOptions,
): Promise<IssueLinkTypeJson> {
  const config: SendRequestOptions<IssueLinkTypeJson> = {
    url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}/order`,
    method: 'PUT',
    body: {
      newPosition: parameters.newPosition,
    },
    schema: IssueLinkTypeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
