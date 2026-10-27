import { ScimConfigurationDocumentSchema, type ScimConfigurationDocument } from '../models/scimConfigurationDocument';
import type { GetResourceTypes } from '../parameters/getResourceTypes';
import type { GetUserResourceType } from '../parameters/getUserResourceType';
import type { GetGroupResourceType } from '../parameters/getGroupResourceType';
import type { GetServiceProviderConfig } from '../parameters/getServiceProviderConfig';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Get different types of resources available on a SCIM service provider (e.g., Users and Groups). **Note:** This API
 * does not support filtering, pagination, or sorting.
 */
export async function getResourceTypes(
  client: Client,
  parameters: GetResourceTypes,
  options?: RequestOptions,
): Promise<ScimConfigurationDocument> {
  const config: SendRequestOptions<ScimConfigurationDocument> = {
    url: `/scim/directory/${parameters.directoryId}/ResourceTypes`,
    method: 'GET',
    schema: ScimConfigurationDocumentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves user resource types from the SCIM service provider.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getUserResourceType(
  client: Client,
  parameters: GetUserResourceType,
  options?: RequestOptions,
): Promise<ScimConfigurationDocument> {
  const config: SendRequestOptions<ScimConfigurationDocument> = {
    url: `/scim/directory/${parameters.directoryId}/ResourceTypes/User`,
    method: 'GET',
    schema: ScimConfigurationDocumentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves group resource type of this SCIM service provider.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getGroupResourceType(
  client: Client,
  parameters: GetGroupResourceType,
  options?: RequestOptions,
): Promise<ScimConfigurationDocument> {
  const config: SendRequestOptions<ScimConfigurationDocument> = {
    url: `/scim/directory/${parameters.directoryId}/ResourceTypes/Group`,
    method: 'GET',
    schema: ScimConfigurationDocumentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get metadata about the supported SCIM features. This is a service provider configuration endpoint providing supported
 * SCIM features.
 *
 * **Note:** This API does not support filtering, pagination, or sorting.
 */
export async function getServiceProviderConfig(
  client: Client,
  parameters: GetServiceProviderConfig,
  options?: RequestOptions,
): Promise<ScimConfigurationDocument> {
  const config: SendRequestOptions<ScimConfigurationDocument> = {
    url: `/scim/directory/${parameters.directoryId}/ServiceProviderConfig`,
    method: 'GET',
    schema: ScimConfigurationDocumentSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
