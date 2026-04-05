import { GetAllBoardsSchema, type GetAllBoards } from '#/models/getAllBoards';
import { CreateBoardSchema, type CreateBoard } from '#/models/createBoard';
import { GetBoardByFilterIdSchema, type GetBoardByFilterId } from '#/models/getBoardByFilterId';
import { GetBoardSchema, type GetBoard } from '#/models/getBoard';
import { SearchResultsSchema, type SearchResults } from '#/models/searchResults';
import { GetConfigurationSchema, type GetConfiguration } from '#/models/getConfiguration';
import { GetEpicsSchema, type GetEpics } from '#/models/getEpics';
import { GetFeaturesForBoardSchema, type GetFeaturesForBoard } from '#/models/getFeaturesForBoard';
import { ToggleFeaturesSchema, type ToggleFeatures } from '#/models/toggleFeatures';
import { GetProjectsSchema, type GetProjects } from '#/models/getProjects';
import { GetProjectsFullSchema, type GetProjectsFull } from '#/models/getProjectsFull';
import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { GetAllQuickFiltersSchema, type GetAllQuickFilters } from '#/models/getAllQuickFilters';
import { GetQuickFilterSchema, type GetQuickFilter } from '#/models/getQuickFilter';
import { GetReportsForBoardSchema, type GetReportsForBoard } from '#/models/getReportsForBoard';
import { GetAllSprintsSchema, type GetAllSprints } from '#/models/getAllSprints';
import { GetAllVersionsSchema, type GetAllVersions } from '#/models/getAllVersions';
import { type GetAllBoards as GetAllBoardsParameters } from '#/parameters/getAllBoards';
import { type CreateBoard as CreateBoardParameters } from '#/parameters/createBoard';
import { type GetBoardByFilterId as GetBoardByFilterIdParameters } from '#/parameters/getBoardByFilterId';
import { type GetBoard as GetBoardParameters } from '#/parameters/getBoard';
import { type DeleteBoard } from '#/parameters/deleteBoard';
import { type GetIssuesForBacklog } from '#/parameters/getIssuesForBacklog';
import { type GetConfiguration as GetConfigurationParameters } from '#/parameters/getConfiguration';
import { type GetEpics as GetEpicsParameters } from '#/parameters/getEpics';
import { type GetIssuesWithoutEpicForBoard } from '#/parameters/getIssuesWithoutEpicForBoard';
import { type GetBoardIssuesForEpic } from '#/parameters/getBoardIssuesForEpic';
import { type GetFeaturesForBoard as GetFeaturesForBoardParameters } from '#/parameters/getFeaturesForBoard';
import { type ToggleFeatures as ToggleFeaturesParameters } from '#/parameters/toggleFeatures';
import { type GetIssuesForBoard } from '#/parameters/getIssuesForBoard';
import { type MoveIssuesToBoard } from '#/parameters/moveIssuesToBoard';
import { type GetProjects as GetProjectsParameters } from '#/parameters/getProjects';
import { type GetProjectsFull as GetProjectsFullParameters } from '#/parameters/getProjectsFull';
import { type GetBoardPropertyKeys } from '#/parameters/getBoardPropertyKeys';
import { type GetBoardProperty } from '#/parameters/getBoardProperty';
import { type SetBoardProperty } from '#/parameters/setBoardProperty';
import { type DeleteBoardProperty } from '#/parameters/deleteBoardProperty';
import { type GetAllQuickFilters as GetAllQuickFiltersParameters } from '#/parameters/getAllQuickFilters';
import { type GetQuickFilter as GetQuickFilterParameters } from '#/parameters/getQuickFilter';
import { type GetReportsForBoard as GetReportsForBoardParameters } from '#/parameters/getReportsForBoard';
import { type GetAllSprints as GetAllSprintsParameters } from '#/parameters/getAllSprints';
import { type GetBoardIssuesForSprint } from '#/parameters/getBoardIssuesForSprint';
import { type GetAllVersions as GetAllVersionsParameters } from '#/parameters/getAllVersions';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns all boards. This only includes boards that the user has permission to view.
 *
 * **Deprecation notice:** The required OAuth 2.0 scopes will be updated on February 15, 2024.
 *
 * - `read:board-scope:jira-software`, `read:project:jira`
 */
