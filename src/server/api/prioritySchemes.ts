import { PrioritySchemeListSchema, type PrioritySchemeList } from '../models/prioritySchemeList';
import { PrioritySchemeSchema, type PriorityScheme } from '../models/priorityScheme';
import type { GetPrioritySchemes } from '../parameters/getPrioritySchemes';
import type { CreatePriorityScheme } from '../parameters/createPriorityScheme';
import type { GetPriorityScheme } from '../parameters/getPriorityScheme';
import type { UpdatePriorityScheme } from '../parameters/updatePriorityScheme';
import type { DeletePriorityScheme } from '../parameters/deletePriorityScheme';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns all priority schemes. All project keys associated with the priority scheme will only be returned if
 * additional query parameter is provided <code>expand=schemes.projectKeys</code>
 */
export async function getPrioritySchemes(
  client: Client,
  parameters?: GetPrioritySchemes,
  options?: RequestOptions,
): Promise<PrioritySchemeList> {
  const config: SendRequestOptions<PrioritySchemeList> = {
    url: '/rest/api/2/priorityschemes',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      startAt: parameters?.startAt,
    },
    schema: PrioritySchemeListSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Creates new priority scheme. */
export async function createPriorityScheme(
  client: Client,
  parameters: CreatePriorityScheme,
  options?: RequestOptions,
): Promise<PriorityScheme> {
  const config: SendRequestOptions<PriorityScheme> = {
    url: '/rest/api/2/priorityschemes',
    method: 'POST',
    body: {
      defaultOptionId: parameters.defaultOptionId,
      description: parameters.description,
      id: parameters.id,
      name: parameters.name,
      optionIds: parameters.optionIds,
    },
    schema: PrioritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Gets a full representation of a priority scheme in JSON format. */
export async function getPriorityScheme(
  client: Client,
  parameters: GetPriorityScheme,
  options?: RequestOptions,
): Promise<PriorityScheme> {
  const config: SendRequestOptions<PriorityScheme> = {
    url: `/rest/api/2/priorityschemes/${parameters.schemeId}`,
    method: 'GET',
    schema: PrioritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a priority scheme. Update will be rejected if issue migration would be needed as a result of scheme update.
 * Priority scheme update with migration is possible from the UI.
 */
export async function updatePriorityScheme(
  client: Client,
  parameters: UpdatePriorityScheme,
  options?: RequestOptions,
): Promise<PriorityScheme> {
  const config: SendRequestOptions<PriorityScheme> = {
    url: `/rest/api/2/priorityschemes/${parameters.schemeId}`,
    method: 'PUT',
    body: {
      defaultOptionId: parameters.defaultOptionId,
      description: parameters.description,
      id: parameters.id,
      name: parameters.name,
      optionIds: parameters.optionIds,
    },
    schema: PrioritySchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes a priority scheme. All projects using deleted scheme will use default priority scheme afterwards. */
export async function deletePriorityScheme(
  client: Client,
  parameters: DeletePriorityScheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/priorityschemes/${parameters.schemeId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
