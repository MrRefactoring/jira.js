import {
  StoreDevelopmentInformationSchema,
  type StoreDevelopmentInformation,
} from '../models/storeDevelopmentInformation';
import { GetRepositorySchema, type GetRepository } from '../models/getRepository';
import { ExistsByPropertiesSchema, type ExistsByProperties } from '../models/existsByProperties';
import type { StoreDevelopmentInformation as StoreDevelopmentInformationParameters } from '../parameters/storeDevelopmentInformation';
import type { GetRepository as GetRepositoryParameters } from '../parameters/getRepository';
import type { DeleteRepository } from '../parameters/deleteRepository';
import type { DeleteByProperties } from '../parameters/deleteByProperties';
import type { ExistsByProperties as ExistsByPropertiesParameters } from '../parameters/existsByProperties';
import type { DeleteEntity } from '../parameters/deleteEntity';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Stores development information provided in the request to make it available when viewing issues in Jira. Existing
 * repository and entity data for the same ID will be replaced if the updateSequenceId of existing data is less than the
 * incoming data. Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most
 * updates are available within a short period of time, but may take some time during peak load and/or maintenance
 * times.
 */
export async function storeDevelopmentInformation(
  client: Client,
  parameters: StoreDevelopmentInformationParameters,
  options?: RequestOptions,
): Promise<StoreDevelopmentInformation> {
  const config: SendRequestOptions<StoreDevelopmentInformation> = {
    url: '/rest/devinfo/0.10/bulk',
    method: 'POST',
    body: {
      repositories: parameters.repositories,
      preventTransitions: parameters.preventTransitions,
      operationType: parameters.operationType,
      properties: parameters.properties,
      providerMetadata: parameters.providerMetadata,
    },
    schema: StoreDevelopmentInformationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * For the specified repository ID, retrieves the repository and the most recent 400 development information entities.
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 */
export async function getRepository(
  client: Client,
  parameters: GetRepositoryParameters,
  options?: RequestOptions,
): Promise<GetRepository> {
  const config: SendRequestOptions<GetRepository> = {
    url: `/rest/devinfo/0.10/repository/${parameters.repositoryId}`,
    method: 'GET',
    schema: GetRepositorySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the repository data stored by the given ID and all related development information entities. Deletion is
 * performed asynchronously.
 */
export async function deleteRepository(
  client: Client,
  parameters: DeleteRepository,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/devinfo/0.10/repository/${parameters.repositoryId}`,
    method: 'DELETE',
    searchParams: {
      _updateSequenceId: parameters.updateSequenceId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes development information entities which have all the provided properties. Repositories which have properties
 * that match ALL of the properties (i.e. treated as an AND), and all their related development information (such as
 * commits, branches and pull requests), will be deleted. For example if request is `DELETE
 * bulk?accountId=123&projectId=ABC` entities which have properties `accountId=123` and `projectId=ABC` will be deleted.
 * Optional param `_updateSequenceId` is no longer supported. Deletion is performed asynchronously: specified entities
 * will eventually be removed from Jira.
 */
export async function deleteByProperties(
  client: Client,
  parameters: DeleteByProperties,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/devinfo/0.10/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      _updateSequenceId: parameters.updateSequenceId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Checks if repositories which have all the provided properties exists. For example, if request is `GET
 * existsByProperties?accountId=123&projectId=ABC` then result will be positive only if there is at least one repository
 * with both properties `accountId=123` and `projectId=ABC`. Special property `_updateSequenceId` can be used to filter
 * all entities with updateSequenceId less or equal than the value specified. In addition to the optional
 * `_updateSequenceId`, one or more query params must be supplied to specify properties to search by.
 */
export async function existsByProperties(
  client: Client,
  parameters?: ExistsByPropertiesParameters,
  options?: RequestOptions,
): Promise<ExistsByProperties> {
  const config: SendRequestOptions<ExistsByProperties> = {
    url: '/rest/devinfo/0.10/existsByProperties',
    method: 'GET',
    searchParams: {
      _updateSequenceId: parameters?.updateSequenceId,
    },
    schema: ExistsByPropertiesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes particular development information entity. Deletion is performed asynchronously. */
export async function deleteEntity(client: Client, parameters: DeleteEntity, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/devinfo/0.10/repository/${parameters.repositoryId}/${parameters.entityType}/${parameters.entityId}`,
    method: 'DELETE',
    searchParams: {
      _updateSequenceId: parameters.updateSequenceId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