export async function getAllBoards(client: Client, parameters?: GetAllBoardsParameters): Promise<GetAllBoards> {
  const config: SendRequestOptions<GetAllBoards> = {
    url: '/rest/agile/1.0/board',
    method: 'GET',
    searchParams: {
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      type: parameters?.type,
      name: parameters?.name,
      projectKeyOrId: parameters?.projectKeyOrId,
      accountIdLocation: parameters?.accountIdLocation,
      projectLocation: parameters?.projectLocation,
      includePrivate: parameters?.includePrivate,
      negateLocationFiltering: parameters?.negateLocationFiltering,
      orderBy: parameters?.orderBy,
      expand: parameters?.expand,
      projectTypeLocation: parameters?.projectTypeLocation,
      filterId: parameters?.filterId,
    },
    schema: GetAllBoardsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new board. Board name, type and filter ID is required.
 *
 * - `name` - Must be less than 255 characters.
 * - `type` - Valid values: scrum, kanban
 * - `filterId` - ID of a filter that the user has permissions to view. Note, if the user does not have the 'Create shared
 *   objects' permission and tries to create a shared board, a private board will be created instead (remember that
 *   board sharing depends on the filter sharing).
 * - `location` - The container that the board will be located in. `location` must include the `type` property (Valid
 *   values: project, user). If choosing 'project', then a project must be specified by a `projectKeyOrId` property in
 *   `location`. If choosing 'user', the current user is chosen by default. The `projectKeyOrId` property should not be
 *   provided.
 *
 * Note:
 *
 * - If you want to create a new project with an associated board, use the [Jira platform REST
 *   API](https://docs.atlassian.com/jira/REST/latest). For more information, see the [Create
 *   project](https://developer.atlassian.com/cloud/jira/software/rest/intro#api-rest-api-3-project-post) method. The
 *   `projectTypeKey` for software boards must be 'software' and the `projectTemplateKey` must be either
 *   `com.pyxis.greenhopper.jira:gh-kanban-template` or `com.pyxis.greenhopper.jira:gh-scrum-template`.
 * - You can create a filter using the [Jira REST API](https://docs.atlassian.com/jira/REST/latest). For more information,
 *   see the [Create filter](https://developer.atlassian.com/cloud/jira/software/rest/intro#api-rest-api-3-filter-post)
 *   method.
 * - If you do not ORDER BY the Rank field for the filter of your board, you will not be able to reorder issues on the
 *   board.
 */
export async function createBoard(client: Client, parameters: CreateBoardParameters): Promise<CreateBoard> {
  const config: SendRequestOptions<CreateBoard> = {
    url: '/rest/agile/1.0/board',
    method: 'POST',
    body: {
      filterId: parameters.filterId,
      location: parameters.location,
      name: parameters.name,
      type: parameters.type,
    },
    schema: CreateBoardSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns any boards which use the provided filter id. This method can be executed by users without a valid software
 * license in order to find which boards are using a particular filter.
 */
export async function getBoardByFilterId(
  client: Client,
  parameters: GetBoardByFilterIdParameters,
): Promise<GetBoardByFilterId> {
  const config: SendRequestOptions<GetBoardByFilterId> = {
    url: `/rest/agile/1.0/board/filter/${parameters.filterId}`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: GetBoardByFilterIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the board for the given board ID. This board will only be returned if the user has permission to view it.
 * Admins without the view permission will see the board as a private one, so will see only a subset of the board's data
 * (board location for instance).
 */
export async function getBoard(client: Client, parameters: GetBoardParameters): Promise<GetBoard> {
  const config: SendRequestOptions<GetBoard> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}`,
    method: 'GET',
    schema: GetBoardSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes the board. Admin without the view permission can still remove the board. */
export async function deleteBoard(client: Client, parameters: DeleteBoard): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns all issues from the board's backlog, for the given board ID. This only includes issues that the user has
 * permission to view. The backlog contains incomplete issues that are not assigned to any future or active sprint.
 * Note, if the user does not have permission to view the board, no issues will be returned at all. Issues returned from
 * this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues
 * are ordered by rank.
 */
export async function getIssuesForBacklog(client: Client, parameters: GetIssuesForBacklog): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/backlog`,
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
 * Get the board configuration. The response contains the following fields:
 *
 * - `id` - ID of the board.
 * - `name` - Name of the board.
 * - `filter` - Reference to the filter used by the given board.
 * - `location` - Reference to the container that the board is located in. Includes the container type (Valid values:
 *   project, user).
 * - `subQuery` (Kanban only) - JQL subquery used by the given board.
 * - `columnConfig` - The column configuration lists the columns for the board, in the order defined in the column
 *   configuration. For each column, it shows the issue status mapping as well as the constraint type (Valid values:
 *   none, issueCount, issueCountExclSubs) for the min/max number of issues. Note, the last column with statuses mapped
 *   to it is treated as the "Done" column, which means that issues in that column will be marked as already completed.
 * - `estimation` (Scrum only) - Contains information about type of estimation used for the board. Valid values: none,
 *   issueCount, field. If the estimation type is "field", the ID and display name of the field used for estimation is
 *   also returned. Note, estimates for an issue can be updated by a PUT /rest/api/3/issue/{issueIdOrKey} request,
 *   however the fields must be on the screen. "timeoriginalestimate" field will never be on the screen, so in order to
 *   update it "originalEstimate" in "timetracking" field should be updated.
 * - `ranking` - Contains information about custom field used for ranking in the given board.
 */
export async function getConfiguration(
  client: Client,
  parameters: GetConfigurationParameters,
): Promise<GetConfiguration> {
  const config: SendRequestOptions<GetConfiguration> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/configuration`,
    method: 'GET',
    schema: GetConfigurationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all epics from the board, for the given board ID. This only includes epics that the user has permission to
 * view. Note, if the user does not have permission to view the board, no epics will be returned at all.
 */
export async function getEpics(client: Client, parameters: GetEpicsParameters): Promise<GetEpics> {
  const config: SendRequestOptions<GetEpics> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/epic`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      done: parameters.done,
    },
    schema: GetEpicsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all issues that do not belong to any epic on a board, for a given board ID. This only includes issues that
 * the user has permission to view. Issues returned from this resource include Agile fields, like sprint, closedSprints,
 * flagged, and epic. By default, the returned issues are ordered by rank.
 */
export async function getIssuesWithoutEpicForBoard(
  client: Client,
  parameters: GetIssuesWithoutEpicForBoard,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
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
 * Returns all issues that belong to an epic on the board, for the given epic ID and the board ID. This only includes
 * issues that the user has permission to view. Issues returned from this resource include Agile fields, like sprint,
 * closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.
 */

export async function getBoardIssuesForEpic(client: Client, parameters: GetBoardIssuesForEpic): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
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

export async function getFeaturesForBoard(
  client: Client,
  parameters: GetFeaturesForBoardParameters,
): Promise<GetFeaturesForBoard> {
  const config: SendRequestOptions<GetFeaturesForBoard> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/features`,
    method: 'GET',
    schema: GetFeaturesForBoardSchema,
  };

  return await client.sendRequest(config);
}

export async function toggleFeatures(client: Client, parameters: ToggleFeaturesParameters): Promise<ToggleFeatures> {
  const config: SendRequestOptions<ToggleFeatures> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/features`,
    method: 'PUT',
    body: parameters.body,
    schema: ToggleFeaturesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all issues from a board, for a given board ID. This only includes issues that the user has permission to
 * view. An issue belongs to the board if its status is mapped to the board's column. Epic issues do not belongs to the
 * scrum boards. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues
 * returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic. By default, the
 * returned issues are ordered by rank.
 */
export async function getIssuesForBoard(client: Client, parameters: GetIssuesForBoard): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/issue`,
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
 * Move issues from the backog to the board (if they are already in the backlog of that board).\
 * This operation either moves an issue(s) onto a board from the backlog (by adding it to the issueList for the board)
 * Or transitions the issue(s) to the first column for a kanban board with backlog. At most 50 issues may be moved at
 * once.
 */
export async function moveIssuesToBoard(client: Client, parameters: MoveIssuesToBoard): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/issue`,
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
 * Returns all projects that are associated with the board, for the given board ID. If the user does not have permission
 * to view the board, no projects will be returned at all. Returned projects are ordered by the name.
 *
 * A project is associated with a board if the board filter contains reference the project or there is an issue from the
 * project that belongs to the board.
 *
 * The board filter contains reference the project only if JQL query guarantees that returned issues will be returned
 * from the project set defined in JQL. For instance the query `project in (ABC, BCD) AND reporter = admin` have
 * reference to ABC and BCD projects but query `project in (ABC, BCD) OR reporter = admin` doesn't have reference to any
 * project.
 *
 * An issue belongs to the board if its status is mapped to the board's column. Epic issues do not belongs to the scrum
 * boards.
 */
export async function getProjects(client: Client, parameters: GetProjectsParameters): Promise<GetProjects> {
  const config: SendRequestOptions<GetProjects> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/project`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: GetProjectsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all projects that are statically associated with the board, for the given board ID. Returned projects are
 * ordered by the name.
 *
 * A project is associated with a board if the board filter contains reference the project.
 *
 * The board filter contains reference the project only if JQL query guarantees that returned issues will be returned
 * from the project set defined in JQL. For instance the query `project in (ABC, BCD) AND reporter = admin` have
 * reference to ABC and BCD projects but query `project in (ABC, BCD) OR reporter = admin` doesn't have reference to any
 * project.
 */
export async function getProjectsFull(client: Client, parameters: GetProjectsFullParameters): Promise<GetProjectsFull> {
  const config: SendRequestOptions<GetProjectsFull> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/project/full`,
    method: 'GET',
    schema: GetProjectsFullSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the keys of all properties for the board identified by the id. The user who retrieves the property keys is
 * required to have permissions to view the board.
 */
export async function getBoardPropertyKeys(client: Client, parameters: GetBoardPropertyKeys): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of the property with a given key from the board identified by the provided id. The user who
 * retrieves the property is required to have permissions to view the board.
 */
export async function getBoardProperty(client: Client, parameters: GetBoardProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the specified board's property.
 *
 * You can use this resource to store a custom data against the board identified by the id. The user who stores the data
 * is required to have permissions to modify the board.
 */
export async function setBoardProperty(client: Client, parameters: SetBoardProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.propertyValue,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the property from the board identified by the id. Ths user removing the property is required to have
 * permissions to modify the board.
 */
export async function deleteBoardProperty(client: Client, parameters: DeleteBoardProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Returns all quick filters from a board, for a given board ID. */
export async function getAllQuickFilters(
  client: Client,
  parameters: GetAllQuickFiltersParameters,
): Promise<GetAllQuickFilters> {
  const config: SendRequestOptions<GetAllQuickFilters> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/quickfilter`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
    },
    schema: GetAllQuickFiltersSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the quick filter for a given quick filter ID. The quick filter will only be returned if the user can view the
 * board that the quick filter belongs to.
 */

export async function getQuickFilter(client: Client, parameters: GetQuickFilterParameters): Promise<GetQuickFilter> {
  const config: SendRequestOptions<GetQuickFilter> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/quickfilter/${parameters.quickFilterId}`,
    method: 'GET',
    schema: GetQuickFilterSchema,
  };

  return await client.sendRequest(config);
}

export async function getReportsForBoard(
  client: Client,
  parameters: GetReportsForBoardParameters,
): Promise<GetReportsForBoard> {
  const config: SendRequestOptions<GetReportsForBoard> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/reports`,
    method: 'GET',
    schema: GetReportsForBoardSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all sprints from a board, for a given board ID. This only includes sprints that the user has permission to
 * view.
 */
export async function getAllSprints(client: Client, parameters: GetAllSprintsParameters): Promise<GetAllSprints> {
  const config: SendRequestOptions<GetAllSprints> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/sprint`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      state: parameters.state,
    },
    schema: GetAllSprintsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Get all issues you have access to that belong to the sprint from the board. Issue returned from this resource
 * contains additional fields like: sprint, closedSprints, flagged and epic. Issues are returned ordered by rank. JQL
 * order has higher priority than default rank.
 */
export async function getBoardIssuesForSprint(
  client: Client,
  parameters: GetBoardIssuesForSprint,
): Promise<SearchResults> {
  const config: SendRequestOptions<SearchResults> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
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
 * Returns all versions from a board, for a given board ID. This only includes versions that the user has permission to
 * view. Note, if the user does not have permission to view the board, no versions will be returned at all. Returned
 * versions are ordered by the name of the project from which they belong and then by sequence defined by user.
 */
export async function getAllVersions(client: Client, parameters: GetAllVersionsParameters): Promise<GetAllVersions> {
  const config: SendRequestOptions<GetAllVersions> = {
    url: `/rest/agile/1.0/board/${parameters.boardId}/version`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      released: parameters.released,
    },
    schema: GetAllVersionsSchema,
  };

  return await client.sendRequest(config);
}
