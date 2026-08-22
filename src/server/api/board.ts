import { PageBoardSchema } from '../models/pageBoard';
import type { Page } from '../models/page';
import { BoardSchema, type Board } from '../models/board';
import { SearchResultsSchema, type SearchResults } from '../models/searchResults';
import { BoardConfigSchema, type BoardConfig } from '../models/boardConfig';
import { PageEpicSchema } from '../models/pageEpic';
import type { Epic } from '../models/epic';
import { PageProjectJsonSchema } from '../models/pageProjectJson';
import type { ProjectJson } from '../models/projectJson';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import { BooleanSettingSchema, type BooleanSetting } from '../models/booleanSetting';
import { PageSprintSchema } from '../models/pageSprint';
import type { Sprint } from '../models/sprint';
import { PageAgileVersionSchema } from '../models/pageAgileVersion';
import type { AgileVersion } from '../models/agileVersion';
import type { GetAllBoards } from '../parameters/getAllBoards';
import type { CreateBoard } from '../parameters/createBoard';
import type { GetBoard } from '../parameters/getBoard';
import type { DeleteBoard } from '../parameters/deleteBoard';
import type { GetIssuesForBacklog } from '../parameters/getIssuesForBacklog';
import type { GetBoardConfiguration } from '../parameters/getBoardConfiguration';
import type { GetEpics } from '../parameters/getEpics';
import type { GetIssuesWithoutEpicForBoard } from '../parameters/getIssuesWithoutEpicForBoard';
import type { GetIssuesForBoardEpic } from '../parameters/getIssuesForBoardEpic';
import type { GetIssuesForBoard } from '../parameters/getIssuesForBoard';
import type { GetProjects } from '../parameters/getProjects';
import type { GetBoardPropertyKeys } from '../parameters/getBoardPropertyKeys';
import type { GetBoardProperty } from '../parameters/getBoardProperty';
import type { SetBoardProperty } from '../parameters/setBoardProperty';
import type { DeleteBoardProperty } from '../parameters/deleteBoardProperty';
import type { GetRefinedVelocity } from '../parameters/getRefinedVelocity';
import type { SetRefinedVelocity } from '../parameters/setRefinedVelocity';
import type { GetAllSprints } from '../parameters/getAllSprints';
import type { GetIssuesForBoardSprint } from '../parameters/getIssuesForBoardSprint';
import type { GetAllVersions } from '../parameters/getAllVersions';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns all boards. This only includes boards that the user has permission to view. */
export async function getAllBoards(
  client: Client,
  parameters?: GetAllBoards,
  options?: RequestOptions,
): Promise<Page<Board>> {
  const config: SendRequestOptions<Page<Board>> = {
    url: '/rest/agile/1.0/board',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      name: parameters?.name,
      projectKeyOrId: parameters?.projectKeyOrId,
      type: parameters?.type,
      startAt: parameters?.startAt,
    },
    schema: PageBoardSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new board. Board name, type and filter Id is required.
 *
 * - Name - Must be less than 255 characters.
 * - Type - Valid values: scrum, kanban
 * - FilterId - Id of a filter that the user has permissions to view. Note, if the user does not have the 'Create shared
 *   objects' permission and tries to create a shared board, a private board will be created instead (remember that
 *   board sharing depends on the filter sharing). Note:
 * - If you want to create a new project with an associated board, use the JIRA platform REST API. For more information,
 *   see the Create project method. The projectTypeKey for software boards must be 'software' and the projectTemplateKey
 *   must be either com.pyxis.greenhopper.jira:gh-kanban-template or com.pyxis.greenhopper.jira:gh-scrum-template.
 * - You can create a filter using the JIRA REST API. For more information, see the Create filter method.
 * - If you do not ORDER BY the Rank field for the filter of your board, you will not be able to reorder issues on the
 *   board.
 */
