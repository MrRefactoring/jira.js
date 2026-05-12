import { SprintSchema, type Sprint } from '#/models/sprint';
import { SearchResultsSchema, type SearchResults } from '#/models/searchResults';
import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { type CreateSprint } from '#/parameters/createSprint';
import { type GetSprint } from '#/parameters/getSprint';
import { type PartiallyUpdateSprint } from '#/parameters/partiallyUpdateSprint';
import { type UpdateSprint } from '#/parameters/updateSprint';
import { type DeleteSprint } from '#/parameters/deleteSprint';
import { type GetIssuesForSprint } from '#/parameters/getIssuesForSprint';
import { type MoveIssuesToSprintAndRank } from '#/parameters/moveIssuesToSprintAndRank';
import { type GetPropertiesKeys } from '#/parameters/getPropertiesKeys';
import { type GetProperty } from '#/parameters/getProperty';
import { type SetProperty } from '#/parameters/setProperty';
import { type DeleteProperty } from '#/parameters/deleteProperty';
import { type SwapSprint } from '#/parameters/swapSprint';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Creates a future sprint. Sprint name and origin board id are required. Start date, end date, and goal are optional.
 *
 * Note that the sprint name is trimmed. Also, when starting sprints from the UI, the "endDate" set through this call is
 * ignored and instead the last sprint's duration is used to fill the form.
 */
export async function createSprint(client: Client, parameters: CreateSprint): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: '/rest/agile/1.0/sprint',
    method: 'POST',
    body: {
      endDate: parameters.endDate,
      goal: parameters.goal,
      name: parameters.name,
      originBoardId: parameters.originBoardId,
      startDate: parameters.startDate,
    },
    schema: SprintSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the sprint for a given sprint ID. The sprint will only be returned if the user can view the board that the
 * sprint was created on, or view at least one of the issues in the sprint.
 */
export async function getSprint(client: Client, parameters: GetSprint): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'GET',
    schema: SprintSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Performs a partial update of a sprint. A partial update means that fields not present in the request JSON will not be
 * updated.
 *
 * Notes:
 *
 * - For closed sprints, only the name and goal can be updated; changes to other fields will be ignored.
 * - A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and
 *   have a startDate and endDate set.
 * - A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active'
 *   state. This sets the completeDate to the time of the request.
 * - Other changes to state are not allowed.
 * - The completeDate field cannot be updated manually.
 */
export async function partiallyUpdateSprint(client: Client, parameters: PartiallyUpdateSprint): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'POST',
    body: {
      completeDate: parameters.completeDate,
      createdDate: parameters.createdDate,
      endDate: parameters.endDate,
      goal: parameters.goal,
      id: parameters.id,
      name: parameters.name,
      originBoardId: parameters.originBoardId,
      startDate: parameters.startDate,
      state: parameters.state,
    },
    schema: SprintSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Performs a full update of a sprint. A full update means that the result will be exactly the same as the request body.
 * Any fields not present in the request JSON will be set to null.
 *
 * Notes:
 *
 * - For closed sprints, only the name and goal can be updated; changes to other fields will be ignored.
 * - A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and
 *   have a startDate and endDate set.
 * - A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active'
 *   state. This sets the completeDate to the time of the request.
 * - Other changes to state are not allowed.
 * - The completeDate field cannot be updated manually.
 */
export async function updateSprint(client: Client, parameters: UpdateSprint): Promise<Sprint> {
  const config: SendRequestOptions<Sprint> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'PUT',
    body: {
      completeDate: parameters.completeDate,
      createdDate: parameters.createdDate,
      endDate: parameters.endDate,
      goal: parameters.goal,
      id: parameters.id,
      name: parameters.name,
      originBoardId: parameters.originBoardId,
      startDate: parameters.startDate,
      state: parameters.state,
    },
    schema: SprintSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog. */
export async function deleteSprint(client: Client, parameters: DeleteSprint): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns all issues in a sprint, for a given sprint ID. This only includes issues that the user has permission to
 * view. By default, the returned issues are ordered by rank.
 */
export async function getIssuesForSprint(client: Client, parameters: GetIssuesForSprint): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/issue`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      jql: parameters.jql,
      validateQuery: parameters.validateQuery,
      fields: parameters.fields,
      expand: parameters.expand,
    },
    schema: SearchResultsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Moves issues to a sprint, for a given sprint ID. Issues can only be moved to open or active sprints. The maximum
 * number of issues that can be moved in one operation is 50.
 */
export async function moveIssuesToSprintAndRank(client: Client, parameters: MoveIssuesToSprintAndRank): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/issue`,
    method: 'POST',
    body: {
      issues: parameters.issues,
      rankAfterIssue: parameters.rankAfterIssue,
      rankBeforeIssue: parameters.rankBeforeIssue,
      rankCustomFieldId: parameters.rankCustomFieldId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns the keys of all properties for the sprint identified by the id. The user who retrieves the property keys is
 * required to have permissions to view the sprint.
 */
export async function getPropertiesKeys(client: Client, parameters: GetPropertiesKeys): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of the property with a given key from the sprint identified by the provided id. The user who
 * retrieves the property is required to have permissions to view the sprint.
 */
export async function getProperty(client: Client, parameters: GetProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the specified sprint's property.
 *
 * You can use this resource to store a custom data against the sprint identified by the id. The user who stores the
 * data is required to have permissions to modify the sprint.
 */
export async function setProperty(client: Client, parameters: SetProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.propertyValue,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the property from the sprint identified by the id. Ths user removing the property is required to have
 * permissions to modify the sprint.
 */
export async function deleteProperty(client: Client, parameters: DeleteProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Swap the position of the sprint with the second sprint. */
export async function swapSprint(client: Client, parameters: SwapSprint): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/sprint/${parameters.sprintId}/swap`,
    method: 'POST',
    body: {
      sprintToSwapWith: parameters.sprintToSwapWith,
    },
  };

  return await client.sendRequest(config);
}
