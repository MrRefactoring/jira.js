import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';
import { Paginated } from '../paginated';

export class Board {
  constructor(private client: Client) {
  }

  /**
   * Returns all boards. This only includes boards that the user has permission to view.
   */
  async getAllBoards<T = Models.GetAllBoards>(parameters: Parameters.GetAllBoards | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns all boards. This only includes boards that the user has permission to view.
   */
  async getAllBoards<T = Models.GetAllBoards>(parameters?: Parameters.GetAllBoards, callback?: never): Promise<T>;
  async getAllBoards<T = Models.GetAllBoards>(parameters?: Parameters.GetAllBoards, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/agile/1.0/board',
      method: 'GET',
      params: {
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
        filterId: parameters?.filterId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllBoards' });
  }

  /**
   * Creates a new board. Board name, type and filter ID is required.
   * <ul>
   * <li><code>name</code> - Must be less than 255 characters.</li>
   * <li><code>type</code> - Valid values: scrum, kanban</li>
   * <li><code>filterId</code> - ID of a filter that the user has permissions to view. Note, if the user does not have the 'Create shared objects'
   * permission and tries to create a shared board, a private board will be created instead (remember that board sharing depends on the filter sharing).</li>
   * <li><code>location</code> - The container that the board will be located in. <code>location</code> must include the <code>type</code> property (Valid values: project, user).
   * If choosing 'project', then a project must be specified by a <code>projectKeyOrId</code> property in <code>location</code>.
   * If choosing 'user', the current user is chosen by default. The <code>projectKeyOrId</code> property should not be provided.
   * </li>
   * </ul>
   * <p>
   * Note:
   * <ul>
   * <li>
   * If you want to create a new project with an associated board, use the <a href="https://docs.atlassian.com/jira/REST/latest">Jira platform REST API</a>.
   * For more information, see the <a href="#api-rest-api-<ver>-project-post">Create project</a> method.
   * The <code>projectTypeKey</code> for software boards must be 'software' and the <code>projectTemplateKey</code> must be either
   * <code>com.pyxis.greenhopper.jira:gh-kanban-template</code> or <code>com.pyxis.greenhopper.jira:gh-scrum-template</code>.
   * </li>
   * <li>
   * You can create a filter using the <a href="https://docs.atlassian.com/jira/REST/latest">Jira REST API</a>.
   * For more information, see the <a href="#api-rest-api-<ver>-filter-post">Create filter</a> method.
   * </li>
   * <li>
   * If you do not ORDER BY the Rank field for the filter of your board, you will not be able to reorder issues on the board.
   * </li>
   * </ul>
   */
  async createBoard<T = Models.CreateBoard>(parameters: Parameters.CreateBoard | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a new board. Board name, type and filter ID is required.
   * <ul>
   * <li><code>name</code> - Must be less than 255 characters.</li>
   * <li><code>type</code> - Valid values: scrum, kanban</li>
   * <li><code>filterId</code> - ID of a filter that the user has permissions to view. Note, if the user does not have the 'Create shared objects'
   * permission and tries to create a shared board, a private board will be created instead (remember that board sharing depends on the filter sharing).</li>
   * <li><code>location</code> - The container that the board will be located in. <code>location</code> must include the <code>type</code> property (Valid values: project, user).
   * If choosing 'project', then a project must be specified by a <code>projectKeyOrId</code> property in <code>location</code>.
   * If choosing 'user', the current user is chosen by default. The <code>projectKeyOrId</code> property should not be provided.
   * </li>
   * </ul>
   * <p>
   * Note:
   * <ul>
   * <li>
   * If you want to create a new project with an associated board, use the <a href="https://docs.atlassian.com/jira/REST/latest">Jira platform REST API</a>.
   * For more information, see the <a href="#api-rest-api-<ver>-project-post">Create project</a> method.
   * The <code>projectTypeKey</code> for software boards must be 'software' and the <code>projectTemplateKey</code> must be either
   * <code>com.pyxis.greenhopper.jira:gh-kanban-template</code> or <code>com.pyxis.greenhopper.jira:gh-scrum-template</code>.
   * </li>
   * <li>
   * You can create a filter using the <a href="https://docs.atlassian.com/jira/REST/latest">Jira REST API</a>.
   * For more information, see the <a href="#api-rest-api-<ver>-filter-post">Create filter</a> method.
   * </li>
   * <li>
   * If you do not ORDER BY the Rank field for the filter of your board, you will not be able to reorder issues on the board.
   * </li>
   * </ul>
   */
  async createBoard<T = Models.CreateBoard>(parameters?: Parameters.CreateBoard, callback?: never): Promise<T>;
  async createBoard<T = Models.CreateBoard>(parameters?: Parameters.CreateBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/agile/1.0/board',
      method: 'POST',
      data: {
        name: parameters?.name,
        type: parameters?.type,
        filterId: parameters?.filterId,
        location: parameters?.location,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.createBoard' });
  }

  /**
   * Returns any boards which use the provided filter id.  This method can be executed by users without a valid
   * software license in order to find which boards are using a particular filter.
   */
  async getBoardByFilterId<T = Models.GetBoardByFilterId>(parameters: Parameters.GetBoardByFilterId, callback: Callback<T>): Promise<void>;
  /**
   * Returns any boards which use the provided filter id.  This method can be executed by users without a valid
   * software license in order to find which boards are using a particular filter.
   */
  async getBoardByFilterId<T = Models.GetBoardByFilterId>(parameters: Parameters.GetBoardByFilterId, callback?: never): Promise<T>;
  async getBoardByFilterId<T = Models.GetBoardByFilterId>(parameters: Parameters.GetBoardByFilterId, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/filter/${parameters.filterId}`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardByFilterId' });
  }

  /**
   * Returns the board for the given board ID. This board will only be returned if the user has permission to view it.
   *  Admins without the view permission will see the board as a private one, so will see only a subset of the board's
   *  data (board location for instance).
   */
  async getBoard<T = Models.GetBoard>(parameters: Parameters.GetBoard, callback: Callback<T>): Promise<void>;
  /**
   * Returns the board for the given board ID. This board will only be returned if the user has permission to view it.
   *  Admins without the view permission will see the board as a private one, so will see only a subset of the board's
   *  data (board location for instance).
   */
  async getBoard<T = Models.GetBoard>(parameters: Parameters.GetBoard, callback?: never): Promise<T>;
  async getBoard<T = Models.GetBoard>(parameters: Parameters.GetBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoard' });
  }

  /**
   * Deletes the board. Admin without the view permission can still remove the board.
   */
  async deleteBoard<T = void>(parameters: Parameters.DeleteBoard, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the board. Admin without the view permission can still remove the board.
   */
  async deleteBoard<T = void>(parameters: Parameters.DeleteBoard, callback?: never): Promise<T>;
  async deleteBoard<T = void>(parameters: Parameters.DeleteBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.deleteBoard' });
  }

  /**
   * Returns all issues from the board's backlog, for the given board ID. This only includes issues that the user has permission to view.
   *  The backlog contains incomplete issues that are not assigned to any future or active sprint.
   *  Note, if the user does not have permission to view the board, no issues will be returned at all.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBacklog, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues from the board's backlog, for the given board ID. This only includes issues that the user has permission to view.
   *  The backlog contains incomplete issues that are not assigned to any future or active sprint.
   *  Note, if the user does not have permission to view the board, no issues will be returned at all.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBacklog, callback?: never): Promise<T>;
  async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBacklog, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/backlog`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getIssuesForBacklog' });
  }

  /**
   * Get the board configuration.
   *  The response contains the following fields:
   *  <ul>
   *  <li><code>id</code> - ID of the board.</li>
   *  <li><code>name</code> - Name of the board.</li>
   *  <li><code>filter</code> - Reference to the filter used by the given board.</li>
   *  <li><code>location</code> - Reference to the container that the board is located in.
   *  Includes the container type (Valid values: project, user).
   *  </li>
   *  <li><code>subQuery</code> (Kanban only) - JQL subquery used by the given board.</li>
   *  <li><code>columnConfig</code> - The column configuration lists the columns for the board, in the order defined in the column configuration.
   *  For each column, it shows the issue status mapping
   *  as well as the constraint type (Valid values: none, issueCount, issueCountExclSubs) for the min/max number of issues.
   *  Note, the last column with statuses mapped to it is treated as the "Done" column,
   *  which means that issues in that column will be marked as already completed.</li>
   *  <li><code>estimation</code> (Scrum only) - Contains information about type of estimation used for the board. Valid values: none, issueCount, field.
   *  If the estimation type is "field", the ID and display name of the field used for estimation is also returned.
   *  Note, estimates for an issue can be updated by a PUT /rest/api/~ver~/issue/{issueIdOrKey} request, however the fields must be on the screen.
   *  "timeoriginalestimate" field will never be on the screen, so in order to update it "originalEstimate" in "timetracking" field should be updated.
   *  </li>
   *  <li><code>ranking</code> - Contains information about custom field used for ranking in the given board.</li>
   *  </ul>
   */
  async getConfiguration<T = Models.GetConfiguration>(parameters: Parameters.GetConfiguration, callback: Callback<T>): Promise<void>;
  /**
   * Get the board configuration.
   *  The response contains the following fields:
   *  <ul>
   *  <li><code>id</code> - ID of the board.</li>
   *  <li><code>name</code> - Name of the board.</li>
   *  <li><code>filter</code> - Reference to the filter used by the given board.</li>
   *  <li><code>location</code> - Reference to the container that the board is located in.
   *  Includes the container type (Valid values: project, user).
   *  </li>
   *  <li><code>subQuery</code> (Kanban only) - JQL subquery used by the given board.</li>
   *  <li><code>columnConfig</code> - The column configuration lists the columns for the board, in the order defined in the column configuration.
   *  For each column, it shows the issue status mapping
   *  as well as the constraint type (Valid values: none, issueCount, issueCountExclSubs) for the min/max number of issues.
   *  Note, the last column with statuses mapped to it is treated as the "Done" column,
   *  which means that issues in that column will be marked as already completed.</li>
   *  <li><code>estimation</code> (Scrum only) - Contains information about type of estimation used for the board. Valid values: none, issueCount, field.
   *  If the estimation type is "field", the ID and display name of the field used for estimation is also returned.
   *  Note, estimates for an issue can be updated by a PUT /rest/api/~ver~/issue/{issueIdOrKey} request, however the fields must be on the screen.
   *  "timeoriginalestimate" field will never be on the screen, so in order to update it "originalEstimate" in "timetracking" field should be updated.
   *  </li>
   *  <li><code>ranking</code> - Contains information about custom field used for ranking in the given board.</li>
   *  </ul>
   */
  async getConfiguration<T = Models.GetConfiguration>(parameters: Parameters.GetConfiguration, callback?: never): Promise<T>;
  async getConfiguration<T = Models.GetConfiguration>(parameters: Parameters.GetConfiguration, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/configuration`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getConfiguration' });
  }

  /**
   * Returns all epics from the board, for the given board ID. This only includes epics that the user has permission to view.
   * Note, if the user does not have permission to view the board, no epics will be returned at all.
   */
  async getEpics<T = Paginated<Models.Epic>>(parameters: Parameters.GetEpics, callback: Callback<T>): Promise<void>;
  /**
   * Returns all epics from the board, for the given board ID. This only includes epics that the user has permission to view.
   * Note, if the user does not have permission to view the board, no epics will be returned at all.
   */
  async getEpics<T = Paginated<Models.Epic>>(parameters: Parameters.GetEpics, callback?: never): Promise<T>;
  async getEpics<T = Paginated<Models.Epic>>(parameters: Parameters.GetEpics, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/epic`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        done: parameters.done,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getEpics' });
  }

  /**
   * Returns all issues that do not belong to any epic on a board, for a given board ID.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getIssuesWithoutEpicForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesWithoutEpicForBoard, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues that do not belong to any epic on a board, for a given board ID.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getIssuesWithoutEpicForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesWithoutEpicForBoard, callback?: never): Promise<T>;
  async getIssuesWithoutEpicForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesWithoutEpicForBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getIssuesWithoutEpicForBoard' });
  }

  /**
   * Returns all issues that belong to an epic on the board, for the given epic ID and the board ID.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getBoardIssuesForEpic<T = Models.SearchResultsBean>(parameters: Parameters.GetBoardIssuesForEpic, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues that belong to an epic on the board, for the given epic ID and the board ID.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getBoardIssuesForEpic<T = Models.SearchResultsBean>(parameters: Parameters.GetBoardIssuesForEpic, callback?: never): Promise<T>;
  async getBoardIssuesForEpic<T = Models.SearchResultsBean>(parameters: Parameters.GetBoardIssuesForEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardIssuesForEpic' });
  }

  async getFeaturesForBoard<T = Models.GetFeaturesForBoard>(parameters: Parameters.GetFeaturesForBoard, callback: Callback<T>): Promise<void>;
  async getFeaturesForBoard<T = Models.GetFeaturesForBoard>(parameters: Parameters.GetFeaturesForBoard, callback?: never): Promise<T>;
  async getFeaturesForBoard<T = Models.GetFeaturesForBoard>(parameters: Parameters.GetFeaturesForBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getFeaturesForBoard' });
  }

  async toggleFeatures<T = Models.ToggleFeatures>(parameters: Parameters.ToggleFeatures, callback: Callback<T>): Promise<void>;
  async toggleFeatures<T = Models.ToggleFeatures>(parameters: Parameters.ToggleFeatures, callback?: never): Promise<T>;
  async toggleFeatures<T = Models.ToggleFeatures>(parameters: Parameters.ToggleFeatures, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/features`,
      method: 'PUT',
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.toggleFeatures' });
  }

  /**
   * Returns all issues from a board, for a given board ID. This only includes issues that the user has permission to view.
   *  An issue belongs to the board if its status is mapped to the board's column.
   *  Epic issues do not belongs to the scrum boards.
   *  Note, if the user does not have permission to view the board, no issues will be returned at all.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBoard, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues from a board, for a given board ID. This only includes issues that the user has permission to view.
   *  An issue belongs to the board if its status is mapped to the board's column.
   *  Epic issues do not belongs to the scrum boards.
   *  Note, if the user does not have permission to view the board, no issues will be returned at all.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   */
  async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBoard, callback?: never): Promise<T>;
  async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getIssuesForBoard' });
  }

  /**
   * Move issues from the backog to the board (if they are already in the backlog of that board).
   *
   *  This operation either moves an issue(s) onto a board from the backlog (by adding it to the issueList for the board)
   *  Or transitions the issue(s) to the first column for a kanban board with backlog.
   *  At most 50 issues may be moved at once.
   */
  async moveIssuesToBoard<T = void>(parameters: Parameters.MoveIssuesToBoard, callback: Callback<T>): Promise<void>;
  /**
   * Move issues from the backog to the board (if they are already in the backlog of that board).
   *
   *  This operation either moves an issue(s) onto a board from the backlog (by adding it to the issueList for the board)
   *  Or transitions the issue(s) to the first column for a kanban board with backlog.
   *  At most 50 issues may be moved at once.
   */
  async moveIssuesToBoard<T = void>(parameters: Parameters.MoveIssuesToBoard, callback?: never): Promise<T>;
  async moveIssuesToBoard<T = void>(parameters: Parameters.MoveIssuesToBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
        rankBeforeIssue: parameters.rankBeforeIssue,
        rankAfterIssue: parameters.rankAfterIssue,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.moveIssuesToBoard' });
  }

  /**
   * Returns all projects that are associated with the board, for the given board ID.
   *  If the user does not have permission to view the board, no projects will be returned at all.
   *  Returned projects are ordered by the name.
   *  </p>
   *  A project is associated with a board if the board filter contains reference the project
   *  or there is an issue from the project that belongs to the board.
   *  </p>
   *  The board filter contains reference the project only if JQL query guarantees that returned issues
   *  will be returned from the project set defined in JQL.
   *  For instance the query <code>project in (ABC, BCD) AND reporter = admin</code> have reference to ABC and BCD projects
   *  but query <code>project in (ABC, BCD) OR reporter = admin</code> doesn't have reference to any project.
   *  </p>
   *  An issue belongs to the board if its status is mapped to the board's column.
   *  Epic issues do not belongs to the scrum boards.
   *  </p>
   */
  async getProjects<T = Paginated<Models.Projects>>(parameters: Parameters.GetProjects, callback: Callback<T>): Promise<void>;
  /**
   * Returns all projects that are associated with the board, for the given board ID.
   *  If the user does not have permission to view the board, no projects will be returned at all.
   *  Returned projects are ordered by the name.
   *  </p>
   *  A project is associated with a board if the board filter contains reference the project
   *  or there is an issue from the project that belongs to the board.
   *  </p>
   *  The board filter contains reference the project only if JQL query guarantees that returned issues
   *  will be returned from the project set defined in JQL.
   *  For instance the query <code>project in (ABC, BCD) AND reporter = admin</code> have reference to ABC and BCD projects
   *  but query <code>project in (ABC, BCD) OR reporter = admin</code> doesn't have reference to any project.
   *  </p>
   *  An issue belongs to the board if its status is mapped to the board's column.
   *  Epic issues do not belongs to the scrum boards.
   *  </p>
   */
  async getProjects<T = Paginated<Models.Projects>>(parameters: Parameters.GetProjects, callback?: never): Promise<T>;
  async getProjects<T = Paginated<Models.Projects>>(parameters: Parameters.GetProjects, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/project`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getProjects' });
  }

  /**
   * Returns all projects that are statically associated with the board, for the given board ID.
   *  Returned projects are ordered by the name.
   *  </p>
   *  A project is associated with a board if the board filter contains reference the project.
   *  </p>
   *  The board filter contains reference the project only if JQL query guarantees that returned issues
   *  will be returned from the project set defined in JQL.
   *  For instance the query <code>project in (ABC, BCD) AND reporter = admin</code> have reference to ABC and BCD projects
   *  but query <code>project in (ABC, BCD) OR reporter = admin</code> doesn't have reference to any project.
   *  </p>
   */
  async getProjectsFull<T = Models.Projects[]>(parameters: Parameters.GetProjectsFull, callback: Callback<T>): Promise<void>;
  /**
   * Returns all projects that are statically associated with the board, for the given board ID.
   *  Returned projects are ordered by the name.
   *  </p>
   *  A project is associated with a board if the board filter contains reference the project.
   *  </p>
   *  The board filter contains reference the project only if JQL query guarantees that returned issues
   *  will be returned from the project set defined in JQL.
   *  For instance the query <code>project in (ABC, BCD) AND reporter = admin</code> have reference to ABC and BCD projects
   *  but query <code>project in (ABC, BCD) OR reporter = admin</code> doesn't have reference to any project.
   *  </p>
   */
  async getProjectsFull<T = Models.Projects[]>(parameters: Parameters.GetProjectsFull, callback?: never): Promise<T>;
  async getProjectsFull<T = Models.Projects[]>(parameters: Parameters.GetProjectsFull, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/project/full`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getProjectsFull' });
  }

  /**
   * Returns the keys of all properties for the board identified by the id.
   *  The user who retrieves the property keys is required to have permissions to view the board.
   */
  async getBoardPropertyKeys<T = unknown>(parameters: Parameters.GetBoardPropertyKeys, callback: Callback<T>): Promise<void>;
  /**
   * Returns the keys of all properties for the board identified by the id.
   *  The user who retrieves the property keys is required to have permissions to view the board.
   */
  async getBoardPropertyKeys<T = unknown>(parameters: Parameters.GetBoardPropertyKeys, callback?: never): Promise<T>;
  async getBoardPropertyKeys<T = unknown>(parameters: Parameters.GetBoardPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardPropertyKeys' });
  }

  /**
   * Returns the value of the property with a given key from the board identified by the provided id.
   *  The user who retrieves the property is required to have permissions to view the board.
   */
  async getBoardProperty<T = unknown>(parameters: Parameters.GetBoardProperty, callback: Callback<T>): Promise<void>;
  /**
   * Returns the value of the property with a given key from the board identified by the provided id.
   *  The user who retrieves the property is required to have permissions to view the board.
   */
  async getBoardProperty<T = unknown>(parameters: Parameters.GetBoardProperty, callback?: never): Promise<T>;
  async getBoardProperty<T = unknown>(parameters: Parameters.GetBoardProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardProperty' });
  }

  /**
   * Sets the value of the specified board's property.
   *  <p>
   *      You can use this resource to store a custom data against the board identified by the id. The user
   *      who stores the data is required to have permissions to modify the board.
   *  </p>
   */
  async setBoardProperty<T = unknown>(parameters: Parameters.SetBoardProperty, callback: Callback<T>): Promise<void>;
  /**
   * Sets the value of the specified board's property.
   *  <p>
   *      You can use this resource to store a custom data against the board identified by the id. The user
   *      who stores the data is required to have permissions to modify the board.
   *  </p>
   */
  async setBoardProperty<T = unknown>(parameters: Parameters.SetBoardProperty, callback?: never): Promise<T>;
  async setBoardProperty<T = unknown>(parameters: Parameters.SetBoardProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.setBoardProperty' });
  }

  /**
   * Removes the property from the board identified by the id. Ths user removing the property is required
   *  to have permissions to modify the board.
   */
  async deleteBoardProperty<T = void>(parameters: Parameters.DeleteBoardProperty, callback: Callback<T>): Promise<void>;
  /**
   * Removes the property from the board identified by the id. Ths user removing the property is required
   *  to have permissions to modify the board.
   */
  async deleteBoardProperty<T = void>(parameters: Parameters.DeleteBoardProperty, callback?: never): Promise<T>;
  async deleteBoardProperty<T = void>(parameters: Parameters.DeleteBoardProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.deleteBoardProperty' });
  }

  /**
   * Returns all quick filters from a board, for a given board ID.
   */
  async getAllQuickFilters<T = Models.GetAllQuickFilters>(parameters: Parameters.GetAllQuickFilters, callback: Callback<T>): Promise<void>;
  /**
   * Returns all quick filters from a board, for a given board ID.
   */
  async getAllQuickFilters<T = Models.GetAllQuickFilters>(parameters: Parameters.GetAllQuickFilters, callback?: never): Promise<T>;
  async getAllQuickFilters<T = Models.GetAllQuickFilters>(parameters: Parameters.GetAllQuickFilters, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/quickfilter`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllQuickFilters' });
  }

  /**
   * Returns the quick filter for a given quick filter ID. The quick filter will only be returned if the user can view the board
   *  that the quick filter belongs to.
   */
  async getQuickFilter<T = Models.GetQuickFilter>(parameters: Parameters.GetQuickFilter, callback: Callback<T>): Promise<void>;
  /**
   * Returns the quick filter for a given quick filter ID. The quick filter will only be returned if the user can view the board
   *  that the quick filter belongs to.
   */
  async getQuickFilter<T = Models.GetQuickFilter>(parameters: Parameters.GetQuickFilter, callback?: never): Promise<T>;
  async getQuickFilter<T = Models.GetQuickFilter>(parameters: Parameters.GetQuickFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/quickfilter/${parameters.quickFilterId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getQuickFilter' });
  }

  async getReportsForBoard<T = Models.GetReportsForBoard>(parameters: Parameters.GetReportsForBoard, callback: Callback<T>): Promise<void>;
  async getReportsForBoard<T = Models.GetReportsForBoard>(parameters: Parameters.GetReportsForBoard, callback?: never): Promise<T>;
  async getReportsForBoard<T = Models.GetReportsForBoard>(parameters: Parameters.GetReportsForBoard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/reports`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getReportsForBoard' });
  }

  /**
   * Returns all sprints from a board, for a given board ID. This only includes sprints that the user has permission to view.
   */
  async getAllSprints<T = Paginated<Models.SprintBean[]>>(parameters: Parameters.GetAllSprints, callback: Callback<T>): Promise<void>;
  /**
   * Returns all sprints from a board, for a given board ID. This only includes sprints that the user has permission to view.
   */
  async getAllSprints<T = Paginated<Models.SprintBean[]>>(parameters: Parameters.GetAllSprints, callback?: never): Promise<T>;
  async getAllSprints<T = Paginated<Models.SprintBean[]>>(parameters: Parameters.GetAllSprints, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/sprint`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        state: parameters.state,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllSprints' });
  }

  /**
   * Get all issues you have access to that belong to the sprint from the board.
   *  Issue returned from this resource contains additional fields like: sprint, closedSprints, flagged and epic.
   *  Issues are returned ordered by rank. JQL order has higher priority than default rank.
   */
  async getBoardIssuesForSprint<T = unknown>(parameters: Parameters.GetBoardIssuesForSprint, callback: Callback<T>): Promise<void>;
  /**
   * Get all issues you have access to that belong to the sprint from the board.
   *  Issue returned from this resource contains additional fields like: sprint, closedSprints, flagged and epic.
   *  Issues are returned ordered by rank. JQL order has higher priority than default rank.
   */
  async getBoardIssuesForSprint<T = unknown>(parameters: Parameters.GetBoardIssuesForSprint, callback?: never): Promise<T>;
  async getBoardIssuesForSprint<T = unknown>(parameters: Parameters.GetBoardIssuesForSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getBoardIssuesForSprint' });
  }

  /**
   * Returns all versions from a board, for a given board ID. This only includes versions that the user has permission to view.
   *  Note, if the user does not have permission to view the board, no versions will be returned at all.
   *  Returned versions are ordered by the name of the project from which they belong and then by sequence defined by user.
   */
  async getAllVersions<T = Paginated<Models.Version>>(parameters: Parameters.GetAllVersions, callback: Callback<T>): Promise<void>;
  /**
   * Returns all versions from a board, for a given board ID. This only includes versions that the user has permission to view.
   *  Note, if the user does not have permission to view the board, no versions will be returned at all.
   *  Returned versions are ordered by the name of the project from which they belong and then by sequence defined by user.
   */
  async getAllVersions<T = Paginated<Models.Version>>(parameters: Parameters.GetAllVersions, callback?: never): Promise<T>;
  async getAllVersions<T = Paginated<Models.Version>>(parameters: Parameters.GetAllVersions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/version`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        released: parameters.released,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.board.getAllVersions' });
  }
}