export async function createBoard(client: Client, parameters: CreateBoard, options?: RequestOptions): Promise<Board> {
  const config: SendRequestOptions<Board> = {
    url: '/rest/agile/1.0/board',
    method: 'POST',
    body: {
      filterId: parameters.filterId,
      name: parameters.name,
      type: parameters.type,
    },
    schema: BoardSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a single board, for a given board Id. */
export async function getBoard(client: Client, parameters: GetBoard, options?: RequestOptions): Promise<Board> {
  const config: SendRequestOptions<Board> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}`,
    method: 'GET',
    schema: BoardSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes the board. */
export async function deleteBoard(client: Client, parameters: DeleteBoard, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all issues from a board's backlog, for a given board Id. */
export async function getIssuesForBacklog(
  client: Client,
  parameters: GetIssuesForBacklog,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/backlog`,
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
 * Get the board configuration. The response contains the following fields:
 *
 * - Id - Id of the board.
 * - Name - Name of the board.
 * - Filter - Reference to the filter used by the given board.
 * - SubQuery (Kanban only) - JQL subquery used by the given board.
 * - ColumnConfig - The column configuration lists the columns for the board, in the order defined in the column
 *   configuration. For each column, it shows the issue status mapping as well as the constraint type (Valid values:
 *   none, issueCount, issueCountExclSubs) for the min/max number of issues. Note, the last column with statuses mapped
 *   to it is treated as the "Done" column, which means that issues in that column will be marked as already completed.
 * - Estimation (Scrum only) - Contains information about type of estimation used for the board. Valid values: none,
 *   issueCount, field. If the estimation type is "field", the Id and display name of the field used for estimation is
 *   also returned. Note, estimates for an issue can be updated by a PUT /rest/api/2/issue/{issueIdOrKey} request,
 *   however the fields must be on the screen. "timeoriginalestimate" field will never be on the screen, so in order to
 *   update it "originalEstimate" in "timetracking" field should be updated.
 * - Ranking - Contains information about custom field used for ranking in the given board.
 */
export async function getBoardConfiguration(
  client: Client,
  parameters: GetBoardConfiguration,
  options?: RequestOptions,
): Promise<BoardConfig> {
  const config: SendRequestOptions<BoardConfig> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/configuration`,
    method: 'GET',
    schema: BoardConfigSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all epics from the board, for the given board Id. This only includes epics that the user has permission to
 * view. Note, if the user does not have permission to view the board, no epics will be returned at all.
 */
export async function getEpics(client: Client, parameters: GetEpics, options?: RequestOptions): Promise<Page<Epic>> {
  const config: SendRequestOptions<Page<Epic>> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/epic`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      done: parameters.done,
      startAt: parameters.startAt,
    },
    schema: PageEpicSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all issues that do not belong to any epic on a board, for a given board Id. */
export async function getIssuesWithoutEpicForBoard(
  client: Client,
  parameters: GetIssuesWithoutEpicForBoard,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
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

/** Returns all issues that belong to an epic on the board, for the given epic Id and the board Id. */
export async function getIssuesForBoardEpic(
  client: Client,
  parameters: GetIssuesForBoardEpic,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
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
 * Returns all issues from a board, for a given board Id. This only includes issues that the user has permission to
 * view. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues
 * returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default, the
 * returned issues are ordered by rank.
 */
export async function getIssuesForBoard(
  client: Client,
  parameters: GetIssuesForBoard,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/issue`,
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
 * Returns all projects that are associated with the board, for the given board Id. A project is associated with a board
 * only if the board filter explicitly filters issues by the project and guaranties that all issues will come for one of
 * those projects e.g. board's filter with "project in (PR-1, PR-1) OR reporter = admin" jql Projects are returned only
 * if user can browse all projects that are associated with the board. Note, if the user does not have permission to
 * view the board, no projects will be returned at all. Returned projects are ordered by the name.
 */
export async function getProjects(
  client: Client,
  parameters: GetProjects,
  options?: RequestOptions,
): Promise<Page<ProjectJson>> {
  const config: SendRequestOptions<Page<ProjectJson>> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/project`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      startAt: parameters.startAt,
    },
    schema: PageProjectJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the keys of all properties for the board identified by the id. The user who retrieves the property keys is
 * required to have permissions to view the board.
 */
export async function getBoardPropertyKeys(
  client: Client,
  parameters: GetBoardPropertyKeys,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of the property with a given key from the board identified by the provided id. The user who
 * retrieves the property is required to have permissions to view the board.
 */
export async function getBoardProperty(
  client: Client,
  parameters: GetBoardProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the specified board's property. You can use this resource to store a custom data against the board
 * identified by the id. The user who stores the data is required to have permissions to modify the board.
 */
export async function setBoardProperty(
  client: Client,
  parameters: SetBoardProperty,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the property from the board identified by the id. Ths user removing the property is required to have
 * permissions to modify the board.
 */
export async function deleteBoardProperty(
  client: Client,
  parameters: DeleteBoardProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the value of the setting for refined velocity chart */
export async function getRefinedVelocity(
  client: Client,
  parameters: GetRefinedVelocity,
  options?: RequestOptions,
): Promise<BooleanSetting> {
  const config: SendRequestOptions<BooleanSetting> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/settings/refined-velocity`,
    method: 'GET',
    schema: BooleanSettingSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Sets the value of the specified board's refined velocity setting. */
export async function setRefinedVelocity(
  client: Client,
  parameters: SetRefinedVelocity,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/settings/refined-velocity`,
    method: 'PUT',
    body: {
      value: parameters.value,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all sprints from a board, for a given board Id. This only includes sprints that the user has permission to
 * view.
 */
export async function getAllSprints(
  client: Client,
  parameters: GetAllSprints,
  options?: RequestOptions,
): Promise<Page<Sprint>> {
  const config: SendRequestOptions<Page<Sprint>> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/sprint`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      state: parameters.state,
      startAt: parameters.startAt,
    },
    schema: PageSprintSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get all issues you have access to that belong to the sprint from the board. Issue returned from this resource
 * contains additional fields like: sprint, closedSprints, flagged and epic. Issues are returned ordered by rank. JQL
 * order has higher priority than default rank.
 */
export async function getIssuesForBoardSprint(
  client: Client,
  parameters: GetIssuesForBoardSprint,
  options?: RequestOptions,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
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
 * Returns all versions from a board, for a given board Id. This only includes versions that the user has permission to
 * view. Note, if the user does not have permission to view the board, no versions will be returned at all. Returned
 * versions are ordered by the name of the project from which they belong and then by sequence defined by user.
 */
export async function getAllVersions(
  client: Client,
  parameters: GetAllVersions,
  options?: RequestOptions,
): Promise<Page<AgileVersion>> {
  const config: SendRequestOptions<Page<AgileVersion>> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/version`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      released: parameters.released,
      startAt: parameters.startAt,
    },
    schema: PageAgileVersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
