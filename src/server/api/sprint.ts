import { SprintSchema, type Sprint } from '../models/sprint';
import { SearchResultsSchema, type SearchResults } from '../models/searchResults';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import type { CreateSprint } from '../parameters/createSprint';
import type { UnmapSprints } from '../parameters/unmapSprints';
import type { GetSprint } from '../parameters/getSprint';
import type { PartiallyUpdateSprint } from '../parameters/partiallyUpdateSprint';
import type { UpdateSprint } from '../parameters/updateSprint';
import type { DeleteSprint } from '../parameters/deleteSprint';
import type { GetIssuesForSprint } from '../parameters/getIssuesForSprint';
import type { MoveIssuesToSprint } from '../parameters/moveIssuesToSprint';
import type { GetSprintPropertyKeys } from '../parameters/getSprintPropertyKeys';
import type { GetSprintProperty } from '../parameters/getSprintProperty';
import type { SetSprintProperty } from '../parameters/setSprintProperty';
import type { DeleteSprintProperty } from '../parameters/deleteSprintProperty';
import type { SwapSprint } from '../parameters/swapSprint';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Creates a future sprint. Sprint name and origin board id are required. Start and end date are optional. Notes: The
 * sprint name is trimmed. Only Jira administrators can create synced sprints.
 */
export async function createSprint(
  client: Client,
  parameters: CreateSprint,
  options?: RequestOptions,
): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: '/rest/agile/1.0/sprint',
    method: 'POST',
    body: {
      autoStartStop: parameters.autoStartStop,
      endDate: parameters.endDate,
      goal: parameters.goal,
      incompleteIssuesDestinationId: parameters.incompleteIssuesDestinationId,
      name: parameters.name,
      originBoardId: parameters.originBoardId,
      startDate: parameters.startDate,
      synced: parameters.synced,
      userProfileTimeZone: parameters.userProfileTimeZone,
    },
    schema: SprintSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Sets the Synced flag to false for all sprints in the provided list. */
export async function unmapSprints(client: Client, parameters: UnmapSprints, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/agile/1.0/sprint/unmap',
    method: 'PUT',
    body: {
      sprintIds: parameters.sprintIds,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the Synced flag to false for all sprints on this Jira instance. This operation is intended for cleanup only. It
 * is highly destructive and not reversible. Use with caution.
 */
export async function unmapAllSprints(client: Client, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/agile/1.0/sprint/unmap-all',
    method: 'PUT',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a single sprint, for a given sprint Id. The sprint will only be returned if the user can view the board that
 * the sprint was created on, or view at least one of the issues in the sprint.
 */
export async function getSprint(client: Client, parameters: GetSprint, options?: RequestOptions): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'GET',
    schema: SprintSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Performs a partial update of a sprint. A partial update means that fields not present in the request JSON will not be
 * updated. Notes:
 *
 * - Sprints that are in a closed state cannot be updated.
 * - A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and
 *   have a startDate and endDate set.
 * - A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active'
 *   state. This sets the completeDate to the time of the request. If the sprint has offending issues (those which are
 *   complete, but have incomplete subtasks) it cannot be closed. If issues are moved to new sprint user has to have
 *   issues edit permissions.
 * - Other changes to state are not allowed.
 * - The completeDate field cannot be updated manually.
 * - Sprint goal can be removed by updating it's value to empty string
 * - Only Jira administrators can edit dates on sprints that are marked as synced.
 */
export async function partiallyUpdateSprint(
  client: Client,
  parameters: PartiallyUpdateSprint,
  options?: RequestOptions,
): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'POST',
    body: {
      activatedDate: parameters.activatedDate,
      autoStartStop: parameters.autoStartStop,
      completeDate: parameters.completeDate,
      endDate: parameters.endDate,
      goal: parameters.goal,
      id: parameters.id,
      incompleteIssuesDestinationId: parameters.incompleteIssuesDestinationId,
      name: parameters.name,
      originBoardId: parameters.originBoardId,
      self: parameters.self,
      startDate: parameters.startDate,
      state: parameters.state,
      synced: parameters.synced,
    },
    schema: SprintSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Performs a full update of a sprint. A full update means that the result will be exactly the same as the request body.
 * Any fields not present in the request JSON will be set to null. Notes:
 *
 * - Sprints that are in a closed state cannot be updated.
 * - A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and
 *   have a startDate and endDate set.
 * - A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active'
 *   state. This sets the completeDate to the time of the request. If the sprint has offending issues (those which are
 *   complete, but have incomplete subtasks) it cannot be closed. If issues are moved to new sprint user has to have
 *   issues edit permissions.
 * - Other changes to state are not allowed.
 * - The completeDate field cannot be updated manually.
 * - Only Jira administrators can edit dates on sprints that are marked as synced.
 */
export async function updateSprint(
  client: Client,
  parameters: UpdateSprint,
  options?: RequestOptions,
): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'PUT',
    body: {
      activatedDate: parameters.activatedDate,
      autoStartStop: parameters.autoStartStop,
      completeDate: parameters.completeDate,
      endDate: parameters.endDate,
      goal: parameters.goal,
      id: parameters.id,
      incompleteIssuesDestinationId: parameters.incompleteIssuesDestinationId,
      name: parameters.name,
      originBoardId: parameters.originBoardId,
      self: parameters.self,
      startDate: parameters.startDate,
      state: parameters.state,
      synced: parameters.synced,
    },
    schema: SprintSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a sprint. Once a sprint is deleted, all issues in the sprint will be moved to the backlog. To delete a synced
 * sprint, you must unsync it first.
 */
export async function deleteSprint(client: Client, parameters: DeleteSprint, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all issues in a sprint, for a given sprint Id. This only includes issues that the user has permission to
 * view. By default, the returned issues are ordered by rank.
 */
export async function getIssuesForSprint(
  client: Client,
  parameters: GetIssuesForSprint,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/issue`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      jql: parameters.jql,
      maxResults: parameters.maxResults,
      validateQuery: parameters.validateQuery,
      fields: parameters.fields,
      startAt: parameters.startAt,
    },
    schema: SearchResultsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Moves issues to a sprint, for a given sprint Id. Issues can only be moved to open or active sprints. The maximum
 * number of issues that can be moved in one operation is 50.
 */
export async function moveIssuesToSprint(
  client: Client,
  parameters: MoveIssuesToSprint,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/issue`,
    method: 'POST',
    body: {
      issues: parameters.issues,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the keys of all properties for the sprint identified by the id. The user who retrieves the property keys is
 * required to have permissions to view the sprint.
 */
export async function getSprintPropertyKeys(
  client: Client,
  parameters: GetSprintPropertyKeys,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of the property with a given key from the sprint identified by the provided id. The user who
 * retrieves the property is required to have permissions to view the sprint.
 */
export async function getSprintProperty(
  client: Client,
  parameters: GetSprintProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the specified sprint's property. You can use this resource to store a custom data against the
 * sprint identified by the id. The user who stores the data is required to have permissions to modify the sprint.
 */
export async function setSprintProperty(
  client: Client,
  parameters: SetSprintProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the property from the sprint identified by the id. Ths user removing the property is required to have
 * permissions to modify the sprint.
 */
export async function deleteSprintProperty(
  client: Client,
  parameters: DeleteSprintProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Swap the position of the sprint with the second sprint. */
export async function swapSprint(client: Client, parameters: SwapSprint, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/swap`,
    method: 'POST',
    body: {
      sprintToSwapWith: parameters.sprintToSwapWith,
      swap: parameters.swap,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
