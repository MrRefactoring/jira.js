import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class UserSearch {
  constructor(private client: Client) {}

  /**
   * Returns a list of users who can be assigned issues in one or more projects. The list may be restricted to users
   * whose attributes match a string.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that can be assigned issues in the projects. This means the operation
   * usually returns fewer users than specified in `maxResults`. To get all the users who can be assigned issues in the
   * projects, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async findBulkAssignableUsers<T = Models.User[]>(
    parameters: Parameters.FindBulkAssignableUsers,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of users who can be assigned issues in one or more projects. The list may be restricted to users
   * whose attributes match a string.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that can be assigned issues in the projects. This means the operation
   * usually returns fewer users than specified in `maxResults`. To get all the users who can be assigned issues in the
   * projects, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async findBulkAssignableUsers<T = Models.User[]>(
    parameters: Parameters.FindBulkAssignableUsers,
    callback?: never
  ): Promise<T>;
  async findBulkAssignableUsers<T = Models.User[]>(
    parameters: Parameters.FindBulkAssignableUsers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/assignable/multiProjectSearch',
      method: 'GET',
      params: {
        query: parameters.query,
        username: parameters.username,
        accountId: parameters.accountId,
        projectKeys: parameters.projectKeys,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findBulkAssignableUsers' });
  }

  /**
   * Returns a list of users that can be assigned to an issue. Use this operation to find the list of users who can be
   * assigned to:
   *
   * - A new issue, by providing the `projectKeyOrId`.
   * - An updated issue, by providing the `issueKey`.
   * - To an issue during a transition (workflow action), by providing the `issueKey` and the transition id in
   *   `actionDescriptorId`. You can obtain the IDs of an issue's valid transitions using the `transitions` option in
   *   the `expand` parameter of [ Get issue](#api-rest-api-3-issue-issueIdOrKey-get).
   *
   * In all these cases, you can pass an account ID to determine if a user can be assigned to an issue. The user is
   * returned in the response if they can be assigned to the issue or issue transition.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that can be assigned the issue. This means the operation usually
   * returns fewer users than specified in `maxResults`. To get all the users who can be assigned the issue, use [Get
   * all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async findAssignableUsers<T = Models.User[]>(
    parameters: Parameters.FindAssignableUsers | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of users that can be assigned to an issue. Use this operation to find the list of users who can be
   * assigned to:
   *
   * - A new issue, by providing the `projectKeyOrId`.
   * - An updated issue, by providing the `issueKey`.
   * - To an issue during a transition (workflow action), by providing the `issueKey` and the transition id in
   *   `actionDescriptorId`. You can obtain the IDs of an issue's valid transitions using the `transitions` option in
   *   the `expand` parameter of [ Get issue](#api-rest-api-3-issue-issueIdOrKey-get).
   *
   * In all these cases, you can pass an account ID to determine if a user can be assigned to an issue. The user is
   * returned in the response if they can be assigned to the issue or issue transition.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that can be assigned the issue. This means the operation usually
   * returns fewer users than specified in `maxResults`. To get all the users who can be assigned the issue, use [Get
   * all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async findAssignableUsers<T = Models.User[]>(
    parameters?: Parameters.FindAssignableUsers,
    callback?: never
  ): Promise<T>;
  async findAssignableUsers<T = Models.User[]>(
    parameters?: Parameters.FindAssignableUsers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/assignable/search',
      method: 'GET',
      params: {
        query: parameters?.query,
        sessionId: parameters?.sessionId,
        username: parameters?.username,
        accountId: parameters?.accountId,
        project: parameters?.project,
        issueKey: parameters?.issueKey,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        actionDescriptorId: parameters?.actionDescriptorId,
        recommend: parameters?.recommend,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findAssignableUsers' });
  }

  /**
   * Returns a list of users who fulfill these criteria:
   *
   * - Their user attributes match a search string.
   * - They have a set of permissions for a project or issue.
   *
   * If no search string is provided, a list of all users with the permissions is returned.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the search string and have permission for the project or
   * issue. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users
   * who match the search string and have permission for the project or issue, use [Get all
   * users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to get users for any project.
   * - *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project, to get users
   *   for that project.
   */
  async findUsersWithAllPermissions<T = Models.User[]>(
    parameters: Parameters.FindUsersWithAllPermissions,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of users who fulfill these criteria:
   *
   * - Their user attributes match a search string.
   * - They have a set of permissions for a project or issue.
   *
   * If no search string is provided, a list of all users with the permissions is returned.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the search string and have permission for the project or
   * issue. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users
   * who match the search string and have permission for the project or issue, use [Get all
   * users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), to get users for any project.
   * - *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project, to get users
   *   for that project.
   */
  async findUsersWithAllPermissions<T = Models.User[]>(
    parameters: Parameters.FindUsersWithAllPermissions,
    callback?: never
  ): Promise<T>;
  async findUsersWithAllPermissions<T = Models.User[]>(
    parameters: Parameters.FindUsersWithAllPermissions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/permission/search',
      method: 'GET',
      params: {
        query: parameters.query,
        username: parameters.username,
        accountId: parameters.accountId,
        permissions: parameters.permissions,
        issueKey: parameters.issueKey,
        projectKey: parameters.projectKey,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsersWithAllPermissions' });
  }

  /**
   * Returns a list of users whose attributes match the query term. The returned object includes the `html` field where
   * the matched query term is highlighted with the HTML strong tag. A list of account IDs can be provided to exclude
   * users from the results.
   *
   * This operation takes the users in the range defined by `maxResults`, up to the thousandth user, and then returns
   * only the users from that range that match the query term. This means the operation usually returns fewer users than
   * specified in `maxResults`. To get all the users who match the query term, use [Get all
   * users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by
   * users without the required permission return search results for an exact name match only.
   */
  async findUsersForPicker<T = Models.FoundUsers>(
    parameters: Parameters.FindUsersForPicker,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of users whose attributes match the query term. The returned object includes the `html` field where
   * the matched query term is highlighted with the HTML strong tag. A list of account IDs can be provided to exclude
   * users from the results.
   *
   * This operation takes the users in the range defined by `maxResults`, up to the thousandth user, and then returns
   * only the users from that range that match the query term. This means the operation usually returns fewer users than
   * specified in `maxResults`. To get all the users who match the query term, use [Get all
   * users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by
   * users without the required permission return search results for an exact name match only.
   */
  async findUsersForPicker<T = Models.FoundUsers>(
    parameters: Parameters.FindUsersForPicker,
    callback?: never
  ): Promise<T>;
  async findUsersForPicker<T = Models.FoundUsers>(
    parameters: Parameters.FindUsersForPicker,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/picker',
      method: 'GET',
      params: {
        query: parameters.query,
        maxResults: parameters.maxResults,
        showAvatar: parameters.showAvatar,
        exclude: parameters.exclude,
        excludeAccountIds: parameters.excludeAccountIds,
        avatarSize: parameters.avatarSize,
        excludeConnectUsers: parameters.excludeConnectUsers,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsersForPicker' });
  }

  /**
   * Returns a list of users that match the search string and property.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the search string and property. This means the operation
   * usually returns fewer users than specified in `maxResults`. To get all the users who match the search string and
   * property, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls or calls by users
   * without the required permission return empty search results.
   */
  async findUsers<T = Models.User[]>(
    parameters: Parameters.FindUsers | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of users that match the search string and property.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the search string and property. This means the operation
   * usually returns fewer users than specified in `maxResults`. To get all the users who match the search string and
   * property, use [Get all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls or calls by users
   * without the required permission return empty search results.
   */
  async findUsers<T = Models.User[]>(parameters?: Parameters.FindUsers, callback?: never): Promise<T>;
  async findUsers<T = Models.User[]>(parameters?: Parameters.FindUsers, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/search',
      method: 'GET',
      params: {
        query: parameters?.query,
        username: parameters?.username,
        accountId: parameters?.accountId,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        property: parameters?.property,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsers' });
  }

  /**
   * Finds users with a structured query and returns a
   * [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of user details.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the structured query. This means the operation usually
   * returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use [Get
   * all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * The query statements are:
   *
   * - `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.
   * - `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.
   * - `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.
   * - `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.
   * - `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.
   * - `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.
   * - `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.
   * - `[propertyKey].entity.property.path is "property value"` Returns users with the entity property value.
   *
   * The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined
   * using the `AND` and `OR` operators to form more complex queries. For example:
   *
   * `is assignee of PROJ AND [propertyKey].entity.property.path is "property value"`
   */
  async findUsersByQuery<T = Models.PageBeanUser>(
    parameters: Parameters.FindUsersByQuery,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Finds users with a structured query and returns a
   * [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of user details.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the structured query. This means the operation usually
   * returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use [Get
   * all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * The query statements are:
   *
   * - `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.
   * - `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.
   * - `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.
   * - `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.
   * - `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.
   * - `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.
   * - `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.
   * - `[propertyKey].entity.property.path is "property value"` Returns users with the entity property value.
   *
   * The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined
   * using the `AND` and `OR` operators to form more complex queries. For example:
   *
   * `is assignee of PROJ AND [propertyKey].entity.property.path is "property value"`
   */
  async findUsersByQuery<T = Models.PageBeanUser>(
    parameters: Parameters.FindUsersByQuery,
    callback?: never
  ): Promise<T>;
  async findUsersByQuery<T = Models.PageBeanUser>(
    parameters: Parameters.FindUsersByQuery,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/search/query',
      method: 'GET',
      params: {
        query: parameters.query,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUsersByQuery' });
  }

  /**
   * Finds users with a structured query and returns a
   * [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of user keys.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the structured query. This means the operation usually
   * returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use [Get
   * all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * The query statements are:
   *
   * - `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.
   * - `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.
   * - `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.
   * - `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.
   * - `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.
   * - `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.
   * - `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.
   * - `[propertyKey].entity.property.path is "property value"` Returns users with the entity property value.
   *
   * The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined
   * using the `AND` and `OR` operators to form more complex queries. For example:
   *
   * `is assignee of PROJ AND [propertyKey].entity.property.path is "property value"`
   */
  async findUserKeysByQuery<T = Models.PageBeanUserKey>(
    parameters: Parameters.FindUserKeysByQuery,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Finds users with a structured query and returns a
   * [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of user keys.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the structured query. This means the operation usually
   * returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use [Get
   * all users](#api-rest-api-3-users-search-get) and filter the records in your code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * The query statements are:
   *
   * - `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.
   * - `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.
   * - `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.
   * - `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.
   * - `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.
   * - `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.
   * - `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.
   * - `[propertyKey].entity.property.path is "property value"` Returns users with the entity property value.
   *
   * The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined
   * using the `AND` and `OR` operators to form more complex queries. For example:
   *
   * `is assignee of PROJ AND [propertyKey].entity.property.path is "property value"`
   */
  async findUserKeysByQuery<T = Models.PageBeanUserKey>(
    parameters: Parameters.FindUserKeysByQuery,
    callback?: never
  ): Promise<T>;
  async findUserKeysByQuery<T = Models.PageBeanUserKey>(
    parameters: Parameters.FindUserKeysByQuery,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/search/query/key',
      method: 'GET',
      params: {
        query: parameters.query,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.userSearch.findUserKeysByQuery' });
  }

  /**
   * Returns a list of users who fulfill these criteria:
   *
   * - Their user attributes match a search string.
   * - They have permission to browse issues.
   *
   * Use this resource to find users who can browse:
   *
   * - An issue, by providing the `issueKey`.
   * - Any issue in a project, by providing the `projectKey`.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the search string and have permission to browse issues. This
   * means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the
   * search string and have permission to browse issues, use [Get all users](#api-rest-api-3-users-search-get) and
   * filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by
   * users without the required permission return empty search results.
   */
  async findUsersWithBrowsePermission<T = Models.User[]>(
    parameters: Parameters.FindUsersWithBrowsePermission | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of users who fulfill these criteria:
   *
   * - Their user attributes match a search string.
   * - They have permission to browse issues.
   *
   * Use this resource to find users who can browse:
   *
   * - An issue, by providing the `issueKey`.
   * - Any issue in a project, by providing the `projectKey`.
   *
   * This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and
   * then returns only the users from that range that match the search string and have permission to browse issues. This
   * means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the
   * search string and have permission to browse issues, use [Get all users](#api-rest-api-3-users-search-get) and
   * filter the records in your code.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse
   * users and groups* [global permission](https://confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by
   * users without the required permission return empty search results.
   */
  async findUsersWithBrowsePermission<T = Models.User[]>(
    parameters?: Parameters.FindUsersWithBrowsePermission,
    callback?: never
  ): Promise<T>;
  async findUsersWithBrowsePermission<T = Models.User[]>(
    parameters?: Parameters.FindUsersWithBrowsePermission,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/user/viewissue/search',
      method: 'GET',
      params: {
        query: parameters?.query,
        username: parameters?.username,
        accountId: parameters?.accountId,
        issueKey: parameters?.issueKey,
        projectKey: parameters?.projectKey,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version3.userSearch.findUsersWithBrowsePermission',
    });
  }
}
