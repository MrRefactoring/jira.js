import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Epic {
  constructor(private client: Client) {
  }

  /**
   * Returns all issues that do not belong to any epic.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   *
   *  <b>Note:</b> If you are querying a next-gen project, do not use this operation.
   *  Instead, search for issues that don't belong to an epic by using the
   *  <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get">Search for issues using JQL</a>
   *  operation in the Jira platform REST API. Build your JQL query using the <code>parent is empty</code> clause.
   *  For more information on the <code>parent</code> JQL field, see <a href="https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent">Advanced searching</a>.  */
  async getIssuesWithoutEpic<T = unknown>(parameters: Parameters.GetIssuesWithoutEpic | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues that do not belong to any epic.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   *
   *  <b>Note:</b> If you are querying a next-gen project, do not use this operation.
   *  Instead, search for issues that don't belong to an epic by using the
   *  <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get">Search for issues using JQL</a>
   *  operation in the Jira platform REST API. Build your JQL query using the <code>parent is empty</code> clause.
   *  For more information on the <code>parent</code> JQL field, see <a href="https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent">Advanced searching</a>.  */
  async getIssuesWithoutEpic<T = unknown>(parameters?: Parameters.GetIssuesWithoutEpic, callback?: never): Promise<T>;
  async getIssuesWithoutEpic<T = unknown>(parameters?: Parameters.GetIssuesWithoutEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/agile/1.0/epic/none/issue',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        jql: parameters?.jql,
        validateQuery: parameters?.validateQuery,
        fields: parameters?.fields,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.getIssuesWithoutEpic' });
  }

  /**
   * Removes issues from epics.
   *  The user needs to have the edit issue permission for all issue they want to remove from epics.
   *  The maximum number of issues that can be moved in one operation is 50.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.
   *  Instead, update the issue using `{ fields: { parent: {} } }`  */
  async removeIssuesFromEpic<T = void>(parameters: Parameters.RemoveIssuesFromEpic | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Removes issues from epics.
   *  The user needs to have the edit issue permission for all issue they want to remove from epics.
   *  The maximum number of issues that can be moved in one operation is 50.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.
   *  Instead, update the issue using `{ fields: { parent: {} } }`  */
  async removeIssuesFromEpic<T = void>(parameters?: Parameters.RemoveIssuesFromEpic, callback?: never): Promise<T>;
  async removeIssuesFromEpic<T = void>(parameters?: Parameters.RemoveIssuesFromEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/agile/1.0/epic/none/issue',
      method: 'POST',
      data: {
        issues: parameters?.issues,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.removeIssuesFromEpic' });
  }

  /**
   * Returns searched epics according to provided parameters.  */
  async searchEpics<T = unknown>(parameters: Parameters.SearchEpics | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns searched epics according to provided parameters.  */
  async searchEpics<T = unknown>(parameters?: Parameters.SearchEpics, callback?: never): Promise<T>;
  async searchEpics<T = unknown>(parameters?: Parameters.SearchEpics, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/agile/1.0/epic/search',
      method: 'GET',
      params: {
        maxResults: parameters?.maxResults,
        excludeDone: parameters?.excludeDone,
        query: parameters?.query,
        projectKey: parameters?.projectKey,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.searchEpics' });
  }

  /**
   * Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async getEpic<T = Models.Epic>(parameters: Parameters.GetEpic, callback: Callback<T>): Promise<void>;
  /**
   * Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async getEpic<T = Models.Epic>(parameters: Parameters.GetEpic, callback?: never): Promise<T>;
  async getEpic<T = Models.Epic>(parameters: Parameters.GetEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.getEpic' });
  }

  /**
   * Performs a partial update of the epic.
   *  A partial update means that fields not present in the request JSON will not be updated.
   *  Valid values for color are <code>color_1</code> to <code>color_9</code>.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async partiallyUpdateEpic<T = Models.Epic>(parameters: Parameters.PartiallyUpdateEpic, callback: Callback<T>): Promise<void>;
  /**
   * Performs a partial update of the epic.
   *  A partial update means that fields not present in the request JSON will not be updated.
   *  Valid values for color are <code>color_1</code> to <code>color_9</code>.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async partiallyUpdateEpic<T = Models.Epic>(parameters: Parameters.PartiallyUpdateEpic, callback?: never): Promise<T>;
  async partiallyUpdateEpic<T = Models.Epic>(parameters: Parameters.PartiallyUpdateEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
      method: 'POST',
      data: {
        name: parameters.name,
        summary: parameters.summary,
        color: parameters.color,
        done: parameters.done,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.partiallyUpdateEpic' });
  }

  /**
   * Returns all issues that belong to the epic, for the given epic ID.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   *
   *  <b>Note:</b> If you are querying a next-gen project, do not use this operation.
   *  Instead, search for issues that belong to an epic by using the
   *  <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get">Search for issues using JQL</a>
   *  operation in the Jira platform REST API. Build your JQL query using the <code>parent</code> clause.
   *  For more information on the <code>parent</code> JQL field, see <a href="https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent">Advanced searching</a>.  */
  async getIssuesForEpic<T = unknown>(parameters: Parameters.GetIssuesForEpic, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues that belong to the epic, for the given epic ID.
   *  This only includes issues that the user has permission to view.
   *  Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.
   *  By default, the returned issues are ordered by rank.
   *
   *  <b>Note:</b> If you are querying a next-gen project, do not use this operation.
   *  Instead, search for issues that belong to an epic by using the
   *  <a href="https://developer.atlassian.com/cloud/jira/platform/rest/v2/#api-rest-api-2-search-get">Search for issues using JQL</a>
   *  operation in the Jira platform REST API. Build your JQL query using the <code>parent</code> clause.
   *  For more information on the <code>parent</code> JQL field, see <a href="https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent">Advanced searching</a>.  */
  async getIssuesForEpic<T = unknown>(parameters: Parameters.GetIssuesForEpic, callback?: never): Promise<T>;
  async getIssuesForEpic<T = unknown>(parameters: Parameters.GetIssuesForEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
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

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.getIssuesForEpic' });
  }

  /**
   * Moves issues to an epic, for a given epic id.
   *  Issues can be only in a single epic at the same time.
   *  That means that already assigned issues to an epic, will not be assigned to the previous epic anymore.
   *  The user needs to have the edit issue permission for all issue they want to move and to the epic.
   *  The maximum number of issues that can be moved in one operation is 50.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async moveIssuesToEpic<T = void>(parameters: Parameters.MoveIssuesToEpic, callback: Callback<T>): Promise<void>;
  /**
   * Moves issues to an epic, for a given epic id.
   *  Issues can be only in a single epic at the same time.
   *  That means that already assigned issues to an epic, will not be assigned to the previous epic anymore.
   *  The user needs to have the edit issue permission for all issue they want to move and to the epic.
   *  The maximum number of issues that can be moved in one operation is 50.
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async moveIssuesToEpic<T = void>(parameters: Parameters.MoveIssuesToEpic, callback?: never): Promise<T>;
  async moveIssuesToEpic<T = void>(parameters: Parameters.MoveIssuesToEpic, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.moveIssuesToEpic' });
  }

  /**
   * Moves (ranks) an epic before or after a given epic.
   *
   *  <p>
   *  If rankCustomFieldId is not defined, the default rank field will be used.
   *  </p>
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async rankEpics<T = void>(parameters: Parameters.RankEpics, callback: Callback<T>): Promise<void>;
  /**
   * Moves (ranks) an epic before or after a given epic.
   *
   *  <p>
   *  If rankCustomFieldId is not defined, the default rank field will be used.
   *  </p>
   *
   *  <b>Note:</b> This operation does not work for epics in next-gen projects.  */
  async rankEpics<T = void>(parameters: Parameters.RankEpics, callback?: never): Promise<T>;
  async rankEpics<T = void>(parameters: Parameters.RankEpics, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/rank`,
      method: 'PUT',
      data: {
        rankBeforeEpic: parameters.rankBeforeEpic,
        rankAfterEpic: parameters.rankAfterEpic,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.epic.rankEpics' });
  }
}
